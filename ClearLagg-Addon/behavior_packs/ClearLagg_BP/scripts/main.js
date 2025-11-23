// ClearLagg Addon for Minecraft Bedrock
// Credits: https://github.com/Alifwag/credits-addons-clearlagg.git

import { world, system, Player } from "@minecraft/server";

class ClearLaggSystem {
    constructor() {
        this.clearing = false;
        this.progress = 0;
        this.interval = null;
        this.chatHistory = [];
        this.currentHistoryIndex = -1;
        this.currentChatInput = "";
        
        // Configurable settings
        this.config = {
            clearInterval: 300, // 5 minutes in seconds
            warningTime: 30, // 30 seconds warning
            maxItems: 500,
            enableAutoClear: true,
            enableProgressBar: true,
            enableChatHistory: true
        };
        
        this.initialize();
    }
    
    initialize() {
        // Start automatic clearing
        if (this.config.enableAutoClear) {
            this.startAutoClear();
        }
        
        // Register chat send event for history
        if (this.config.enableChatHistory) {
            world.beforeEvents.chatSend.subscribe((event) => {
                this.handleChatSend(event);
            });
        }
        
        // Register system run to handle progress updates
        system.runInterval(() => {
            this.updateProgress();
        }, 20); // Update every second
    }
    
    startAutoClear() {
        let countdown = this.config.clearInterval;
        
        this.interval = system.runInterval(() => {
            countdown--;
            
            // Send warning
            if (countdown === this.config.warningTime) {
                this.broadcastMessage("§6⚠ ClearLagg akan membersihkan item dalam §e" + countdown + " detik!");
            }
            
            // Clear items
            if (countdown <= 0) {
                this.clearItems();
                countdown = this.config.clearInterval;
            }
            
            // Update progress bar for nearby players
            this.updateClearProgress(countdown);
            
        }, 20); // Run every second
    }
    
    updateClearProgress(countdown) {
        const progressPercent = 100 - Math.floor((countdown / this.config.clearInterval) * 100);
        this.progress = progressPercent;
        
        if (this.config.enableProgressBar) {
            this.showProgressBar(progressPercent);
        }
    }
    
    showProgressBar(percent) {
        const bars = 20;
        const filledBars = Math.floor(percent / 5);
        const emptyBars = bars - filledBars;
        
        const progressBar = "§2" + "◼".repeat(filledBars) + "§8" + "◼".repeat(emptyBars);
        const title = `§l§aClearLagg §r| ${progressBar} §f${percent}%`;
        
        // Show to all players
        const players = world.getPlayers();
        for (const player of players) {
            try {
                player.onScreenDisplay.setTitle(title, {
                    stayDuration: 20,
                    fadeInDuration: 0,
                    fadeOutDuration: 0
                });
            } catch (error) {
                // Ignore errors for players that might have left
            }
        }
    }
    
    clearItems() {
        this.clearing = true;
        this.broadcastMessage("§c🧹 ClearLagg sedang membersihkan item...");
        
        const dimension = world.getDimension("overworld");
        const entities = dimension.getEntities();
        let clearedCount = 0;
        
        for (const entity of entities) {
            // Clear items (item entities)
            if (entity.typeId === "minecraft:item") {
                entity.kill();
                clearedCount++;
            }
            
            // Clear arrows, snowballs, etc.
            const projectileTypes = [
                "minecraft:arrow",
                "minecraft:snowball", 
                "minecraft:egg",
                "minecraft:ender_pearl",
                "minecraft:splash_potion",
                "minecraft:experience_bottle"
            ];
            
            if (projectileTypes.includes(entity.typeId)) {
                entity.kill();
                clearedCount++;
            }
        }
        
        this.broadcastMessage("§a✅ ClearLagg berhasil membersihkan §e" + clearedCount + "§a entity!");
        this.clearing = false;
        this.progress = 0;
    }
    
    broadcastMessage(message) {
        const players = world.getPlayers();
        for (const player of players) {
            player.sendMessage(message);
        }
        console.log(message);
    }
    
    // Chat History System with Undo/Redo
    handleChatSend(event) {
        const player = event.sender;
        const message = event.message;
        
        // Save current input before sending
        this.currentChatInput = message;
        
        // Add to history
        this.chatHistory.push({
            player: player.name,
            message: message,
            timestamp: Date.now()
        });
        
        // Keep only last 50 messages
        if (this.chatHistory.length > 50) {
            this.chatHistory.shift();
        }
        
        this.currentHistoryIndex = this.chatHistory.length;
    }
    
    getChatHistory(playerName) {
        return this.chatHistory.filter(entry => entry.player === playerName);
    }
    
    // Manual clear command
    manualClear() {
        this.clearItems();
    }
    
    // Set clear interval
    setClearInterval(seconds) {
        this.config.clearInterval = seconds;
        
        // Restart auto clear
        if (this.interval) {
            system.clearRun(this.interval);
        }
        this.startAutoClear();
        
        return `§aClear interval diubah menjadi §e${seconds}§a detik`;
    }
    
    // Get status
    getStatus() {
        const nextClear = this.config.clearInterval - (this.progress * this.config.clearInterval / 100);
        return {
            progress: this.progress,
            nextClear: Math.floor(nextClear),
            isClearing: this.clearing,
            config: this.config
        };
    }
}

// Initialize the system
const clearLagg = new ClearLaggSystem();

// Command registration
world.beforeEvents.chatSend.subscribe((event) => {
    const message = event.message.toLowerCase();
    const player = event.sender;
    
    if (message.startsWith("!clearlagg")) {
        event.cancel = true;
        
        const args = message.split(" ");
        const command = args[1];
        
        switch(command) {
            case "clear":
                clearLagg.manualClear();
                player.sendMessage("§aManual clear dimulai!");
                break;
                
            case "interval":
                if (args[2] && !isNaN(args[2])) {
                    const seconds = parseInt(args[2]);
                    if (seconds >= 30) {
                        const result = clearLagg.setClearInterval(seconds);
                        player.sendMessage(result);
                    } else {
                        player.sendMessage("§cInterval minimal 30 detik!");
                    }
                } else {
                    player.sendMessage("§eUsage: !clearlagg interval <detik>");
                }
                break;
                
            case "status":
                const status = clearLagg.getStatus();
                player.sendMessage([
                    "§6=== ClearLagg Status ===",
                    `§fProgress: §a${status.progress}%`,
                    `§fNext Clear: §e${status.nextClear}§f detik`,
                    `§fAuto Clear: §${status.config.enableAutoClear ? "aAktif" : "cNonaktif"}`,
                    `§fInterval: §b${status.config.clearInterval}§f detik`
                ].join("\n"));
                break;
                
            case "help":
            default:
                player.sendMessage([
                    "§6=== ClearLagg Commands ===",
                    "§a!clearlagg clear §f- Manual clear items",
                    "§a!clearlagg interval <detik> §f- Set interval clear",
                    "§a!clearlagg status §f- Lihat status",
                    "§a!clearlagg help §f- Tampilkan bantuan",
                    "§7Credits: https://github.com/Alifwag/credits-addons-clearlagg.git"
                ].join("\n"));
                break;
        }
    }
});

// Export for external use
export default clearLagg;

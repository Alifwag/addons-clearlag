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

        // Lokasi kematian pemain
        this.lastDeathLocation = new Map();

        // Config
        this.config = {
            clearInterval: 300,
            warningTime: 30,
            maxItems: 500,
            enableAutoClear: true,
            enableProgressBar: true,
            enableChatHistory: true
        };
        
        this.initialize();
    }
    
    initialize() {

        if (this.config.enableAutoClear) {
            this.startAutoClear();
        }

        if (this.config.enableChatHistory) {
            world.beforeEvents.chatSend.subscribe((event) => this.handleChatSend(event));
        }

        // Listener pemain mati
        world.afterEvents.entityDie.subscribe(ev => {
            if (ev.deadEntity instanceof Player) {
                const pl = ev.deadEntity;
                this.lastDeathLocation.set(pl.name, pl.location);
                pl.sendMessage("§c☠ Kamu mati! Gunakan §e!back §cuntuk kembali ke lokasi kematian.");
            }
        });

        system.runInterval(() => this.updateProgress(), 20);
    }
    
    startAutoClear() {
        let countdown = this.config.clearInterval;
        
        this.interval = system.runInterval(() => {
            countdown--;
            
            if (countdown === this.config.warningTime) {
                this.broadcastMessage("§6⚠ ClearLagg akan membersihkan item dalam §e" + countdown + " detik!");
            }
            
            if (countdown <= 0) {
                this.clearItems();
                countdown = this.config.clearInterval;
            }
            
            this.updateClearProgress(countdown);
            
        }, 20);
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
        
        for (const player of world.getPlayers()) {
            try {
                player.onScreenDisplay.setTitle(title, {
                    stayDuration: 20
                });
            } catch {}
        }
    }
    
    clearItems() {
        this.clearing = true;
        this.broadcastMessage("§c🧹 ClearLagg sedang membersihkan item...");
        
        const dimension = world.getDimension("overworld");
        const entities = dimension.getEntities();
        let clearedCount = 0;
        
        const projectileTypes = [
            "minecraft:arrow",
            "minecraft:snowball",
            "minecraft:egg",
            "minecraft:ender_pearl",
            "minecraft:splash_potion",
            "minecraft:experience_bottle"
        ];
        
        for (const entity of entities) {
            if (entity.typeId === "minecraft:item" || projectileTypes.includes(entity.typeId)) {
                entity.kill();
                clearedCount++;
            }
        }
        
        this.broadcastMessage("§a✅ ClearLagg berhasil membersihkan §e" + clearedCount + "§a entity!");
        this.clearing = false;
        this.progress = 0;
    }
    
    broadcastMessage(message) {
        for (const player of world.getPlayers()) {
            player.sendMessage(message);
        }
    }
    
    handleChatSend(event) {
        const player = event.sender;
        const message = event.message;

        this.currentChatInput = message;
        
        this.chatHistory.push({
            player: player.name,
            message: message,
            timestamp: Date.now()
        });
        
        if (this.chatHistory.length > 50) {
            this.chatHistory.shift();
        }
        
        this.currentHistoryIndex = this.chatHistory.length;
    }
    
    getChatHistory(playerName) {
        return this.chatHistory.filter(entry => entry.player === playerName);
    }
    
    manualClear() {
        this.clearItems();
    }
    
    setClearInterval(seconds) {
        this.config.clearInterval = seconds;

        if (this.interval) system.clearRun(this.interval);
        this.startAutoClear();
        
        return `§aClear interval diubah menjadi §e${seconds}§a detik`;
    }
    
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

const clearLagg = new ClearLaggSystem();


// ==================== SEMUA COMMAND BARU DI SINI ====================

world.beforeEvents.chatSend.subscribe((event) => {

    const message = event.message.toLowerCase();
    const player = event.sender;

    // ---- Perintah ClearLagg Lama ----
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
                        player.sendMessage(clearLagg.setClearInterval(seconds));
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
                    `§fNext Clear: §e${status.nextClear} detik`,
                    `§fAuto Clear: §${status.config.enableAutoClear ? "aAktif" : "cNonaktif"}`,
                    `§fInterval: §b${status.config.clearInterval} detik`
                ].join("\n"));
                break;
                
            default:
                player.sendMessage([
                    "§6=== ClearLagg Commands ===",
                    "§a!clearlagg clear",
                    "§a!clearlagg interval <detik>",
                    "§a!clearlagg status",
                    "§a!clearlagg help"
                ].join("\n"));
        }
        return;
    }

    // ---- PERINTAH TAMBAHAN ----
    switch(message) {

        case "!hi":
            event.cancel = true;
            player.sendMessage("§aHai juga! 👋");
            break;

        case "!list":
            event.cancel = true;
            player.sendMessage([
                "§6=== Commands ===",
                "§a!hi",
                "§a!test",
                "§a!back",
                "§a!rtp",
                "§a!reload",
                "§a!ping",
                "§a!pos",
                "§a!heal",
                "§a!food",
                "§a!time",
                "§a!day",
                "§a!night",
                "§a!fly",
                "§a!unfly",
                "§a!help"
            ].join("\n"));
            break;

        case "!reload":
            event.cancel = true;
            player.sendMessage("§e🔄 Reloading addon...");
            system.runTimeout(() => {
                player.sendMessage("§aAddon berhasil di-reload (simulasi).");
            }, 20);
            break;

        case "!test":
            event.cancel = true;
            const s = clearLagg.getStatus();
            player.sendMessage([
                "§6=== Diagnostics ===",
                `§fAuto Clear: ${s.config.enableAutoClear}`,
                `§fProgress: ${s.progress}%`,
                `§fNext Clear: ${s.nextClear}s`,
                "§fStatus: OK"
            ].join("\n"));
            break;

        case "!back":
            event.cancel = true;
            if (!clearLagg.lastDeathLocation.has(player.name)) {
                player.sendMessage("§c❌ Kamu belum mati.");
            } else {
                const loc = clearLagg.lastDeathLocation.get(player.name);
                player.sendMessage("§a⏩ Teleport ke lokasi kematian...");
                player.teleport(loc);
            }
            break;

        case "!rtp":
            event.cancel = true;
            const x = Math.floor(Math.random() * 2000 - 1000);
            const z = Math.floor(Math.random() * 2000 - 1000);
            const y = 100;
            player.sendMessage("§a🎲 Random teleport...");
            player.teleport({ x, y, z });
            break;

        case "!ping":
            event.cancel = true;
            player.sendMessage("§aPong!");
            break;

        case "!pos":
            event.cancel = true;
            player.sendMessage(`§aPosisi: §e${player.location.x.toFixed(1)}, ${player.location.y.toFixed(1)}, ${player.location.z.toFixed(1)}`);
            break;

        case "!heal":
            event.cancel = true;
            player.sendMessage("§a❤️ Kamu disembuhkan!");
            player.runCommandAsync("effect @s regeneration 2 5");
            break;

        case "!food":
            event.cancel = true;
            player.sendMessage("§a🍗 Food full!");
            player.runCommandAsync("effect @s saturation 1 10");
            break;

        case "!time":
            event.cancel = true;
            player.sendMessage("§a⌚ Waktu dunia: §e" + world.getTime());
            break;

        case "!day":
            event.cancel = true;
            world.getDimension("overworld").runCommandAsync("time set day");
            player.sendMessage("§e☀ Day!");
            break;

        case "!night":
            event.cancel = true;
            world.getDimension("overworld").runCommandAsync("time set night");
            player.sendMessage("§9🌙 Night!");
            break;

        case "!fly":
            event.cancel = true;
            player.runCommandAsync("ability @s mayfly true");
            player.sendMessage("§a✈ Fly enabled!");
            break;

        case "!unfly":
            event.cancel = true;
            player.runCommandAsync("ability @s mayfly false");
            player.sendMessage("§c✈ Fly disabled!");
            break;

        case "!help":
            event.cancel = true;
            player.sendMessage("§aGunakan !list untuk melihat semua command.");
            break;
    }
});

export default clearLagg;

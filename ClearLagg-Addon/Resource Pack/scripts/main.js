import { world, system } from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';

// ═══════════════════════════════════════════════════════════════
// RESOURCE PACK HELPER SCRIPT
// ═══════════════════════════════════════════════════════════════
// Script ini membantu BP untuk rendering UI dan optimasi performa

console.warn('§b[ClearLagg RP] Resource Pack script loaded!');

// ═══════════════════════════════════════════════════════════════
// UI CACHE SYSTEM
// ═══════════════════════════════════════════════════════════════
const uiCache = new Map();
const CACHE_DURATION = 6000; // 5 menit cache

function cacheUI(key, data) {
    uiCache.set(key, {
        data: data,
        timestamp: Date.now()
    });
}

function getCachedUI(key) {
    const cached = uiCache.get(key);
    if (!cached) return null;
    
    // Cek expiry
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
        uiCache.delete(key);
        return null;
    }
    
    return cached.data;
}

// ═══════════════════════════════════════════════════════════════
// TEXTURE PRELOADING
// ═══════════════════════════════════════════════════════════════
const TEXTURES = {
    books: 'textures/items/book_writable',
    settings: 'textures/items/settings_book',
    music: 'textures/items/music_cassette',
    op: 'textures/items/op_book'
};

// Preload textures saat world load
world.afterEvents.worldInitialize.subscribe(() => {
    console.warn('§a[ClearLagg RP] Preloading textures...');
    
    // Texture preload logic here
    for (const [key, path] of Object.entries(TEXTURES)) {
        cacheUI(`texture_${key}`, path);
    }
    
    console.warn('§a[ClearLagg RP] Textures preloaded!');
});

// ═══════════════════════════════════════════════════════════════
// PERFORMANCE OPTIMIZATION
// ═══════════════════════════════════════════════════════════════
let lastCleanupTime = 0;
const CLEANUP_INTERVAL = 12000; // 10 menit

system.runInterval(() => {
    const now = Date.now();
    
    if (now - lastCleanupTime >= CLEANUP_INTERVAL) {
        // Clear old UI cache
        let cleared = 0;
        for (const [key, value] of uiCache.entries()) {
            if (now - value.timestamp > CACHE_DURATION) {
                uiCache.delete(key);
                cleared++;
            }
        }
        
        if (cleared > 0) {
            console.warn(`§e[ClearLagg RP] Cleared ${cleared} cached UI elements`);
        }
        
        lastCleanupTime = now;
    }
}, 1200); // Check every minute

// ═══════════════════════════════════════════════════════════════
// ACTIONBAR RENDERER HELPER
// ═══════════════════════════════════════════════════════════════
export function renderProgressBar(player, percent, text) {
    const filled = Math.floor(percent / 10);
    const empty = 10 - filled;
    const bar = '§a◼'.repeat(filled) + '§7◻'.repeat(empty);
    
    player.onScreenDisplay.setActionBar(`${text} ${bar} §e${percent}%`);
}

// ═══════════════════════════════════════════════════════════════
// TITLE RENDERER HELPER
// ═══════════════════════════════════════════════════════════════
export function showCustomTitle(player, title, subtitle = '', options = {}) {
    const defaults = {
        fadeInDuration: 10,
        stayDuration: 70,
        fadeOutDuration: 20
    };
    
    const opts = { ...defaults, ...options };
    
    player.onScreenDisplay.setTitle(title, opts);
    
    if (subtitle) {
        player.onScreenDisplay.updateSubtitle(subtitle);
    }
}

// ═══════════════════════════════════════════════════════════════
// SOUND HELPER
// ═══════════════════════════════════════════════════════════════
export function playUISound(player, sound = 'random.click', volume = 1.0) {
    player.playSound(sound, { volume, pitch: 1.0 });
}

// ═══════════════════════════════════════════════════════════════
// PARTICLE EFFECTS
// ═══════════════════════════════════════════════════════════════
export function spawnClearEffect(player) {
    // Spawn particle effect saat clear
    player.runCommand('particle minecraft:totem_particle ~~~');
    playUISound(player, 'random.levelup', 0.5);
}

// ═══════════════════════════════════════════════════════════════
// CUSTOM HUD ELEMENTS
// ═══════════════════════════════════════════════════════════════
const hudElements = new Map();

export function registerHUDElement(playerId, element) {
    if (!hudElements.has(playerId)) {
        hudElements.set(playerId, []);
    }
    
    hudElements.get(playerId).push(element);
}

export function clearHUDElements(playerId) {
    hudElements.delete(playerId);
}

// Render HUD setiap frame
system.runInterval(() => {
    world.getAllPlayers().forEach(player => {
        const elements = hudElements.get(player.id);
        if (!elements || elements.length === 0) return;
        
        // Combine all HUD elements
        let hudText = '';
        elements.forEach(elem => {
            if (elem.visible) {
                hudText += elem.text + '\n';
            }
        });
        
        if (hudText) {
            player.onScreenDisplay.setActionBar(hudText.trim());
        }
    });
}, 1); // Every tick for smooth updates

// ═══════════════════════════════════════════════════════════════
// MEMORY OPTIMIZATION
// ═══════════════════════════════════════════════════════════════
export function optimizeMemory() {
    // Clear unused cache
    uiCache.clear();
    hudElements.clear();
    
    console.warn('§a[ClearLagg RP] Memory optimized!');
}

// Auto optimize every 30 minutes
system.runInterval(() => {
    optimizeMemory();
}, 36000);

// ═══════════════════════════════════════════════════════════════
// EXPORT HELPERS
// ═══════════════════════════════════════════════════════════════
export {
    cacheUI,
    getCachedUI,
    TEXTURES
};

console.warn('§a[ClearLagg RP] All systems ready!');

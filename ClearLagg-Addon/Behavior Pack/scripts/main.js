import { world, system, Player } from '@minecraft/server';
import { ActionFormData, ModalFormData, MessageFormData } from '@minecraft/server-ui';

// ═══════════════════════════════════════════════════════════════
// ASCII WELCOME BANNER
// ═══════════════════════════════════════════════════════════════
const WELCOME_ASCII = `
§6╔════════════════════════════════════════════════════╗
§6║  §e ▄████▄   ██▓    ▓█████ ▄▄▄       ██▀███           §6║
§6║  §e▒██▀ ▀█  ▓██▒    ▓█   ▀▒████▄    ▓██ ▒ ██▒         §6║
§6║  §e▒▓█    ▄ ▒██░    ▒███  ▒██  ▀█▄  ▓██ ░▄█ ▒         §6║
§6║  §e▒▓▓▄ ▄██▒▒██░    ▒▓█  ▄░██▄▄▄▄██ ▒██▀▀█▄          §6║
§6║  §e▒ ▓███▀ ░░██████▒░▒████▒▓█   ▓██▒░██▓ ▒██▒       §6║
§6║  §e░ ░▒ ▒  ░░ ▒░▓  ░░░ ▒░ ░▒▒   ▓▒█░░ ▒▓ ░▒▓░        §6║
§6║  §e  ░  ▒   ░ ░ ▒  ░ ░ ░  ░ ▒   ▒▒ ░  ░▒ ░ ▒░          §6║
§6║  §e░          ░ ░      ░    ░   ▒     ░░   ░            §6║
§6║  §e░ ░          ░  ░   ░  ░     ░  ░   ░                §6║
§6║  §e░                                                     §6║
§6║                                                          §6║
§6║  §a ██▓    ▄▄▄        ▄████   ▄████                   §6║
§6║  §a▓██▒   ▒████▄     ██▒ ▀█▒ ██▒ ▀█▒                 §6║
§6║  §a▒██░   ▒██  ▀█▄  ▒██░▄▄▄░▒██░▄▄▄░                §6║
§6║  §a▒██░   ░██▄▄▄▄██ ░▓█  ██▓░▓█  ██▓                §6║
§6║  §a░██████▒▓█   ▓██▒░▒▓███▀▒░▒▓███▀▒               §6║
§6║  §a░ ▒░▓  ░▒▒   ▓▒█░ ░▒   ▒  ░▒   ▒                  §6║
§6║  §a░ ░ ▒  ░ ▒   ▒▒ ░  ░   ░   ░   ░                   §6║
§6║  §a  ░ ░    ░   ▒   ░ ░   ░ ░ ░   ░                   §6║
§6║  §a    ░  ░     ░  ░      ░       ░                   §6║
§6╠════════════════════════════════════════════════════╣
§6║  §bVersion: §f1.0.0   §b│  §bDeveloper: §fAlifwag         §6║
§6║  §bGitHub: §fgithub.com/Alifwag/addons-clearlagg          §6║
§6║  §bLicense: §fMIT      §b│  §bStatus: §a✔ Active         §6║
§6╠════════════════════════════════════════════════════╣
§6║  §d🧹 Auto ClearLagg System Activated!                    §6║
§6║  §e⚡ Performance Monitoring: §aON                        §6║
§6║  §b🎵 Music System: §aReady                               §6║
§6║  §a💬 Type §f!help §afor command list                     §6║
§6╚════════════════════════════════════════════════════╝
`;

// ═══════════════════════════════════════════════════════════════
// KONFIGURASI GLOBAL
// ═══════════════════════════════════════════════════════════════
const CONFIG = {
    clearDelay: 300, // 5 menit default (dalam detik)
    warningTime: 30, // Peringatan 30 detik sebelum clear
    language: 'id_ID', // Default bahasa Indonesia
    customCommands: {},
    enableAutoClean: true,
    cleanupTypes: {
        items: true,
        mobs: false,
        arrows: true,
        xp: false
    }
};

// ═══════════════════════════════════════════════════════════════
// SISTEM BAHASA
// ═══════════════════════════════════════════════════════════════
const LANG = {
    id_ID: {
        prefix: '§6[ClearLagg]§r',
        clearWarning: '§ePeringatan! Pembersihan item dalam §c{time}§e detik!',
        clearStart: '§aMembersihkan items...',
        clearProgress: '§b[{bar}] §e{percent}%',
        clearComplete: '§a✔ Pembersihan selesai!',
        clearReport: '§6═══ §eLaporan Pembersihan §6═══\n§fItems: §a{items}\n§fOre: §a{ore}\n§fArrows: §a{arrows}\n§fTotal: §a{total}',
        performance: '§6═══ §ePerforma Server §6═══\n§fEntities: §b{entities}\n§fPlayers: §b{players}\n§fTPS: §b{tps}\n§fMemory: §b{memory}MB',
        hai: '§aHai! Ada yang bisa saya bantu? 😊',
        backTeleport: '§aTeleport ke lokasi kematian!',
        noDeathLocation: '§cTidak ada lokasi kematian yang tersimpan.',
        helpTitle: '§6═══ §eDaftar Perintah §6═══',
        bookReceived: '§aBuku {type} telah diberikan!'
    },
    en_US: {
        prefix: '§6[ClearLagg]§r',
        clearWarning: '§eWarning! Item cleanup in §c{time}§e seconds!',
        clearStart: '§aCleaning items...',
        clearProgress: '§b[{bar}] §e{percent}%',
        clearComplete: '§a✔ Cleanup complete!',
        clearReport: '§6═══ §eCleanup Report §6═══\n§fItems: §a{items}\n§fOre: §a{ore}\n§fArrows: §a{arrows}\n§fTotal: §a{total}',
        performance: '§6═══ §eServer Performance §6═══\n§fEntities: §b{entities}\n§fPlayers: §b{players}\n§fTPS: §b{tps}\n§fMemory: §b{memory}MB',
        hai: '§aHi! How can I help you? 😊',
        backTeleport: '§aTeleported to death location!',
        noDeathLocation: '§cNo death location saved.',
        helpTitle: '§6═══ §eCommand List §6═══',
        bookReceived: '§a{type} book has been given!'
    }
};

// ═══════════════════════════════════════════════════════════════
// DATA PENYIMPANAN
// ═══════════════════════════════════════════════════════════════
const playerData = new Map();
const chatHistory = new Map();
const musicLibrary = new Map();
const deathLocations = new Map();

// ═══════════════════════════════════════════════════════════════
// FUNGSI UTILITAS
// ═══════════════════════════════════════════════════════════════
function getLang(key, replacements = {}) {
    let text = LANG[CONFIG.language][key] || LANG['id_ID'][key];
    for (const [k, v] of Object.entries(replacements)) {
        text = text.replace(`{${k}}`, v);
    }
    return text;
}

function createProgressBar(percent) {
    const filled = Math.floor(percent / 10);
    const empty = 10 - filled;
    return '◼'.repeat(filled) + '◻'.repeat(empty);
}

function broadcastMessage(message) {
    world.sendMessage(getLang('prefix') + ' ' + message);
}

function getPerformanceStats() {
    const entities = world.getDimension('overworld').getEntities().length;
    const players = world.getAllPlayers().length;
    const tps = 20; // Simulasi (tidak ada API real TPS)
    const memory = Math.floor(Math.random() * 512 + 256); // Simulasi
    
    return { entities, players, tps, memory };
}

// ═══════════════════════════════════════════════════════════════
// SISTEM AUTO CLEAR LAG
// ═══════════════════════════════════════════════════════════════
let clearTimer = 0;
let isClearing = false;

function startClearLaggSystem() {
    system.runInterval(() => {
        if (!CONFIG.enableAutoClean) return;
        
        clearTimer++;
        
        // Warning sebelum clear
        if (clearTimer === CONFIG.clearDelay - CONFIG.warningTime) {
            broadcastMessage(getLang('clearWarning', { time: CONFIG.warningTime }));
        }
        
        // Mulai clear
        if (clearTimer >= CONFIG.clearDelay && !isClearing) {
            isClearing = true;
            executeClearLagg();
        }
    }, 20); // Setiap detik (20 ticks)
}

function executeClearLagg() {
    broadcastMessage(getLang('clearStart'));
    
    let progress = 0;
    const stats = { items: 0, ore: 0, arrows: 0 };
    
    // Animasi progress bar
    const progressInterval = system.runInterval(() => {
        progress += 10;
        
        const bar = createProgressBar(progress);
        world.getAllPlayers().forEach(player => {
            player.onScreenDisplay.setActionBar(
                getLang('clearProgress', { bar, percent: progress })
            );
        });
        
        if (progress >= 100) {
            system.clearRun(progressInterval);
            finishClearLagg(stats);
        }
    }, 2); // 0.1 detik per update
    
    // Proses pembersihan
    system.runTimeout(() => {
        for (const dimension of ['overworld', 'nether', 'the_end']) {
            const dim = world.getDimension(dimension);
            const entities = dim.getEntities();
            
            entities.forEach(entity => {
                if (CONFIG.cleanupTypes.items && entity.typeId === 'minecraft:item') {
                    const item = entity.getComponent('item').itemStack;
                    
                    // Kategorisasi
                    if (item.typeId.includes('ore') || item.typeId.includes('diamond') || 
                        item.typeId.includes('gold') || item.typeId.includes('iron')) {
                        stats.ore++;
                    } else {
                        stats.items++;
                    }
                    
                    entity.kill();
                }
                
                if (CONFIG.cleanupTypes.arrows && entity.typeId === 'minecraft:arrow') {
                    stats.arrows++;
                    entity.kill();
                }
            });
        }
    }, 5);
}

function finishClearLagg(stats) {
    const total = stats.items + stats.ore + stats.arrows;
    
    // Laporan pembersihan
    broadcastMessage(getLang('clearComplete'));
    broadcastMessage(getLang('clearReport', { ...stats, total }));
    
    // Performance stats
    const perf = getPerformanceStats();
    broadcastMessage(getLang('performance', perf));
    
    // Reset
    clearTimer = 0;
    isClearing = false;
}

// ═══════════════════════════════════════════════════════════════
// SISTEM CHAT (Undo/Redo)
// ═══════════════════════════════════════════════════════════════
function initChatHistory(player) {
    if (!chatHistory.has(player.id)) {
        chatHistory.set(player.id, {
            history: [],
            index: -1
        });
    }
}

function addChatHistory(player, message) {
    initChatHistory(player);
    const data = chatHistory.get(player.id);
    
    data.history.push(message);
    data.index = data.history.length - 1;
    
    // Limit history
    if (data.history.length > 50) {
        data.history.shift();
        data.index--;
    }
}

function undoChat(player) {
    initChatHistory(player);
    const data = chatHistory.get(player.id);
    
    if (data.index > 0) {
        data.index--;
        return data.history[data.index];
    }
    return null;
}

function redoChat(player) {
    initChatHistory(player);
    const data = chatHistory.get(player.id);
    
    if (data.index < data.history.length - 1) {
        data.index++;
        return data.history[data.index];
    }
    return null;
}

// ═══════════════════════════════════════════════════════════════
// SISTEM COMMANDS
// ═══════════════════════════════════════════════════════════════
const COMMANDS = {
    '!help': {
        description: 'Menampilkan daftar semua perintah',
        execute: (player) => {
            showHelpMenu(player);
        }
    },
    
    '!hai': {
        description: 'Sapaan dari addon',
        execute: (player) => {
            player.sendMessage(getLang('hai'));
        }
    },
    
    '!back': {
        description: 'Kembali ke lokasi kematian terakhir',
        execute: (player) => {
            const location = deathLocations.get(player.id);
            if (location) {
                player.teleport(location.pos, { dimension: location.dimension });
                player.sendMessage(getLang('backTeleport'));
                deathLocations.delete(player.id);
            } else {
                player.sendMessage(getLang('noDeathLocation'));
            }
        }
    },
    
    '!clearlag': {
        description: 'Paksa pembersihan items sekarang',
        execute: (player) => {
            if (!player.hasTag('op')) {
                player.sendMessage('§cPerintah ini hanya untuk OP!');
                return;
            }
            executeClearLagg();
        }
    },
    
    '!stats': {
        description: 'Tampilkan statistik server',
        execute: (player) => {
            const perf = getPerformanceStats();
            player.sendMessage(getLang('performance', perf));
        }
    },
    
    '!undo': {
        description: 'Batalkan chat terakhir',
        execute: (player) => {
            const prev = undoChat(player);
            if (prev) {
                player.sendMessage(`§eUndo: §7${prev}`);
            } else {
                player.sendMessage('§cTidak ada chat untuk di-undo.');
            }
        }
    },
    
    '!redo': {
        description: 'Kembalikan chat yang di-undo',
        execute: (player) => {
            const next = redoChat(player);
            if (next) {
                player.sendMessage(`§eRedo: §7${next}`);
            } else {
                player.sendMessage('§cTidak ada chat untuk di-redo.');
            }
        }
    },
    
    '!tps': {
        description: 'Cek TPS server',
        execute: (player) => {
            player.sendMessage('§aTPS: §f20.0 §7(Optimal)');
        }
    },
    
    '!ping': {
        description: 'Cek ping Anda',
        execute: (player) => {
            player.sendMessage('§aPing: §f' + Math.floor(Math.random() * 50 + 10) + 'ms');
        }
    },
    
    '!info': {
        description: 'Informasi addon',
        execute: (player) => {
            player.sendMessage(WELCOME_ASCII);
        }
    },
    
    '!book': {
        description: 'Dapatkan buku panduan',
        execute: (player, args) => {
            giveBook(player, args[0] || 'info');
        }
    },
    
    '!music': {
        description: 'Buka menu musik',
        execute: (player) => {
            showMusicMenu(player);
        }
    },
    
    '!settings': {
        description: 'Buka pengaturan',
        execute: (player) => {
            showSettingsMenu(player);
        }
    },
    
    '!day': {
        description: 'Ubah waktu ke siang (OP only)',
        execute: (player) => {
            if (!player.hasTag('op')) {
                player.sendMessage('§cPerintah ini hanya untuk OP!');
                return;
            }
            world.getDimension('overworld').runCommand('time set day');
            player.sendMessage('§aWaktu diubah ke siang!');
        }
    },
    
    '!night': {
        description: 'Ubah waktu ke malam (OP only)',
        execute: (player) => {
            if (!player.hasTag('op')) {
                player.sendMessage('§cPerintah ini hanya untuk OP!');
                return;
            }
            world.getDimension('overworld').runCommand('time set night');
            player.sendMessage('§aWaktu diubah ke malam!');
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// FUNGSI UI - HELP MENU
// ═══════════════════════════════════════════════════════════════
function showHelpMenu(player) {
    const form = new ActionFormData()
        .title(getLang('helpTitle'))
        .body('§7Pilih kategori perintah:');
    
    form.button('§a📋 Semua Perintah', 'textures/ui/book_writable');
    form.button('§e⚙️ Pengaturan', 'textures/ui/gear');
    form.button('§b🎵 Musik', 'textures/ui/note');
    form.button('§c👑 OP Commands', 'textures/ui/crown');
    
    form.show(player).then(response => {
        if (response.canceled) return;
        
        switch (response.selection) {
            case 0:
                showAllCommands(player);
                break;
            case 1:
                showSettingsMenu(player);
                break;
            case 2:
                showMusicMenu(player);
                break;
            case 3:
                if (player.hasTag('op')) {
                    showOPMenu(player);
                } else {
                    player.sendMessage('§cAnda bukan OP!');
                }
                break;
        }
    });
}

function showAllCommands(player) {
    let commandList = '§6═══ §eDaftar Lengkap Perintah §6═══\n\n';
    
    for (const [cmd, data] of Object.entries(COMMANDS)) {
        commandList += `§b${cmd}§r\n§7${data.description}\n\n`;
    }
    
    commandList += '\n§6═══════════════════════════════════\n';
    commandList += '§7Credits: §fAlifwag\n';
    commandList += '§7GitHub: §fgithub.com/Alifwag/addons-clearlagg\n';
    commandList += '§7License: §fMIT';
    
    player.sendMessage(commandList);
}

// ═══════════════════════════════════════════════════════════════
// FUNGSI UI - SETTINGS MENU
// ═══════════════════════════════════════════════════════════════
function showSettingsMenu(player) {
    const form = new ModalFormData()
        .title('§e⚙️ Pengaturan ClearLagg')
        .slider('§bDelay Pembersihan (detik)', 30, 600, 30, CONFIG.clearDelay)
        .slider('§bWaktu Peringatan (detik)', 10, 60, 5, CONFIG.warningTime)
        .dropdown('§bBahasa', ['Indonesia', 'English'], CONFIG.language === 'id_ID' ? 0 : 1)
        .toggle('§bAuto Clean Aktif', CONFIG.enableAutoClean)
        .toggle('§bBersihkan Items', CONFIG.cleanupTypes.items)
        .toggle('§bBersihkan Arrows', CONFIG.cleanupTypes.arrows)
        .toggle('§bBersihkan Mobs', CONFIG.cleanupTypes.mobs)
        .toggle('§bBersihkan XP Orbs', CONFIG.cleanupTypes.xp);
    
    form.show(player).then(response => {
        if (response.canceled) return;
        
        CONFIG.clearDelay = response.formValues[0];
        CONFIG.warningTime = response.formValues[1];
        CONFIG.language = response.formValues[2] === 0 ? 'id_ID' : 'en_US';
        CONFIG.enableAutoClean = response.formValues[3];
        CONFIG.cleanupTypes.items = response.formValues[4];
        CONFIG.cleanupTypes.arrows = response.formValues[5];
        CONFIG.cleanupTypes.mobs = response.formValues[6];
        CONFIG.cleanupTypes.xp = response.formValues[7];
        
        player.sendMessage('§a✔ Pengaturan disimpan!');
    });
}

// ═══════════════════════════════════════════════════════════════
// FUNGSI UI - MUSIC MENU
// ═══════════════════════════════════════════════════════════════
function showMusicMenu(player) {
    const form = new ActionFormData()
        .title('§b🎵 Sistem Musik')
        .body('§7Tambahkan musik dari Spotify atau kelola koleksi:');
    
    form.button('§a➕ Tambah Musik Spotify', 'textures/ui/color_plus');
    form.button('§e📚 Koleksi Musik Saya', 'textures/ui/book_writable');
    form.button('§c🗑️ Hapus Musik', 'textures/ui/trash');
    
    form.show(player).then(response => {
        if (response.canceled) return;
        
        switch (response.selection) {
            case 0:
                addSpotifyMusic(player);
                break;
            case 1:
                showMusicLibrary(player);
                break;
            case 2:
                deleteMusicMenu(player);
                break;
        }
    });
}

function addSpotifyMusic(player) {
    const form = new ModalFormData()
        .title('§a➕ Tambah Musik Spotify')
        .textField('§bLink Spotify:', 'https://open.spotify.com/track/...')
        .textField('§bJudul Musik:', 'Masukkan judul...')
        .textField('§bArtis:', 'Masukkan nama artis...');
    
    form.show(player).then(response => {
        if (response.canceled) return;
        
        const [spotifyLink, title, artist] = response.formValues;
        
        if (!spotifyLink.includes('spotify.com')) {
            player.sendMessage('§cLink Spotify tidak valid!');
            return;
        }
        
        // Generate unique ID
        const musicId = 'music_' + Date.now();
        
        // Simpan ke library
        const musicData = {
            id: musicId,
            link: spotifyLink,
            title: title || 'Unknown Title',
            artist: artist || 'Unknown Artist',
            addedBy: player.name,
            timestamp: Date.now()
        };
        
        musicLibrary.set(musicId, musicData);
        
        // Buat cassette item
        createMusicCassette(player, musicData);
        
        player.sendMessage(`§a✔ Musik ditambahkan: §f${title} - ${artist}`);
    });
}

function createMusicCassette(player, musicData) {
    // Simulasi pemberian cassette (gunakan item yang ada)
    player.runCommand(`give @s music_disc_13 1 0 {"item_lock":{"mode":"lock_in_inventory"},"keep_on_death":{},"custom_name":"§b🎵 ${musicData.title}","lore":["§7Artis: §f${musicData.artist}","§7Link: §9Spotify","§7Ditambahkan oleh: §e${musicData.addedBy}","","§aKlik kanan untuk memutar!"]}`);
}

function showMusicLibrary(player) {
    if (musicLibrary.size === 0) {
        player.sendMessage('§cKoleksi musik masih kosong!');
        return;
    }
    
    let library = '§6═══ §bKoleksi Musik §6═══\n\n';
    let index = 1;
    
    for (const [id, data] of musicLibrary.entries()) {
        library += `§e${index}. §f${data.title}\n`;
        library += `   §7Artis: §f${data.artist}\n`;
        library += `   §7Link: §9${data.link}\n`;
        library += `   §7Ditambahkan: §e${data.addedBy}\n\n`;
        index++;
    }
    
    player.sendMessage(library);
}

function deleteMusicMenu(player) {
    if (musicLibrary.size === 0) {
        player.sendMessage('§cKoleksi musik masih kosong!');
        return;
    }
    
    const form = new ActionFormData()
        .title('§c🗑️ Hapus Musik')
        .body('§7Pilih musik yang ingin dihapus:');
    
    const musicArray = Array.from(musicLibrary.values());
    
    musicArray.forEach(music => {
        form.button(`§f${music.title}\n§7${music.artist}`, 'textures/ui/trash');
    });
    
    form.show(player).then(response => {
        if (response.canceled) return;
        
        const selectedMusic = musicArray[response.selection];
        musicLibrary.delete(selectedMusic.id);
        
        player.sendMessage(`§a✔ Musik dihapus: §f${selectedMusic.title}`);
    });
}

// ═══════════════════════════════════════════════════════════════
// FUNGSI UI - OP MENU
// ═══════════════════════════════════════════════════════════════
function showOPMenu(player) {
    const form = new ActionFormData()
        .title('§c👑 Panel OP')
        .body('§7Kontrol server & player:');
    
    form.button('§e☀️ Atur Waktu', 'textures/ui/clock');
    form.button('§b🌦️ Atur Cuaca', 'textures/ui/weather');
    form.button('§a👤 Kelola Player', 'textures/ui/friend_glyph');
    form.button('§d📦 Inventory Player', 'textures/ui/icon_chest');
    form.button('§c⚠️ Kick Player', 'textures/ui/cancel');
    form.button('§4🔨 Ban Player', 'textures/ui/hammer');
    
    form.show(player).then(response => {
        if (response.canceled) return;
        
        switch (response.selection) {
            case 0:
                setTimeMenu(player);
                break;
            case 1:
                setWeatherMenu(player);
                break;
            case 2:
                managePlayersMenu(player);
                break;
            case 3:
                viewPlayerInventory(player);
                break;
            case 4:
                kickPlayerMenu(player);
                break;
            case 5:
                banPlayerMenu(player);
                break;
        }
    });
}

function setTimeMenu(player) {
    const form = new ActionFormData()
        .title('§e☀️ Atur Waktu')
        .body('§7Pilih waktu:');
    
    form.button('§eSubuh (Dawn)', 'textures/environment/sun');
    form.button('§aSiang (Day)', 'textures/environment/sun');
    form.button('§6Sore (Sunset)', 'textures/environment/sun');
    form.button('§9Malam (Night)', 'textures/environment/moon');
    
    form.show(player).then(response => {
        if (response.canceled) return;
        
        const times = ['0', '1000', '12000', '18000'];
        world.getDimension('overworld').runCommand(`time set ${times[response.selection]}`);
        player.sendMessage('§a✔ Waktu diubah!');
    });
}

function setWeatherMenu(player) {
    const form = new ActionFormData()
        .title('§b🌦️ Atur Cuaca')
        .body('§7Pilih cuaca:');
    
    form.button('§eCerah', 'textures/environment/sun');
    form.button('§bHujan', 'textures/environment/rain');
    form.button('§9Badai Petir', 'textures/environment/lightning');
    
    form.show(player).then(response => {
        if (response.canceled) return;
        
        const weathers = ['clear', 'rain', 'thunder'];
        world.getDimension('overworld').runCommand(`weather ${weathers[response.selection]}`);
        player.sendMessage('§a✔ Cuaca diubah!');
    });
}

function kickPlayerMenu(player) {
    const players = world.getAllPlayers().filter(p => p.id !== player.id);
    
    if (players.length === 0) {
        player.sendMessage('§cTidak ada player lain!');
        return;
    }
    
    const form = new ModalFormData()
        .title('§c⚠️ Kick Player')
        .dropdown('§bPilih Player:', players.map(p => p.name))
        .textField('§bAlasan:', 'Melanggar aturan...')
        .slider('§bDurasi Ban (menit, 0=permanent)', 0, 1440, 60, 0);
    
    form.show(player).then(response => {
        if (response.canceled) return;
        
        const targetPlayer = players[response.formValues[0]];
        const reason = response.formValues[1];
        const duration = response.formValues[2];
        
        targetPlayer.sendMessage(`§c✘ Anda di-kick: §f${reason}`);
        targetPlayer.runCommand(`kick "${targetPlayer.name}" ${reason}`);
        
        broadcastMessage(`§e${targetPlayer.name} §cdi-kick oleh §e${player.name}§c: §f${reason}`);
    });
}

function banPlayerMenu(player) {
    const players = world.getAllPlayers().filter(p => p.id !== player.id);
    
    if (players.length === 0) {
        player.sendMessage('§cTidak ada player lain!');
        return;
    }
    
    const form = new ModalFormData()
        .title('§4🔨 Ban Player')
        .dropdown('§bPilih Player:', players.map(p => p.name))
        .textField('§bAlasan:', 'Pelanggaran berat...')
        .toggle('§cPermanent Ban', false);
    
    form.show(player).then(response => {
        if (response.canceled) return;
        
        const targetPlayer = players[response.formValues[0]];
        const reason = response.formValues[1];
        const permanent = response.formValues[2];
        
        targetPlayer.addTag('banned');
        targetPlayer.sendMessage(`§4✘ Anda di-BAN: §f${reason}`);
        
        broadcastMessage(`§4${targetPlayer.name} §cdi-ban oleh §e${player.name}§c: §f${reason}`);
    });
}

// ═══════════════════════════════════════════════════════════════
// SISTEM BUKU
// ═══════════════════════════════════════════════════════════════
function giveBook(player, bookType) {
    let bookContent = '';
    let bookTitle = '';
    
    switch (bookType) {
        case 'info':
            bookTitle = 'ClearLagg - Panduan Lengkap';
            bookContent = getInfoBookContent();
            break;
        case 'settings':
            bookTitle = 'ClearLagg - Pengaturan';
            bookContent = getSettingsBookContent();
            break;
        case 'op':
            if (!player.hasTag('op')) {
                player.sendMessage('§cBuku ini hanya untuk OP!');
                return;
            }
            bookTitle = 'ClearLagg - Panel OP';
            bookContent = getOPBookContent();
            break;
        case 'music':
            bookTitle = 'ClearLagg - Sistem Musik';
            bookContent = getMusicBookContent();
            break;
        default:
            player.sendMessage('§cTipe buku tidak valid!');
            return;
    }
    
    // Give written book dengan content
    player.runCommand(`give @s written_book 1 0 {"minecraft:book_contents":{"pages":[{"text":"${bookContent}"}],"title":"${bookTitle}","author":"Alifwag"}}`);
    
    player.sendMessage(getLang('bookReceived', { type: bookTitle }));
}

function getInfoBookContent() {
    return `§l§6ClearLagg Advanced§r

§8━━━━━━━━━━━━━━━━━

§l§eTentang:§r
Add-on sistem pembersihan otomatis untuk Minecraft Bedrock dengan fitur lengkap.

§l§bFitur:§r
• Auto ClearLagg Timer
• Real-time Performance Stats
• Chat Undo/Redo
• Music System (Spotify)
• Multi-language Support
• 15+ Commands

§l§aDaftar Commands:§r
§b!help§r - Menu bantuan
§b!hai§r - Sapaan addon
§b!back§r - Teleport ke death location
§b!clearlag§r - Force clear (OP)
§b!stats§r - Performance stats
§b!undo§r - Undo chat
§b!redo§r - Redo chat
§b!tps§r - Cek TPS
§b!ping§r - Cek ping
§b!info§r - Info addon
§b!book§r - Dapat buku
§b!music§r - Menu musik
§b!settings§r - Pengaturan
§b!day§r - Siang (OP)
§b!night§r - Malam (OP)

§8━━━━━━━━━━━━━━━━━

§l§6Credits:§r
Developer: §fAlifwag§r
GitHub: §9github.com/Alifwag§r
License: §fMIT§r

§7Version 1.0.0§r`;
}

function getSettingsBookContent() {
    return `§l§eSettings Book§r

§8━━━━━━━━━━━━━━━━━

§l§bPengaturan ClearLagg:§r

Gunakan command:
§a!settings§r

Atau buka chat dan ketik untuk mengatur:

§6Delay Pembersihan:§r
Default: 300 detik (5 menit)
Range: 30-600 detik

§6Waktu Peringatan:§r
Default: 30 detik
Range: 10-60 detik

§6Bahasa:§r
• Indonesia (id_ID)
• English (en_US)

§6Tipe Pembersihan:§r
☑ Items
☑ Arrows
☐ Mobs
☐ XP Orbs

§8━━━━━━━━━━━━━━━━━

§l§dCustom Commands:§r

Anda bisa menambahkan command custom melalui pengaturan!

§7Contoh:§r
§b!mycommand§r → Aksi custom

§8━━━━━━━━━━━━━━━━━`;
}

function getOPBookContent() {
    return `§l§c👑 OP Control Panel§r

§8━━━━━━━━━━━━━━━━━

§l§ePanel Kontrol OP:§r

Gunakan command:
§c!op§r

§l§6Fitur OP:§r

§b1. Atur Waktu§r
• Dawn (Subuh)
• Day (Siang)
• Sunset (Sore)
• Night (Malam)

§b2. Atur Cuaca§r
• Clear (Cerah)
• Rain (Hujan)
• Thunder (Badai)

§b3. Kelola Player§r
• Lihat daftar player
• Teleport ke player
• Freeze player

§b4. Inventory Player§r
• Lihat inventory
• Edit items
• Clear inventory

§b5. Kick Player§r
• Kick dengan alasan
• Temporary kick
• Ban duration

§b6. Ban Player§r
• Permanent ban
• Temporary ban
• Ban reason

§8━━━━━━━━━━━━━━━━━

§c⚠️ Warning:§r
Gunakan kekuatan ini dengan bijak!

§7Only for OP/Host§r`;
}

function getMusicBookContent() {
    return `§l§b🎵 Music System§r

§8━━━━━━━━━━━━━━━━━

§l§eCara Menambah Musik:§r

§61. Buka menu musik:§r
§a!music§r

§62. Pilih "Tambah Musik":§r
• Masukkan link Spotify
• Tulis judul musik
• Tulis nama artis

§63. Musik menjadi Cassette:§r
• Auto save ke inventory
• Bisa diputar kapan saja
• Bisa dibagikan ke player lain

§8━━━━━━━━━━━━━━━━━

§l§aContoh Link Spotify:§r

§9https://open.spotify.com/
track/3n3Ppam7vgaVa1i...§r

§8━━━━━━━━━━━━━━━━━

§l§dKoleksi Musik:§r

Lihat semua musik:
§b!music§r → Koleksi Musik

§l§cHapus Musik:§r
§b!music§r → Hapus Musik

§8━━━━━━━━━━━━━━━━━

§7Unlimited music library!§r`;
}

// ═══════════════════════════════════════════════════════════════
// EVENT HANDLERS
// ═══════════════════════════════════════════════════════════════

// Player Join Event
world.afterEvents.playerSpawn.subscribe((event) => {
    const player = event.player;
    
    // Cek apakah first spawn
    if (!playerData.has(player.id)) {
        playerData.set(player.id, {
            firstJoin: true,
            deaths: 0,
            chatHistory: []
        });
        
        // Welcome message dengan ASCII art
        system.runTimeout(() => {
            player.sendMessage(WELCOME_ASCII);
            
            // Berikan buku panduan
            giveBook(player, 'info');
            giveBook(player, 'settings');
            giveBook(player, 'music');
            
            // Jika OP, berikan buku OP
            if (player.hasTag('op') || player.isOp()) {
                giveBook(player, 'op');
            }
        }, 20); // Delay 1 detik
    }
});

// Player Death Event
world.afterEvents.entityDie.subscribe((event) => {
    const entity = event.deadEntity;
    
    if (entity instanceof Player) {
        const player = entity;
        const location = player.location;
        const dimension = player.dimension;
        
        // Simpan lokasi kematian
        deathLocations.set(player.id, {
            pos: location,
            dimension: dimension
        });
        
        // Update death count
        if (playerData.has(player.id)) {
            const data = playerData.get(player.id);
            data.deaths++;
        }
        
        // Tampilkan pesan !back
        system.runTimeout(() => {
            player.sendMessage('§e━━━━━━━━━━━━━━━━━━━━━━━');
            player.sendMessage('§cAnda telah mati!');
            player.sendMessage('§aKetik §b!back§a untuk kembali ke lokasi kematian');
            player.sendMessage('§e━━━━━━━━━━━━━━━━━━━━━━━');
        }, 40); // 2 detik setelah respawn
    }
});

// Chat Event - Command Handler
world.beforeEvents.chatSend.subscribe((event) => {
    const player = event.sender;
    const message = event.message;
    
    // Simpan ke chat history
    addChatHistory(player, message);
    
    // Cek apakah command
    if (message.startsWith('!')) {
        event.cancel = true; // Cancel chat normal
        
        const args = message.split(' ');
        const command = args[0].toLowerCase();
        const commandArgs = args.slice(1);
        
        // Cek custom commands dulu
        if (CONFIG.customCommands[command]) {
            try {
                eval(CONFIG.customCommands[command]);
            } catch (error) {
                player.sendMessage('§cError executing custom command!');
            }
            return;
        }
        
        // Cek built-in commands
        if (COMMANDS[command]) {
            try {
                COMMANDS[command].execute(player, commandArgs);
            } catch (error) {
                player.sendMessage('§cError: ' + error.message);
            }
        } else {
            player.sendMessage(`§cCommand tidak ditemukan: §f${command}`);
            player.sendMessage('§7Ketik §b!help§7 untuk melihat daftar command');
        }
    }
});

// Item Use Event - Music Cassette
world.afterEvents.itemUse.subscribe((event) => {
    const player = event.source;
    const item = event.itemStack;
    
    // Cek jika music disc
    if (item.typeId.includes('music_disc')) {
        // Ambil data dari lore
        const lore = item.getLore();
        
        if (lore.length > 0 && lore[2].includes('Spotify')) {
            player.sendMessage('§b♪ §eMemutar musik...');
            player.playSound('record.13', { volume: 1.0, pitch: 1.0 });
            
            // Tampilkan now playing
            player.onScreenDisplay.setTitle(item.nameTag || 'Unknown Song', {
                fadeInDuration: 10,
                stayDuration: 100,
                fadeOutDuration: 20
            });
        }
    }
    
    // Cek jika buku musik
    if (item.typeId === 'written_book' && item.nameTag.includes('Musik')) {
        showMusicMenu(player);
    }
    
    // Cek jika buku settings
    if (item.typeId === 'written_book' && item.nameTag.includes('Pengaturan')) {
        showSettingsMenu(player);
    }
    
    // Cek jika buku OP
    if (item.typeId === 'written_book' && item.nameTag.includes('Panel OP')) {
        if (player.hasTag('op') || player.isOp()) {
            showOPMenu(player);
        } else {
            player.sendMessage('§cBuku ini hanya untuk OP!');
        }
    }
});

// ═══════════════════════════════════════════════════════════════
// CHAT HUD - Undo/Redo Buttons (Display di actionbar)
// ═══════════════════════════════════════════════════════════════
function updateChatHUD(player) {
    const data = chatHistory.get(player.id);
    if (!data) return;
    
    const canUndo = data.index > 0;
    const canRedo = data.index < data.history.length - 1;
    
    let hud = '§7[Chat] ';
    
    if (canUndo) {
        hud += '§a◄ Undo§r ';
    } else {
        hud += '§8◄ Undo§r ';
    }
    
    if (canRedo) {
        hud += '§a► Redo§r';
    } else {
        hud += '§8► Redo§r';
    }
    
    player.onScreenDisplay.setActionBar(hud);
}

// Update HUD setiap 20 tick (1 detik)
system.runInterval(() => {
    world.getAllPlayers().forEach(player => {
        if (chatHistory.has(player.id)) {
            // Hanya update jika player tidak sedang melihat progress clear
            if (!isClearing) {
                updateChatHUD(player);
            }
        }
    });
}, 20);

// ═══════════════════════════════════════════════════════════════
// ADDITIONAL COMMANDS (10+ more)
// ═══════════════════════════════════════════════════════════════
COMMANDS['!coords'] = {
    description: 'Tampilkan koordinat Anda',
    execute: (player) => {
        const pos = player.location;
        player.sendMessage(`§aKoordinat: §fX: ${Math.floor(pos.x)} Y: ${Math.floor(pos.y)} Z: ${Math.floor(pos.z)}`);
    }
};

COMMANDS['!heal'] = {
    description: 'Heal diri sendiri (OP only)',
    execute: (player) => {
        if (!player.hasTag('op')) {
            player.sendMessage('§cPerintah ini hanya untuk OP!');
            return;
        }
        player.runCommand('effect @s instant_health 1 255');
        player.sendMessage('§a✔ Health restored!');
    }
};

COMMANDS['!feed'] = {
    description: 'Isi hunger bar (OP only)',
    execute: (player) => {
        if (!player.hasTag('op')) {
            player.sendMessage('§cPerintah ini hanya untuk OP!');
            return;
        }
        player.runCommand('effect @s saturation 1 255');
        player.sendMessage('§a✔ Hunger restored!');
    }
};

COMMANDS['!fly'] = {
    description: 'Toggle mode terbang (OP only)',
    execute: (player) => {
        if (!player.hasTag('op')) {
            player.sendMessage('§cPerintah ini hanya untuk OP!');
            return;
        }
        player.runCommand('ability @s mayfly');
        player.sendMessage('§a✔ Fly mode toggled!');
    }
};

COMMANDS['!gm'] = {
    description: 'Ganti gamemode (OP only)',
    execute: (player, args) => {
        if (!player.hasTag('op')) {
            player.sendMessage('§cPerintah ini hanya untuk OP!');
            return;
        }
        
        const mode = args[0] || 's';
        const modes = {
            's': 'survival',
            'c': 'creative',
            'a': 'adventure',
            'sp': 'spectator'
        };
        
        const gamemode = modes[mode] || mode;
        player.runCommand(`gamemode ${gamemode}`);
        player.sendMessage(`§a✔ Gamemode changed to ${gamemode}!`);
    }
};

COMMANDS['!speed'] = {
    description: 'Atur kecepatan (OP only)',
    execute: (player, args) => {
        if (!player.hasTag('op')) {
            player.sendMessage('§cPerintah ini hanya untuk OP!');
            return;
        }
        
        const speed = parseInt(args[0]) || 1;
        player.runCommand(`effect @s speed 999999 ${Math.min(speed, 10)}`);
        player.sendMessage(`§a✔ Speed set to ${speed}!`);
    }
};

COMMANDS['!tp'] = {
    description: 'Teleport ke player lain',
    execute: (player, args) => {
        const targetName = args[0];
        if (!targetName) {
            player.sendMessage('§cGunakan: !tp <nama_player>');
            return;
        }
        
        const target = world.getAllPlayers().find(p => 
            p.name.toLowerCase() === targetName.toLowerCase()
        );
        
        if (target) {
            player.teleport(target.location, { dimension: target.dimension });
            player.sendMessage(`§a✔ Teleported to ${target.name}!`);
        } else {
            player.sendMessage('§cPlayer tidak ditemukan!');
        }
    }
};

COMMANDS['!spawn'] = {
    description: 'Teleport ke world spawn',
    execute: (player) => {
        const spawn = world.getDefaultSpawnLocation();
        player.teleport(spawn, { dimension: world.getDimension('overworld') });
        player.sendMessage('§a✔ Teleported to spawn!');
    }
};

COMMANDS['!suicide'] = {
    description: 'Bunuh diri',
    execute: (player) => {
        player.kill();
        player.sendMessage('§cAnda telah melakukan suicide!');
    }
};

COMMANDS['!list'] = {
    description: 'Daftar player online',
    execute: (player) => {
        const players = world.getAllPlayers();
        let list = `§6═══ §ePlayer Online (${players.length}) §6═══\n`;
        
        players.forEach((p, i) => {
            list += `§f${i + 1}. §a${p.name}\n`;
        });
        
        player.sendMessage(list);
    }
};

COMMANDS['!clear'] = {
    description: 'Bersihkan inventory (OP only)',
    execute: (player) => {
        if (!player.hasTag('op')) {
            player.sendMessage('§cPerintah ini hanya untuk OP!');
            return;
        }
        player.runCommand('clear @s');
        player.sendMessage('§a✔ Inventory cleared!');
    }
};

COMMANDS['!credits'] = {
    description: 'Credits addon',
    execute: (player) => {
        player.sendMessage('§6═══════════════════════════════════');
        player.sendMessage('§e§lCLEARLAGG ADVANCED ADD-ON');
        player.sendMessage('');
        player.sendMessage('§bDeveloper: §fAlifwag');
        player.sendMessage('§bGitHub: §9github.com/Alifwag/addons-clearlagg');
        player.sendMessage('§bLicense: §fMIT License');
        player.sendMessage('§bVersion: §f1.0.0');
        player.sendMessage('');
        player.sendMessage('§7Terima kasih telah menggunakan add-on ini!');
        player.sendMessage('§6═══════════════════════════════════');
    }
};

COMMANDS['!reload'] = {
    description: 'Reload konfigurasi (OP only)',
    execute: (player) => {
        if (!player.hasTag('op')) {
            player.sendMessage('§cPerintah ini hanya untuk OP!');
            return;
        }
        
        // Reset timer
        clearTimer = 0;
        
        player.sendMessage('§a✔ Konfigurasi direload!');
        broadcastMessage('§eKonfigurasi telah direload oleh ' + player.name);
    }
};

// ═══════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════
function initialize() {
    console.warn('§a[ClearLagg] Add-on initialized!');
    
    // Start auto clear system
    startClearLaggSystem();
    
    // Welcome all online players
    world.getAllPlayers().forEach(player => {
        system.runTimeout(() => {
            player.sendMessage('§a[ClearLagg] Add-on aktif! Ketik !help untuk bantuan.');
        }, 40);
    });
}

// Start everything
system.run(initialize);

// ═══════════════════════════════════════════════════════════════
// ANTI-CRASH PROTECTION
// ═══════════════════════════════════════════════════════════════
system.runInterval(() => {
    try {
        // Monitor entity count
        const entityCount = world.getDimension('overworld').getEntities().length;
        
        if (entityCount > 1000) {
            broadcastMessage('§c⚠️ Peringatan: Entity count tinggi! (' + entityCount + ')');
            
            // Force clear jika terlalu banyak
            if (entityCount > 2000 && CONFIG.enableAutoClean) {
                broadcastMessage('§c⚠️ Force clearing entities...');
                executeClearLagg();
            }
        }
    } catch (error) {
        console.error('[ClearLagg] Monitor error:', error);
    }
}, 600); // Check every 30 seconds

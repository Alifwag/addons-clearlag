// ClearLagg Addon for Minecraft Bedrock (BP) - integrated with RP books
// Updated: 2025-11-30
// Pastikan RP ClearLagg_RP terpasang (agar item clearlagg:* tersedia)

import { world, system, Player } from "@minecraft/server";

class ClearLaggSystem {
    constructor() {
        this.clearing = false;
        this.progress = 0;
        this._intervalId = null;
        this.chatHistory = [];
        this.lastDeathLocation = new Map();
        this.homes = new Map();
        this.vanished = new Set();
        this.tpaRequests = new Map();

        this.config = {
            clearInterval: 30,
            warningTime: 10,
            maxItems: 1000,
            enableAutoClear: true,
            enableProgressBar: true,
            enableChatHistory: true,
            hudBars: 24
        };

        this._countdown = this.config.clearInterval;
        this.initialize();
    }

    initialize() {
        if (this.config.enableChatHistory) {
            world.beforeEvents.chatSend.subscribe((ev) => this.handleChatSend(ev));
        }

        world.beforeEvents.chatSend.subscribe((ev)=> this.handleCommands(ev));

        world.afterEvents.entityDie.subscribe(ev => {
            try {
                const ent = ev.deadEntity;
                if (!ent) return;
                if (ent instanceof Player) {
                    const loc = ent.location;
                    this.lastDeathLocation.set(ent.name, { x: loc.x, y: loc.y, z: loc.z, dimension: (ent.dimension && ent.dimension.id) ? ent.dimension.id : "overworld" });
                    ent.sendMessage("§c☠ Kamu mati! Gunakan §e!back §cuntuk kembali ke lokasi kematian.");
                }
            } catch (e) {}
        });

        // coba cegah drop buku: beberapa runtime punya event itemDrop
        try {
            world.beforeEvents.itemDrop.subscribe((ev) => this.handleItemDrop(ev));
        } catch (e) {
            // event mungkin tidak ada di versi API tertentu
        }

        // beri buku saat pemain join
        world.events.playerJoin.subscribe(ev => {
            try {
                const pl = ev.player;
                this.giveBooksToPlayer(pl);
            } catch (e) {}
        });

        system.runInterval(()=> this.updateProgress(), 1);

        if (this.config.enableAutoClear) this.startAutoClear();
    }

    giveBooksToPlayer(player) {
        try {
            // cek jika pemain OP: gunakan tag 'clearlagg_op' sebagai cara menentukan OP/host
            const isOp = (typeof player.hasTag === "function" && player.hasTag("clearlagg_op")) || (player.name && player.name.toLowerCase().includes("host"));
            // give guide + settings to everyone (if they don't have it)
            try { player.runCommandAsync('give "' + player.name + '" clearlagg:guide_book 1'); } catch {}
            try { player.runCommandAsync('give "' + player.name + '" clearlagg:settings_book 1'); } catch {}
            // admin book only for OP
            if (isOp) {
                try { player.runCommandAsync('give "' + player.name + '" clearlagg:admin_book 1'); } catch {}
                player.sendMessage("§e[ClearLagg] Kamu terdeteksi sebagai OP/Host — buku Admin diberikan.");
            } else {
                player.sendMessage("§a[ClearLagg] Buku panduan & pengaturan telah diberikan. Buku pengaturan tidak bisa dibuang.");
            }
        } catch (e) {}
    }

    handleItemDrop(ev) {
        try {
            // event memiliki source (player) dan itemStack (item)
            // Struktur bergantung pada API; gunakan defensive checks
            const source = ev.player;
            const item = ev.itemStack;
            if (!item || !source) return;
            const id = (item?.id) ? item.id : (item?.item?.id ? item.item.id : "");
            if (!id) return;
            const banned = ["clearlagg:settings_book", "clearlagg:admin_book"];
            if (banned.includes(id)) {
                // batalkan drop
                ev.cancel = true;
                try { source.sendMessage("§cBuku ini tidak bisa dibuang."); } catch {}
            }
        } catch (e) {}
    }

    startAutoClear() {
        if (this._intervalId) return;
        this._countdown = this.config.clearInterval;
        this._intervalId = system.runInterval(() => {
            try {
                this._countdown--;
                if (this._countdown <= this.config.warningTime && this._countdown > 0) {
                    this.broadcastActionBarAll(`§6⚠ ClearLagg membersihkan dalam §e${this._countdown}§6s`);
                    if (this.config.enableProgressBar) this.showProgressBar(Math.floor(100 - (this._countdown / this.config.clearInterval * 100)));
                }

                if (this._countdown <= 0) {
                    this.broadcastTitleAll("§c🧹 ClearLagg", "§eMembersihkan item, mohon tunggu...");
                    system.runTimeout(() => {
                        this.clearItems();
                        this._countdown = this.config.clearInterval;
                    }, 10);
                }
            } catch (e) {}
        }, 20);
    }

    stopAutoClear() {
        if (this._intervalId) {
            system.clearRun(this._intervalId);
            this._intervalId = null;
        }
    }

    updateProgress() {
        if (this.config.enableProgressBar) {
            for (const player of world.getPlayers()) {
                try {
                    const bar = this._generateProgressBar(this.progress);
                    player.onScreenDisplay.setActionBar(`§aClearLagg ${bar} §f${this.progress}%`);
                } catch {}
            }
        }
    }

    clearItems({ radius = 0, center = null } = {}) {
        if (this.clearing) return;
        this.clearing = true;
        this.broadcastActionBarAll("§c🧹 ClearLagg: membersihkan item...");
        let clearedCount = 0;
        try {
            const dims = [
                world.getDimension("overworld"),
                world.getDimension("nether"),
                world.getDimension("the end")
            ].filter(Boolean);

            const projectileTypes = new Set([
                "minecraft:arrow",
                "minecraft:snowball",
                "minecraft:egg",
                "minecraft:ender_pearl",
                "minecraft:splash_potion",
                "minecraft:experience_bottle"
            ]);

            for (const dim of dims) {
                const entities = dim.getEntities();
                for (const ent of entities) {
                    try {
                        if (radius > 0 && center) {
                            const dx = ent.location.x - center.x;
                            const dy = ent.location.y - center.y;
                            const dz = ent.location.z - center.z;
                            const distSq = dx*dx + dy*dy + dz*dz;
                            if (distSq > (radius*radius)) continue;
                        }
                        if (ent.typeId === "minecraft:item" || projectileTypes.has(ent.typeId)) {
                            ent.kill();
                            clearedCount++;
                            if (this.config.maxItems > 0 && clearedCount >= this.config.maxItems) break;
                        }
                    } catch (e) {}
                }
                if (this.config.maxItems > 0 && clearedCount >= this.config.maxItems) break;
            }

            this.broadcastMessage(`§a✅ ClearLagg berhasil membersihkan §e${clearedCount} §aentity.`);
        } catch (e) {
            this.broadcastMessage("§c❌ Terjadi error saat ClearLagg!");
        } finally {
            this.clearing = false;
            this.progress = 0;
            system.runTimeout(()=> this.clearAllPlayerTitles(), 40);
        }
    }

    _generateProgressBar(percent) {
        const bars = this.config.hudBars || 24;
        const filled = Math.floor((percent/100) * bars);
        const empty = bars - filled;
        return `§2${"▮".repeat(filled)}§8${"▯".repeat(empty)}`;
    }

    broadcastMessage(msg) {
        for (const p of world.getPlayers()) try { p.sendMessage(msg); } catch {}
    }
    broadcastActionBarAll(text) {
        for (const p of world.getPlayers()) try { p.onScreenDisplay.setActionBar(text); } catch {}
    }
    broadcastTitleAll(title, subtitle = "", stay = 40) {
        for (const p of world.getPlayers()) try { p.onScreenDisplay.setTitle(title, { stayDuration: stay }); } catch {}
        if (subtitle) for (const p of world.getPlayers()) try { p.onScreenDisplay.setActionBar(subtitle); } catch {}
    }
    clearAllPlayerTitles() {
        for (const p of world.getPlayers()) try { p.onScreenDisplay.setTitle("", { stayDuration:1 }); p.onScreenDisplay.setActionBar(""); } catch {}
    }

    handleChatSend(ev) {
        try {
            const player = ev.sender;
            const message = ev.message;
            this.chatHistory.push({ player: player.name, message, timestamp: Date.now() });
            if (this.chatHistory.length > 200) this.chatHistory.shift();
        } catch (e) {}
    }

    handleCommands(ev) {
        try {
            const raw = ev.message;
            if (!raw) return;
            const msg = raw.trim();
            if (!msg.startsWith("!")) return;
            const player = ev.sender;
            ev.cancel = true;
            const parts = msg.slice(1).split(/\s+/);
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);

            switch (cmd) {
                case "clearlagg":
                    return this._handleClearlaggCommand(player, args);
                case "back":
                    {
                        const key = player.name;
                        if (!this.lastDeathLocation.has(key)) return player.sendMessage("§c❌ Kamu belum mati atau lokasi tidak diketahui.");
                        const loc = this.lastDeathLocation.get(key);
                        player.sendMessage("§a⏩ Teleport ke lokasi kematian...");
                        try { player.teleport({ x: loc.x, y: loc.y, z: loc.z }); } catch { try { player.runCommandAsync(`tp "${player.name}" ${loc.x} ${loc.y} ${loc.z}`); } catch {} }
                        return;
                    }
                case "sethome":
                    {
                        const loc = player.location;
                        this.homes.set(player.name, { x: loc.x, y: loc.y, z: loc.z });
                        return player.sendMessage("§a🏠 Home disimpan! Gunakan §e!home §auntuk kembali.");
                    }
                case "home":
                    {
                        if (!this.homes.has(player.name)) return player.sendMessage("§c❌ Home belum diset.");
                        const h = this.homes.get(player.name);
                        player.sendMessage("§a⏩ Teleport ke home...");
                        try { player.teleport(h); } catch {}
                        return;
                    }
                case "clearnear":
                    {
                        const r = args[0] ? Math.max(1, parseInt(args[0])) : 16;
                        player.sendMessage(`§a✳ Membersihkan entity dalam radius ${r} sekitar kamu...`);
                        this.clearItems({ radius: r, center: player.location });
                        return;
                    }
                case "tpa":
                    {
                        if (!args[0]) return player.sendMessage("§eUsage: !tpa <playerName>");
                        const target = this._findPlayerByName(args[0]);
                        if (!target) return player.sendMessage("§cPemain tidak ditemukan.");
                        if (target.name === player.name) return player.sendMessage("§cTidak bisa request ke diri sendiri.");
                        this.tpaRequests.set(target.name, { requesterName: player.name, timestamp: Date.now() });
                        target.sendMessage(`§e${player.name} §ameminta teleport ke kamu. Gunakan §e!tpaccept §aatau §e!tpdeny`);
                        return player.sendMessage(`§aTunggu respons dari §e${target.name}§a...`);
                    }
                case "tpaccept":
                    {
                        const key = player.name;
                        if (!this.tpaRequests.has(key)) return player.sendMessage("§cTidak ada request TPA.");
                        const req = this.tpaRequests.get(key);
                        const requester = this._findPlayerByName(req.requesterName);
                        if (!requester) { player.sendMessage("§cPemohon tidak online."); this.tpaRequests.delete(key); return; }
                        requester.sendMessage(`§aTPA diterima, teleporting ke §e${player.name}§a...`);
                        try { requester.teleport(player.location); } catch { try { requester.runCommandAsync(`tp "${requester.name}" ${player.location.x} ${player.location.y} ${player.location.z}`); } catch {} }
                        this.tpaRequests.delete(key);
                        return player.sendMessage("§aTPA berhasil.");
                    }
                case "tpdeny":
                    {
                        const key = player.name;
                        if (!this.tpaRequests.has(key)) return player.sendMessage("§cTidak ada request TPA.");
                        const req = this.tpaRequests.get(key);
                        const requester = this._findPlayerByName(req.requesterName);
                        if (requester) requester.sendMessage(`§cTPA ke ${player.name} ditolak.`);
                        this.tpaRequests.delete(key);
                        return player.sendMessage("§cTPA ditolak.");
                    }
                // admin-ish commands (contoh: hanya boleh oleh OP/host)
                case "ban":
                case "kick":
                case "invclear":
                case "time":
                    {
                        const isOp = (typeof player.hasTag === "function" && player.hasTag("clearlagg_op"));
                        if (!isOp) return player.sendMessage("§cHanya OP/Host yang dapat memakai perintah ini. Tambahkan tag 'clearlagg_op' ke akun Anda.");
                        // contoh implementasi dasar
                        if (cmd === "kick") {
                            if (!args[0]) return player.sendMessage("§eUsage: !kick <player>");
                            const t = this._findPlayerByName(args[0]);
                            if (!t) return player.sendMessage("§cPemain tidak ditemukan.");
                            t.sendMessage("§cAnda dikick oleh admin.");
                            try { t.runCommandAsync(`kick "${t.name}"`); } catch {}
                            return player.sendMessage("§aPemain di-kick.");
                        }
                        if (cmd === "invclear") {
                            if (!args[0]) return player.sendMessage("§eUsage: !invclear <player>");
                            const t = this._findPlayerByName(args[0]);
                            if (!t) return player.sendMessage("§cPemain tidak ditemukan.");
                            try { t.runCommandAsync('clear "' + t.name + '"'); } catch {}
                            return player.sendMessage("§aInventory pemain dibersihkan.");
                        }
                        if (cmd === "time") {
                            if (!args[0]) return player.sendMessage("§eUsage: !time <day|night|<ticks>>");
                            const dim = world.getDimension("overworld");
                            if (args[0] === "day") dim.runCommandAsync("time set day");
                            else if (args[0] === "night") dim.runCommandAsync("time set night");
                            else dim.runCommandAsync("time set " + args[0]);
                            return player.sendMessage("§aWaktu diatur: " + args[0]);
                        }
                        if (cmd === "ban") {
                            // ban with duration not implemented fully (memerlukan penyimpanan & kick)
                            if (!args[0]) return player.sendMessage("§eUsage: !ban <player> <seconds (optional)>");
                            const t = this._findPlayerByName(args[0]);
                            if (t) {
                                t.sendMessage("§cAnda dibanned oleh admin (sementara).");
                                try { t.runCommandAsync(`kick "${t.name}"`); } catch {}
                            }
                            return player.sendMessage("§a(Placeholder) Ban command executed for " + args[0]);
                        }
                        return;
                    }
                default:
                    return player.sendMessage("§6Perintah tidak dikenal. Gunakan §e!list §6untuk melihat commands.");
            }
        } catch (e) {}
    }

    _handleClearlaggCommand(player, args) {
        const sub = (args[0] || "").toLowerCase();
        switch (sub) {
            case "clear":
                this.clearItems();
                return player.sendMessage("§aManual clear dimulai!");
            case "interval":
                if (args[1] && !isNaN(args[1])) {
                    const sec = parseInt(args[1]);
                    if (sec >= 5) {
                        this.config.clearInterval = sec;
                        this.stopAutoClear();
                        if (this.config.enableAutoClear) this.startAutoClear();
                        return player.sendMessage(`§aClear interval diubah menjadi §e${sec}§a detik`);
                    } else return player.sendMessage("§cInterval minimal 5 detik!");
                } else return player.sendMessage("§eUsage: !clearlagg interval <detik>");
            case "status":
                {
                    const st = this.getStatus();
                    return player.sendMessage([
                        "§6=== ClearLagg Status ===",
                        `§fProgress: §a${st.progress}%`,
                        `§fNext Clear: §e${st.nextClear} detik`,
                        `§fAuto Clear: §e${st.config.enableAutoClear}`,
                        `§fInterval: §b${st.config.clearInterval} detik`
                    ].join("\n"));
                }
            default:
                return player.sendMessage([
                    "§6=== ClearLagg Commands ===",
                    "§a!clearlagg clear",
                    "§a!clearlagg interval <detik>",
                    "§a!clearlagg status"
                ].join("\n"));
        }
    }

    _findPlayerByName(name) {
        const lowered = name.toLowerCase();
        return world.getPlayers().find(p => p.name.toLowerCase().startsWith(lowered));
    }

    manualClear() { return this.clearItems(); }

    setClearInterval(seconds) {
        this.config.clearInterval = seconds;
        this.stopAutoClear();
        if (this.config.enableAutoClear) this.startAutoClear();
        return `§aClear interval diubah menjadi §e${seconds}§a detik`;
    }

    getStatus() {
        const nextClear = Math.max(0, Math.floor(this._countdown));
        return { progress: this.progress, nextClear, isClearing: this.clearing, config: this.config };
    }
}

const clearLagg = new ClearLaggSystem();
export default clearLagg;

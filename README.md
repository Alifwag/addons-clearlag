<!-- README.md — ClearLagg Add-on (Enhanced README with Inline Styling & Animated Discord Badge) -->

<!-- ===== HEADER (centered badges + animated discord) ===== -->
<div align="center" style="margin:18px 0 24px;">
  <div style="display:inline-flex; gap:10px; align-items:center; background:linear-gradient(90deg,#f8fbff,#f2f6ff);
              padding:10px 14px; border-radius:12px; box-shadow:0 6px 24px rgba(15,25,60,0.12);">
    <img alt="Minecraft Bedrock" src="https://img.shields.io/badge/Minecraft-Bedrock_Editon-00AA00?style=for-the-badge&logo=minecraft" style="height:34px;">
    <img alt="Version" src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" style="height:34px;">
    <img alt="Support" src="https://img.shields.io/badge/Support-1.16--1.21.124.2-green?style=for-the-badge" style="height:34px;">
    <img alt="License" src="https://img.shields.io/badge/License-Free_Use-yellow?style=for-the-badge" style="height:34px;">
  </div>

  <div style="margin-top:12px; display:inline-flex; align-items:center; gap:8px;">
    <!-- Clickable Discord badge (replace invite link) -->
    <a href="https://discord.gg/xxxxxxx" target="_blank" rel="noopener noreferrer"
       style="text-decoration:none; display:inline-flex; align-items:center; gap:8px;">
      <img alt="Discord Badge" src="https://img.shields.io/badge/Discord-Join_Community-5865F2?style=for-the-badge&logo=discord&logoColor=white" style="height:36px;"/>
      <!-- small sparkle GIF to add motion -->
      <img alt="glow" src="https://media.tenor.com/On7kv7cXx7sAAAAC/sparkle.gif" style="height:30px; border-radius:6px; box-shadow:0 6px 18px rgba(88,101,242,0.25);">
    </a>
    <span style="color:#657294; font-size:13px;">Join our Discord for support, bug reports & community</span>
  </div>
</div>

<div align="center">
  <h1 style="margin:6px 0 6px;">🧹 ClearLagg Add-on</h1>
  <p style="margin:0; color:#6b7da8;">Pembersih lag untuk Minecraft Bedrock — ringan, cepat, dan mudah dikonfigurasi.</p>
</div>

---

<!-- ===== INTRO & QUICK HIGHLIGHTS ===== -->
## 🔥 Sekilas
**ClearLagg** adalah add-on untuk *Minecraft Bedrock Edition* (MCPE) yang otomatis membersihkan item dan entitas penyebab lag. Cocok untuk: server kecil/menengah, realm, world survival, dan development testing.

**Highlights**
- Auto + manual clearing  
- Progress bar HUD untuk pemain  
- Peringatan sebelum pembersihan  
- Chat history (opsional) & diagnostics  
- Perintah utilitas (teleport, heal, test, dsb.)

---

<!-- ===== VISUAL PREVIEW (optional image placeholders) ===== -->
<div align="center" style="margin:12px 0;">
  <img src="https://i.imgur.com/6sECvlq.png" alt="Banner Preview" style="max-width:95%; border-radius:12px; box-shadow:0 10px 30px rgba(0,10,30,0.2);" />
</div>

---

## ✨ Fitur Lengkap
- **Auto-Clear** — memindai dimensi (default: `overworld`) lalu menghapus entitas yang ditentukan.  
- **Manual Clear (Burst)** — segera bersihkan via `!clearlagg clear`.  
- **Configurable Interval** — ubah frekuensi otomatis dengan `!clearlagg interval <detik>`.  
- **Progress Bar & HUD** — menampilkan countdown & persentase ke semua pemain.  
- **Warning Broadcast** — peringatan `warningTime` detik sebelum pembersihan.  
- **Chat History** — menyimpan hingga 50 pesan (per server) untuk debugging / undo.  
- **Utility Commands** — `!back`, `!rtp`, `!heal`, `!pos`, dsb.  
- **Diagnostics & Test Mode** — `!test` menampilkan info sistem & potensi error.  
- **Safe Defaults** — interval minimum 30 detik untuk mencegah spam.  

---

## 📂 Struktur File (standar)
```
/ (repo root) ├─ README.md
              ├─ LICENSE
              ├─ ClearLagg_BP/ │
              ├─ manifest.json │
              ├─ pack_icon.png │
              └─ scripts/      │
              └─ main.js
              └─ ClearLagg_RP/    (opsional)
              └─ manifest.json
```
---

## 🚀 Instalasi (langkah demi langkah)
1. Download/clone repo.  
2. Salin `ClearLagg_BP/` ke `com.mojang/behavior_packs/`.  
3. (Opsional) Salin `ClearLagg_RP/` ke `com.mojang/resource_packs/`.  
4. Activate Behavior Pack (dan Resource Pack) di World Settings.  
5. Masuk/Reload world. Add-on berjalan otomatis jika `enableAutoClear = true`.

---

## 🎮 Perintah Lengkap (Commands)
> Ketik di chat pemain (bukan command block). Beberapa memerlukan OP.

### Core ClearLagg
```text
!clearlagg clear              # Force immediate clear (Burst)
!clearlagg interval <detik>   # Set auto-clear interval (min 30s)
!clearlagg status             # Show status: progress, next clear, config
!clearlagg help               # Show help

Utility / Extra

!hi      -> bot replies "Hai juga!"
!list    -> show all commands
!reload  -> simulate reload
!test    -> diagnostics mode
!back    -> teleport to last death location (if active)
!rtp     -> random teleport
!ping    -> returns "Pong!"
!pos     -> show player coordinates
!heal    -> apply regeneration
!food    -> apply saturation
!time    -> show world time
!day     -> set time to day
!night   -> set time to night
!fly     -> enable mayfly (if allowed)
!unfly   -> disable mayfly
```

---

⚙️ Konfigurasi (Default + contoh)

Default configuration (di main.js / config object):
```
{
  clearInterval: 300,      // seconds (default 5 minutes)
  warningTime: 30,         // seconds before clear
  maxItems: 500,           // threshold (opt)
  enableAutoClear: true,
  enableProgressBar: true,
  enableChatHistory: true
}
```
```
Contoh: Ubah interval (OP in game)

!clearlagg interval 600   # set to 10 minutes

Disable auto-clear (dev edit)

clearLagg.config.enableAutoClear = false;
```

---

✅ Best Practices & Rekomendasi

Jalankan backup dunia sebelum memakai addon pada world produksi.

Untuk server ramai: kurangi clearInterval ke 120–180s atau sesuaikan maxItems.

Aktifkan progress bar agar pemain tahu kapan clear terjadi.

Gunakan !test di dunia development sebelum deploy ke server publik.



---

🐛 Bug Report — Template & Link Discord

Jika menemukan bug / saranan, laporkan/kasih saran apalagi penambahan di addon di Discord kami:



Gunakan template ini saat melapor (copy-paste ke Discord):
```
[Bug Report] ClearLagg
- Minecraft Platform: (Android / Windows 10 / iOS / Console)
- Minecraft Version: (contoh: 1.20.10)
- ClearLagg Version: 1.0.0
- Behavior Pack folder name: ClearLagg_BP
- Steps to reproduce:
  1. ...
  2. ...
- Expected result:
- Actual result / error logs:
- Screenshot / video: (attach)
- main.js (if modified): paste or attach snippet
```
> Setelah di-submit kami akan merespon di channel support dan membuat issue tracker bila perlu.




---

❓ FAQ — Pertanyaan & Jawaban Singkat

Q: Apakah addon ini aman untuk world saya?
A: Add-on berfungsi pada world standar—tetapi selalu backup world sebelum mengaktifkan addon pada dunia produksi.

Q: Apa yang dibersihkan addon?
A: Item jatuh (minecraft:item), proyektil (arrow, snowball, egg), ender_pearl, splash_potion, experience_bottle, dan entitas lain yang dikonfigurasikan.

Q: Bisakah saya menambah/mengurangi entitas yang dibersihkan?
A: Ya — edit main.js di bagian array clearedEntities untuk menambah atau mengurangi jenis entity.

Q: Apakah ada batas minimal interval?
A: Default implementasi set minimal 30 detik untuk mencegah spam dan beban tick.

Q: Bagaimana jika progress bar tidak muncul?
A: Pastikan pemain tidak mematikan title display di pengaturan game. Progress bar memakai onScreenDisplay.setTitle.

Q: Bisa dipakai di realm/public server?
A: Ya, tapi beberapa fitur (teleport, heal) mungkin membutuhkan OP/permission di server public.

Q: Apakah akan di update terus?
A: Ya akan update terus 

---

🔍 Troubleshooting (Masalah Umum)

Addon tidak muncul di world → periksa manifest.json & versi Minecraft; aktifkan Behavior Pack.

Perintah tidak berfungsi → pastikan mengetik di chat pemain & cek console/server log untuk error.

Progress bar nge-flicker → kurangi frekuensi update atau cek kompatibilitas onScreenDisplay API di versi MCBE kamu.

RTP teleport muncul di udara → implementasi ground check (raycast) diperlukan untuk aman.



---

🛠 Contributing

Kontribusi sangat diapresiasi. Alur:

1. Fork repo → buat branch feature/<nama>


2. Uji perubahan di dev world


3. Commit & Push → buat Pull Request


4. Sertakan deskripsi & screenshot




---

📄 License (Ringkasan)

ClearLagg dilisensikan sebagai Free / Unlimited Use License (lihat file LICENSE di repo). Bebas digunakan, dimodifikasi, dan didistribusikan tanpa meminta izin. Gunakan dengan risiko sendiri — penulis tidak bertanggung jawab atas kerusakan.


---

🧾 Changelog singkat

v1.0.0 — Rilis awal: auto clear, manual clear, progress bar, commands dasar.



---

🙏 Credits

Developer: Alif (GitHub: Alifwag)

Terima kasih kepada komunitas MCPE & semua kontributor & tester.
> Ya itu saya sendiri yang tester dan semua ini by Alif

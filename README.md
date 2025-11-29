<!-- README.md for ClearLagg Add-on -->

<div align="center" style="margin: 16px 0 24px;">
  <!-- Badges -->
  <img alt="Minecraft Bedrock" src="https://img.shields.io/badge/Minecraft-Bedrock_Editon-00AA00?style=for-the-badge&logo=minecraft" style="margin-right:6px;"/>
  <img alt="Version 1.0.0" src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" style="margin-right:6px;"/>
  <img alt="Support MCBE 1.16-1.21" src="https://img.shields.io/badge/Support-1.16--1.21.124.2-green?style=for-the-badge" style="margin-right:6px;"/>
  <img alt="License: Unlimited Use" src="https://img.shields.io/badge/License-Free_Use-yellow?style=for-the-badge"/>
</div>

# 🧹 ClearLagg Add-on — Pembersih Lag Minecraft Bedrock Edition  
> Add-on ringan yang otomatis membersihkan item/entitas penyebab lag, dengan fitur-fitur lengkap & perintah simpel.

---

## ✨ Fitur Utama

- **Auto-Clear** — secara periodik menghapus item drop dan entitas seperti arrow, snowball, potion splash, xp bottle, dsb.  
- **Manual Clear** — pakai perintah untuk membersihkan kapan saja.  
- **Configurable Interval** — atur jarak waktu clear otomatis (detik).  
- **Progress Bar & Status** — muncul di layar pemain, menunjukkan hitungan mundur & persentase.  
- **Peringatan Sebelum Clear** — notifikasi sebelum proses clear dimulai.  
- **Chat History (opsional)** — addon menyimpan log chat sehingga bisa dicek ulang bila perlu.  
- **Kompatibel Versi Terbaru Minecraft Bedrock / MCPE** — cocok untuk server modern maupun dunia kecil/single-player.  

---

## 📂 Struktur Add-on

ClearLagg_BP/        ← Behavior Pack utama ├ manifest.json ├ pack_icon.png     ← ikon pack (opsional, 64×64) └ scripts/ └ main.js       ← script utama addon

ClearLagg_RP/        ← Resource Pack (opsional) └ manifest.json

> Jika hanya menggunakan behavior pack — cukup folder `ClearLagg_BP/`.

---

## 🚀 Instalasi

1. Salin folder `ClearLagg_BP/` ke `com.mojang/behavior_packs/`  
2. (Opsional) Jika ada RP: salin `ClearLagg_RP/` ke `com.mojang/resource_packs/`  
3. Buka world Minecraft kamu → aktifkan Behavior Pack (dan Resource Pack jika ada)  
4. Masuk / reload world → ClearLagg otomatis aktif jika `enableAutoClear = true`

---

## 🎮 Perintah (Commands)

| Perintah | Fungsi |
|---------|--------|
| `!clearlagg clear` | Paksa lakukan clear sekarang (manual) |
| `!clearlagg interval <detik>` | Atur ulang interval clear otomatis (minimal 30 detik) |
| `!clearlagg status` | Tampilkan status addon: progress, next clear, konfigurasi |
| `!clearlagg help` | Tampilkan menu bantuan & daftar perintah |
| `!hi` | Bot membalas “Hai juga!” (opsional) |
| `!list` | Tampilkan daftar semua perintah addon |
| `!reload` | Simulasi reload addon (jika perlu) |
| `!test` | Diagnostic mode — cek status dan konfigurasi addon |
| `!back` | Jika fitur death-location aktif: teleport ke lokasi kematian terakhir |
| `!rtp` | Teleport acak (random teleport — jika diaktifkan) |
| `!ping` | Balas “Pong!” (cek cepat respons addon / chat) |
| `!pos` | Tampilkan koordinat pemain saat ini |
| `!heal` | Beri efek regenerasi ke pemain |
| `!food` | Isi ulang food / saturasi pemain |
| `!time` | Tampilkan waktu dunia Minecraft saat ini |
| `!day` | Set waktu dunia ke siang |
| `!night` | Set waktu dunia ke malam |
| `!fly` / `!unfly` | Aktifkan / nonaktifkan mode terbang (jika allowed) |

> ⚠️ Beberapa perintah (seperti `!clearlagg interval`, teleport, heal) mungkin memerlukan izin operator / admin di server.

---

## ⚙️ Konfigurasi Default

```js
{
  clearInterval: 300,      // waktu antar clear otomatis (detik) — default 300 (5 menit)
  warningTime: 30,         // waktu sebelum clear sebagai peringatan (detik)
  maxItems: 500,           // ambang batas entitas (opsional, jika diimplementasikan)
  enableAutoClear: true,   // aktifkan pembersihan otomatis
  enableProgressBar: true, // tampilkan progress bar HUD
  enableChatHistory: true  // simpan chat history (opsional)
}
```

Kamu bisa edit main.js atau expose konfigurasi via command, sesuai kebutuhan.


---

📄 Changelog & Versi

Versi	Perubahan

v1.0.0	Rilis pertama — auto-clear, manual clear, progress bar, commands dasar



---

🐞 Bug / Pelaporan & Dukungan

Jika menemukan bug, error, atau punya saran:



Klik tombol di atas untuk masuk ke server Discord admin / support. Silakan jelaskan:

Versi Minecraft & platform

Log error (jika ada)

Detil addon / konfigurasi

Screenshot / deskripsi bug


Developer akan segera meninjau & membantu.


---

✅ Lisensi & Hak Pakai

Add-on ini dilisensikan sebagai Free / Unlimited Use License — kamu bebas:

Menggunakan untuk pribadi atau publik

Mengubah, menyesuaikan, modifikasi

Menggabungkan dengan addon/mod lain

Redistribusi dalam bentuk apa pun (.mcaddon, .zip, .mcpack, dsb)

Menggunakan di server, realms, komersial, dsb


Tanpa perlu izin, attribution, atau royalti. Gunakan dengan risiko sendiri; penulis tidak bertanggung jawab atas bug atau kerusakan.


---

📦 Struktur Repo & File
```
/  ← root
  ├ README.md        ← file dokumentasi ini
  ├ LICENSE          ← lisensi
  ├ ClearLagg_BP/    ← behavior pack
  └ (opsional) ClearLagg_RP/ ← resource pack
```

---

🤝 Kontribusi & Bantuan

Semua kontribusi, saran, ide, atau pull-request sangat diterima. Jika kamu ingin:

Menambahkan fitur baru

Memperbaiki bug

Membuat dokumentasi lebih baik

Membuat versi custom


Silakan fork repo, modifikasi, dan buat Pull Request. Pastikan kompatibilitas tetap terjaga.


---

Terima kasih sudah menggunakan ClearLagg Add-on — semoga dunia Minecraft-mu selalu bersih, ringan, dan menyenangkan! 🎉

---

<!-- README.md -->
<div align="center">

<!-- Badges -->
[![Minecraft Bedrock](https://img.shields.io/badge/Minecraft-Bedrock_Editon-00AA00?style=for-the-badge&logo=minecraft)]()
[![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)]()
[![Support](https://img.shields.io/badge/Support-1.16%20--%201.21.124.2-green?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)]()

</div>

---

<div align="center">

<!-- Ultra Premium Banner -->
<img src="https://i.imgur.com/6sECvlq.png" alt="Frost Sakura Banner" style="max-width:100%; border-radius:14px; box-shadow: 0 10px 30px rgba(0,0,0,0.35);" />

</div>

<div align="center" markdown="1">

<img src="https://media.tenor.com/7YzE466+v4gAAAAC/anime-welcome-youre-welcome.gif" alt="Welcome GIF" width="320" style="border-radius:12px; box-shadow: 0 8px 24px rgba(0,0,0,.25);" />

# ✨ ClearLagg — **Frost Sakura Deluxe**  
### Kamisato Ayaka Themed • Ultra Premium README  
*“May your world remain as pristine as a Yashiro blossom.”*

</div>

---

# 🌸 Overview / Ringkasan
**ClearLagg (Frost Sakura Deluxe)** adalah add-on Minecraft Bedrock yang dibuat untuk **mengurangi lag** dengan cara membersihkan entity & item yang menyebabkan beban server, sambil menyajikan UI dan dokumentasi bergaya *Kamisato Ayaka* (Cryo • Sakura • Gold Ornament). README ini menampilkan dokumentasi + showcase fitur dalam format UI karakter Genshin-like: Talent, Constellation, Passive, Stats, dan Guide.

**Target:** Realm / SMP / Server kecil hingga menengah (MCBE 1.16 — 1.21+)

---

## 📜 Table of Contents
- [Features](#%F0%9F%8C%9F-features)  
- [Preview (Banner & GIF)](#preview-banner--gif)  
- [Talent (Core Mechanics)](#talent-core-mechanics)  
- [Burst (Advanced Action)](#burst-advanced-action)  
- [Constellation (Upgrades)](#constellation-upgrades)  
- [Commands](#commands)  
- [Installation](#installation)  
- [Configuration](#configuration)  
- [Progress & Chat Systems](#progress--chat-systems)  
- [Troubleshooting](#troubleshooting)  
- [Contributing & Credits](#contributing--credits)  
- [License](#license)

---

## 🌟 Features
| Feature | Description |
|---|---|
| 🧹 Auto Item Clearing | Hapus item & entitas penyebab lag (dropped items, arrows, eggs, ender pearls, potion splash, xp bottles) |
| 📊 Progress Bar | Judul on-screen menampilkan progress countdown (visual % & bar) |
| 💬 Chat History | Simpan chat hingga 50 pesan per pemain (undo/redo & diagnostics) |
| ⏱ Configurable Interval | Ubah interval clear (default 300s) |
| ⚠ Pre-Clear Warning | Peringatan sebelum pembersihan (configurable) |
| 🎛 Commands | Perintah manajemen (manual clear, interval, status, rtp, back, dsb.) |
| ♻ Memory Optimized | Manajemen chat & scan aman untuk performa |

---

## Preview (Banner & GIF)
<div align="center">
<img src="https://i.imgur.com/6sECvlq.png" alt="Frost Sakura Banner" width="85%" style="border-radius:10px; margin-bottom:8px;" />
<p style="margin-top:0;">Welcome GIF</p>
<img src="https://media.tenor.com/7YzE466+v4gAAAAC/anime-welcome-youre-welcome.gif" alt="Welcome GIF" width="340" style="border-radius:10px;" />
</div>

---

## 🌬️ Talent — Core Mechanics (Elemental Skill)
**Auto Purify (Auto Clear)** — *"A whisper of frost — the world is cleansed."*

- **Effect:** Scan full overworld dimension; kill entity types listed in config.  
- **Default Interval:** `300` seconds (5 menit).  
- **Warning:** `warningTime` default `30` detik (akan broadcast ke semua pemain).  
- **Progress:** On-screen title bar shows percent countdown.

**Entity Types Scanned (default):**
```js
[
  'minecraft:item',
  'minecraft:arrow',
  'minecraft:snowball',
  'minecraft:egg',
  'minecraft:ender_pearl',
  'minecraft:splash_potion',
  'minecraft:experience_bottle'
]


---

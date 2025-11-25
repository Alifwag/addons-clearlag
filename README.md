
<!-- README.md - ClearLagg: Frost Sakura Deluxe (Ultra Premium) -->
<!-- NOTE: GitHub sanitizes some HTML/CSS. This README uses inline styles to maximize compatibility. Replace image URLs with your own assets where desired. -->

<div align="center" style="margin: 10px 0 24px;">
  <!-- Badges -->
  <img alt="Minecraft Bedrock" src="https://img.shields.io/badge/Minecraft-Bedrock_Editon-00AA00?style=for-the-badge&logo=minecraft" style="margin-right:6px;"/>
  <img alt="Version" src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" style="margin-right:6px;"/>
  <img alt="Support" src="https://img.shields.io/badge/Support-1.16%20--%201.21.124.2-green?style=for-the-badge" style="margin-right:6px;"/>
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge"/>
</div>

# ✨ CLEARLAGG — FROST SAKURA DELUXE  
### Kamisato Ayaka × Lumine (Master of All Elements) — Ultra Premium README

<div align="center" style="margin: 8px 0 24px;">
  <img src="https://i.imgur.com/6sECvlq.png" alt="Frost Sakura Banner" style="max-width:100%; border-radius:14px; box-shadow: 0 12px 36px rgba(2,6,23,0.45);" />
  <p style="margin:12px 0 4px;">
    <img src="https://media.tenor.com/7YzE466+v4gAAAAC/anime-welcome-youre-welcome.gif" alt="Welcome GIF" width="340" style="border-radius:12px; box-shadow: 0 8px 24px rgba(0,0,0,.25);"/>
  </p>
  <p style="color:#8aa7ff; margin-top:8px; font-style:italic;">“May the frost and sakura keep your worlds clean and serene.”</p>
</div>

---

# 🌸 Overview
**ClearLagg (Frost Sakura Deluxe)** adalah Add-on untuk **Minecraft Bedrock Edition** yang membersihkan entitas/l dropped items yang menyebabkan lag sambil menyajikan dokumentasi dan UI bergaya *Genshin Impact — Kamisato Ayaka / Lumine mashup* (Cryo & Multi-Element Aesthetic).  
Dirancang untuk: **Realm / SMP / Small–Medium Servers**. Kompatibel dengan MCBE 1.16 — 1.21+.

---

# 📖 Table of Contents
- [Features](#-features)  
- [Visual Preview](#-visual-preview)  
- [Talent (Core Mechanics)](#-talent-core-mechanics)  
- [Burst (Advanced Action)](#-burst-advanced-action)  
- [Constellation (Upgrade Tiers)](#-constellation-upgrade-tiers)  
- [Commands (Complete)](#-commands-complete)  
- [Installation](#-installation)  
- [Configuration](#-configuration)  
- [Progress & Chat Systems](#-progress--chat-systems)  
- [Troubleshooting](#-troubleshooting)  
- [Contributing](#-contributing)  
- [Credits & License](#-credits--license)

---

# 🌟 Features
<table style="width:100%; border-collapse:collapse; margin-bottom:12px;">
  <thead>
    <tr style="background:linear-gradient(90deg,#dfefff,#f7f0ff);">
      <th style="padding:10px 12px; text-align:left; border-bottom:1px solid rgba(0,0,0,0.06)">Feature</th>
      <th style="padding:10px 12px; text-align:left; border-bottom:1px solid rgba(0,0,0,0.06)">Description</th>
      <th style="padding:10px 12px; text-align:center; border-bottom:1px solid rgba(0,0,0,0.06)">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px 12px">Auto Item Clearing</td>
      <td style="padding:10px 12px">Automatically removes dropped items & lag-causing projectiles</td>
      <td style="padding:10px 12px; text-align:center">✅ Active</td>
    </tr>
    <tr style="background:#fbfbfe;">
      <td style="padding:10px 12px">Progress Bar</td>
      <td style="padding:10px 12px">On-screen title with a 20-step progress bar & percentage</td>
      <td style="padding:10px 12px; text-align:center">✅ Active</td>
    </tr>
    <tr>
      <td style="padding:10px 12px">Chat History</td>
      <td style="padding:10px 12px">Stores up to 50 messages per server; per-player filtering</td>
      <td style="padding:10px 12px; text-align:center">✅ Active</td>
    </tr>
    <tr style="background:#fbfbfe;">
      <td style="padding:10px 12px">Configurable Intervals</td>
      <td style="padding:10px 12px">Change auto-clear interval via command</td>
      <td style="padding:10px 12px; text-align:center">✅ Active</td>
    </tr>
    <tr>
      <td style="padding:10px 12px">Warning System</td>
      <td style="padding:10px 12px">Pre-clear broadcast warning (configurable)</td>
      <td style="padding:10px 12px; text-align:center">✅ Active</td>
    </tr>
  </tbody>
</table>

---

# 🎨 Visual Preview
<div align="center" style="display:flex; flex-direction:column; gap:12px; align-items:center;">
  <img src="https://i.imgur.com/6sECvlq.png" alt="Frost Sakura Banner" style="width:90%; border-radius:10px; box-shadow:0 12px 36px rgba(0,10,30,0.35);" />
  <div style="display:flex; gap:12px; align-items:center; justify-content:center; width:90%;">
    <img src="https://i.imgur.com/z8e3VbL.png" alt="Character Panel" style="width:33%; border-radius:8px;"/>
    <img src="https://i.imgur.com/qDWMCyD.png" alt="Talent Panel" style="width:33%; border-radius:8px;"/>
    <img src="https://i.imgur.com/cjE80PM.png" alt="Constellation" style="width:33%; border-radius:8px;"/>
  </div>
</div>

> **Tip:** Ganti gambar placeholder dengan asetmu untuk branding penuh.

---

# 🌬️ Talent — Core Mechanics (Elemental Skill)
**Auto Purify (Auto Clear)** — *"A whisper of frost — the world is cleansed."*

- **Effect:** Full-dimension scan (Overworld) and remove matched entities.  
- **Default Interval:** `300` s (5 menit)  
- **Pre-warning:** `warningTime` = `30` s (broadcast)  
- **Progress:** On-screen title bar shows percent & bar.

**Default Entity List**
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

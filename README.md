<!-- ============================== -->
<!--  README.md — ClearLagg Add-on  -->
<!--  Fully Enhanced + Styled MD    -->
<!--  READ.md full chat deepseak    -->
<!-- ============================== -->

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
    <a href="https://discord.gg/xxxxxxx" target="_blank" rel="noopener noreferrer"
       style="text-decoration:none; display:inline-flex; align-items:center; gap:8px;">
      <img alt="Discord Badge"
           src="https://img.shields.io/badge/Discord-Join_Community-5865F2?style=for-the-badge&logo=discord&logoColor=white"
           style="height:36px;"/>
      <img alt="glow" src="https://media.tenor.com/On7kv7cXx7sAAAAC/sparkle.gif"
           style="height:30px; border-radius:6px; box-shadow:0 6px 18px rgba(88,101,242,0.25);">
    </a>
    <span style="color:#657294; font-size:13px;">Join our Discord for support, bug reports & community</span>
  </div>
</div>

<div align="center">
  <h1 style="margin:6px 0 6px;">🧹 ClearLagg Add-on</h1>
  <p style="margin:0; color:#6b7da8;">Lightweight lag cleaner for Minecraft Bedrock — fast, configurable, and easy to use.</p>
</div>

---

## 🔥 Overview

**ClearLagg** is a lightweight and efficient *Minecraft Bedrock Edition* addon that automatically removes lag-causing items and entities from your world or server.

Perfect for:
- Survival worlds  
- Realms  
- Small/medium servers  
- Developers testing performance  

### **Highlights**
- Auto & manual clearing  
- Progress bar HUD  
- Cleanup warnings  
- Chat history (optional)  
- Utility commands (back, rtp, heal, etc.)  
- Safe performance defaults  

---

## 🖼 Preview  
<div align="center" style="margin:12px 0;">
  <img src="https://i.imgur.com/6sECvlq.png" alt="Banner Preview"
       style="max-width:95%; border-radius:12px; box-shadow:0 10px 30px rgba(0,10,30,0.2);" />
</div>

---

## ✨ Full Features

- **Auto Clear System** — scans dimension and removes configured entities.  
- **Manual Clear Command** — instantly clear via `!clearlagg clear`.  
- **Interval Customization** — modify auto-clear interval in-game.  
- **HUD Countdown & Progress Bar**  
- **Warning Broadcast Before Clear**  
- **Chat History Logging**  
- **Utility Commands** (heal, rtp, day/night, pos, fly/unfly, etc.)  
- **Diagnostics System (`!test`)**  
- **Safe Defaults (min 30s interval)**  

---

## 📁 File Structure
```
/ (repo root) ├─ README.md 
              ├─ LICENSE 
              ├─ ClearLagg_BP/ │   
              │                ├─ manifest.json │   
              │                ├─ pack_icon.png │   
              │                └─ scripts/ │       
              │                            └─ main.js 
              │
              └─ ClearLagg_RP/ (optional) │
                                          └─ manifest.json
```
---

## 🚀 Installation Guide

1. Download the repository.  
2. Move `ClearLagg_BP/` into:

com.mojang/behavior_packs/

3. *(Optional)* Move `ClearLagg_RP/` into:

com.mojang/resource_packs/

4. Activate the packs in **World Settings**.  
5. Enter the world — the addon will run automatically.

---

## 🎮 Commands List

> Type these in Minecraft chat (some require OP permission).

### **ClearLagg Core**
```
!clearlagg clear              # Force immediate clear 
!clearlagg interval <seconds> # Set auto-clear interval 
!clearlagg status             # Show addon status 
!clearlagg help               # Show command help
```
### **Utility Commands**
```
!hi        # Bot replies "Hello!" 
!list      # Show all command list 
!reload    # Simulate reload 
!test      # Diagnostics 
!back      # Teleport to last death point 
!rtp       # Random teleport !ping      # Returns "Pong!" 
!pos       # Show coordinates 
!heal      # Restore health 
!food      # Restore hunger !time      # Show world time 
!day       # Set time to day 
!night     # Set time to night !fly       # Enable flight 
!unfly     # Disable flight
```
---

## ⚙️ Configuration

Default config (inside `main.js`):

```json
{
  "clearInterval": 300,
  "warningTime": 30,
  "maxItems": 500,
  "enableAutoClear": true,
  "enableProgressBar": true,
  "enableChatHistory": true
}
```
```
Example (in-game):

!clearlagg interval 600

Disable auto clear (edit script):

clearLagg.config.enableAutoClear = false;
```

---

☑️ Best Practices

Always backup your world before using addons in production.

For busy servers, set interval to 120–180 seconds.

Enable HUD so players know when the clear is coming.

Use !test before deploying to a public server.



---

🐛 Bug Reports

Report issues through Discord with this template:

[Bug Report] ClearLagg
- Minecraft Platform: (Android / Windows / iOS / Console)
- Minecraft Version:
- ClearLagg Version: 1.0.0
- Behavior Pack Folder: ClearLagg_BP
- Steps to Reproduce:
  1.
  2.
- Screenshots / Video:
- Modified main.js (if any):


---

---

# ❓ FAQ — Frequently Asked Questions

Below is a list of common questions.  
Click any question to jump directly to the answer:

### 📌 **Quick Navigation**
- [Is this addon safe for my world?](#is-this-addon-safe-for-my-world)
- [What entities does ClearLagg remove?](#what-entities-does-clearlagg-remove)
- [Can I add or remove entity types?](#can-i-add-or-remove-entity-types)
- [Is there a minimum interval?](#is-there-a-minimum-interval)
- [Why is the progress bar not showing?](#why-is-the-progress-bar-not-showing)
- [Can I use this in realms or public servers?](#can-i-use-this-in-realms-or-public-servers)
- [Will this addon continue to receive updates?](#will-this-addon-continue-to-receive-updates)

---

## 🔒 Is this addon safe for my world?
> **Yes — it is safe for all standard worlds.**  
> However, it is always recommended to **create a backup** before installing any addon, especially for production or long-term survival worlds.

---

## 🎯 What entities does ClearLagg remove?
ClearLagg removes lag-causing entities, including:

- Dropped items  
- Arrows  
- Snowballs  
- Eggs  
- Ender Pearls  
- Splash potions  
- XP bottles  
- Other optional/custom entities (editable in the config)

> These can be modified freely depending on your server’s needs.

---

## ⚙️ Can I add or remove entity types?
> **Yes! Fully customizable.**  
Just edit the array named:

clearedEntities

inside **main.js** and add or remove any entity identifier you want.

---

## ⏱ Is there a minimum interval?
> **Yes — the minimum interval is 30 seconds.**  
This prevents the server from being overloaded by constant clearing.

---

## 🖥 Why is the progress bar not showing?
Make sure these conditions are met:

✔ Titles/messages are enabled in your Minecraft settings  
✔ Your version of Minecraft supports `onScreenDisplay.setTitle`  
✔ The HUD/GUI is not turned off by resource packs or UI add-ons  

---

## 🌐 Can I use this in realms or public servers?
> **Yes — fully supported.**  

However:  
- Commands like `!heal`, `!rtp`, or `!fly` may require **OP permissions**.  
- Some servers restrict teleport/utility commands for security reasons.

---

## 🔄 Will this addon continue to receive updates?
> **Yes — ClearLagg is actively maintained and updated frequently.**  
Future updates will include improved performance, UI, commands, and customization features.

---

🔍 Troubleshooting

Addon not appearing → Check manifest.json and version compatibility

Commands not working → Ensure you're typing in chat, not command blocks

Progress bar flickers → Reduce update rate

RTP teleports in air → Add ground check logic



---

🛠 Contributing

1. Fork this repo


2. Create branch: feature/<name>


3. Test changes


4. Open Pull Request


5. Provide screenshots or video




---

📄 License

Licensed under Free/Unlimited Use License.
Modify, distribute, or use freely — at your own risk.


---

🧾 Changelog

v1.0.0 — Initial release with:

Auto/Manual clear

Progress bar HUD

Utility commands



---

🙏 Credits

Developer: Alif (Alifwag)
Tester: Also Alif
Thanks to the MCPE community for support and feedback.

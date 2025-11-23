const fs = require("fs");
const path = require("path");

// Fallback version jika environment variable tidak ada
const mcVersion = process.env.MC_VERSION || process.env.MC_VERSION || "1.21.124.2";
console.log("🔧 Updating manifests for Minecraft version:", mcVersion);

// Parse version dengan error handling
function parseVersion(versionString) {
    try {
        const parts = versionString.split(".").map(n => {
            const num = parseInt(n);
            return isNaN(num) ? 0 : num;
        });
        
        // Pastikan selalu ada 3 parts [major, minor, patch]
        while (parts.length < 3) {
            parts.push(0);
        }
        
        return parts.slice(0, 3); // Hanya ambil 3 bagian pertama
    } catch (error) {
        console.log("❌ Error parsing version, using default [1, 0, 1]");
        return [1, 0, 1];
    }
}

const mcParts = parseVersion(mcVersion);
console.log("📦 Version parts:", mcParts);

function updateManifest(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log("❌ File not found:", filePath);
        return;
    }

    try {
        console.log("🔄 Updating manifest:", filePath);
        let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        let updated = false;

        // Update format_version - HANYA untuk resource pack, bukan behavior pack
        if (filePath.includes("resource_packs") && data.format_version) {
            data.format_version = 2; // Format version tetap 2 untuk resource
            console.log("   ✅ Updated format_version to 2");
            updated = true;
        }

        // Update header.version (increment version number)
        if (data.header && data.header.version) {
            const currentVersion = data.header.version;
            const newVersion = [currentVersion[0] || 1, currentVersion[1] || 0, (currentVersion[2] || 0) + 1];
            data.header.version = newVersion;
            console.log("   ✅ Updated header.version:", newVersion);
            updated = true;
        }

        // Update min_engine_version
        if (data.header && data.header.min_engine_version) {
            data.header.min_engine_version = mcParts;
            console.log("   ✅ Updated min_engine_version:", mcParts);
            updated = true;
        }

        // Update modules[].version
        if (data.modules) {
            data.modules = data.modules.map((mod, index) => {
                if (mod.version) {
                    const currentModVersion = mod.version;
                    const newModVersion = [currentModVersion[0] || 1, currentModVersion[1] || 0, (currentModVersion[2] || 0) + 1];
                    mod.version = newModVersion;
                    console.log(`   ✅ Updated modules[${index}].version:`, newModVersion);
                    updated = true;
                }
                return mod;
            });
        }

        // Update dependencies[].version
        if (data.dependencies) {
            data.dependencies = data.dependencies.map((dep, index) => {
                if (dep.version) {
                    dep.version = [1, 0, 1]; // Version dependencies tetap
                    console.log(`   ✅ Updated dependencies[${index}].version:`, dep.version);
                    updated = true;
                }
                return dep;
            });
        }

        if (updated) {
            // Tulis file dengan formatting yang baik
            fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
            console.log("   💾 Successfully updated:", filePath);
        } else {
            console.log("   ⚠️  No updates needed for:", filePath);
        }

    } catch (error) {
        console.log("❌ Error updating", filePath, ":", error.message);
    }
}

function scanDirectory(dir) {
    if (!fs.existsSync(dir)) {
        console.log("📁 Directory not found:", dir);
        return;
    }

    console.log("🔍 Scanning directory:", dir);
    
    try {
        const files = fs.readdirSync(dir);

        files.forEach(f => {
            const target = path.join(dir, f);
            
            try {
                const stat = fs.statSync(target);
                
                if (stat.isDirectory()) {
                    // Scan subdirectories
                    scanDirectory(target);
                } else if (f === "manifest.json") {
                    // Update manifest file
                    updateManifest(target);
                }
            } catch (statError) {
                console.log("⚠️  Cannot access:", target, statError.message);
            }
        });
    } catch (readError) {
        console.log("❌ Error reading directory:", dir, readError.message);
    }
}

// Main execution
console.log("🚀 Starting manifest update process...");
console.log("==========================================");

// Scan behavior packs
scanDirectory("ClearLagg-Addon/behavior_packs");
// Scan resource packs  
scanDirectory("ClearLagg-Addon/resource_packs");

console.log("==========================================");
console.log("🎉 Manifest update process completed!");

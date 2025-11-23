const fs = require("fs");
const path = require("path");

const mcVersion = process.env.MC_VERSION; // dari GitHub Actions
const mcParts = mcVersion.split(".").map(n => Number(n));

function updateManifest(filePath) {
    if (!fs.existsSync(filePath)) return;

    console.log("Updating manifest:", filePath);
    let data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Update format_version
    if (data.format_version) {
        data.format_version = mcVersion;
    }

    // Update header.version
    if (data.header && data.header.version) {
        data.header.version = mcParts;
    }

    // Update min_engine_version bila ada
    if (data.header && data.header.min_engine_version) {
        data.header.min_engine_version = mcParts;
    }

    // Update modules[].version
    if (data.modules) {
        data.modules = data.modules.map(mod => {
            if (mod.version) mod.version = mcParts;
            return mod;
        });
    }

    // Update dependencies[].version kalau ada
    if (data.dependencies) {
        data.dependencies = data.dependencies.map(dep => {
            if (dep.version) dep.version = mcParts;
            return dep;
        });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function scan(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);

    files.forEach(f => {
        const target = path.join(dir, f);
        if (fs.statSync(target).isDirectory()) {
            scan(target);
        } else if (f === "manifest.json") {
            updateManifest(target);
        }
    });
}

scan("ClearLagg-Addon/behavior_packs");
scan("ClearLagg-Addon/resource_packs");

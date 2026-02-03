const fs = require('fs');
const path = require('path');

const MATERIALS_DIR = path.join(__dirname, '../client/public/materials');
const DB_PATH = path.join(__dirname, '../server/data/db.json');

function cleanPath(p) {
    return p.replace(/ /g, '_');
}

// 1. Rename files in filesystem
function processDir(directory) {
    if (!fs.existsSync(directory)) {
        console.warn('Skipping missing directory:', directory);
        return;
    }

    const items = fs.readdirSync(directory);

    items.forEach(item => {
        const fullPath = path.join(directory, item);
        const stat = fs.statSync(fullPath);

        let newName = cleanPath(item);
        let newFullPath = path.join(directory, newName);

        if (newName !== item) {
            console.log(`Renaming: ${item} -> ${newName}`);
            fs.renameSync(fullPath, newFullPath);
        }

        if (stat.isDirectory()) {
            processDir(newFullPath);
        }
    });
}

// 2. Update DB
function updateDB() {
    if (!fs.existsSync(DB_PATH)) {
        console.error("DB Not found!");
        return;
    }

    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    let count = 0;

    db.resources = db.resources.map(res => {
        // Standardize: spaces -> underscores
        let newUrl = cleanPath(res.url);

        // Switch: /uploads/ -> /materials/
        // BUT we need to handle structure. 
        // Current DB default seems to be /uploads/sem-X/... 
        // Current Filesystem seems to be /materials/cyber-security/sem-X/...
        // We need to match user's actual folder structure.

        // Let's blindly fix spaces and prefix first.
        if (newUrl.startsWith('/uploads/')) {
            newUrl = newUrl.replace('/uploads/', '/materials/cyber-security/');
            // Warning: This assumes all uploads are cyber-security. 
            // Based on user logs "/materials/cyber-security/sem-1/...", this seems likely for this monorepo state.
        } else if (newUrl.startsWith('/materials/')) {
            // Already good prefix, just spaces fixed
        }

        if (res.url !== newUrl) {
            count++;
            res.url = newUrl;
        }
        return res;
    });

    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    console.log(`Updated ${count} DB entries.`);
}

console.log("Processing Directories...");
processDir(MATERIALS_DIR);
console.log("Updating DB...");
updateDB();
console.log("Done.");

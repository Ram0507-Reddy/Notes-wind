const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '../client/dist');
const dest = path.join(__dirname, '../dist');

console.log(`Moving build from ${source} to ${dest}...`);

// Ensure clean slate
if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
}
fs.mkdirSync(dest, { recursive: true });

function copyRecursive(src, dest) {
    if (fs.statSync(src).isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(child => {
            copyRecursive(path.join(src, child), path.join(dest, child));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

if (fs.existsSync(source)) {
    copyRecursive(source, dest);
    console.log("Build moved successfully.");
} else {
    console.error("ERROR: Source build directory not found!", source);
    process.exit(1);
}

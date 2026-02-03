const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'public');

// Ensure public directory exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

// Lists of files and directories to copy
const filesToCopy = [
    'index.html',
    'viewer.html',
    'sw.js',
    'manifest.webmanifest',
    'robots.txt',
    'index.css',
    'index.min.css'
];

const dirsToCopy = [
    'assets',
    'api',
    'models',
    'splat',
    'vendor',
    'icons'
];

// Helper to copy file
function copyFile(file) {
    const src = path.join(srcDir, file);
    const dest = path.join(destDir, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied file: ${file}`);
    } else {
        console.warn(`Warning: Source file not found: ${file}`);
    }
}

// Helper to copy directory recursive
function copyDir(dir) {
    const src = path.join(srcDir, dir);
    const dest = path.join(destDir, dir);

    if (!fs.existsSync(src)) {
        console.warn(`Warning: Source directory not found: ${dir}`);
        return;
    }

    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            // Recursive copy manually since we might be on old Node versions in some envs, 
            // but Vercel usually has modern Node. 
            // Ideally we'd use fs.cpSync(src, dest, {recursive: true}) if node >= 16.7
            // Let's use cpSync if available, fallback to manual if needed.
            // Actually, simplest is just re-calling this copyDir function logic adapted or use modern fs.cpSync
            // Let's try fs.cpSync it's standard in Node 16+
            try {
                fs.cpSync(srcPath, destPath, { recursive: true });
            } catch (e) {
                console.error(`Error copying dir ${entry.name}:`, e);
            }
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
    console.log(`Copied directory: ${dir}`);
}


// Execution
console.log('Starting build...');

filesToCopy.forEach(f => copyFile(f));

// For directories, we can use fs.cpSync directly for simplicity regarding the top level dirs
dirsToCopy.forEach(dir => {
    const src = path.join(srcDir, dir);
    const dest = path.join(destDir, dir);
    if (fs.existsSync(src)) {
        try {
            fs.cpSync(src, dest, { recursive: true });
            console.log(`Copied directory: ${dir}`);
        } catch (e) {
            console.error(`Failed to copy directory ${dir}:`, e);
        }
    } else {
        console.warn(`Directory not found: ${dir}`);
    }
});

// Also create the alive.txt for verification
fs.writeFileSync(path.join(destDir, 'alive.txt'), 'I am alive and built by Node.js');
console.log('Created alive.txt');

console.log('Build complete.');

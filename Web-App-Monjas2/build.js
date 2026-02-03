const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
// TARGETS: We copy to ALL common output directories AND the Vercel Output API directory
const targets = ['public', 'dist', 'build', '.vercel/output/static'];

targets.forEach(target => {
    const destDir = path.join(__dirname, target);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
});

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
function copyFile(file, targetDir) {
    const src = path.join(srcDir, file);
    const dest = path.join(targetDir, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
    } else {
        console.warn(`Warning: Source file not found: ${file}`);
    }
}

// Helper to copy directory recursive
function copyDir(dir, targetDir) {
    const src = path.join(srcDir, dir);
    const dest = path.join(targetDir, dir);

    if (!fs.existsSync(src)) {
        console.warn(`Warning: Source directory not found: ${dir}`);
        return;
    }

    try {
        fs.cpSync(src, dest, { recursive: true });
    } catch (e) {
        console.error(`Error copying dir ${dir}:`, e);
    }
}


// Execution
console.log('Starting SHOTGUN build (public/dist/build/.vercel)...');

targets.forEach(target => {
    const destDir = path.join(__dirname, target);
    console.log(`Building target: ${target}`);

    filesToCopy.forEach(f => copyFile(f, destDir));

    dirsToCopy.forEach(dir => {
        copyDir(dir, destDir);
    });

    // Alive file for verification
    fs.writeFileSync(path.join(destDir, 'alive.txt'), `I am alive in ${target}`);
});

// VERCEL OUTPUT API CONFIG
// Required for .vercel/output to be recognized
const vercelConfigPath = path.join(__dirname, '.vercel/output/config.json');
const vercelConfig = {
    version: 3
};

try {
    const outputDir = path.dirname(vercelConfigPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));
    console.log('Created .vercel/output/config.json (v3)');
} catch (e) {
    console.error('Error creating vercel config:', e);
}

console.log('Build complete. All targets populated.');
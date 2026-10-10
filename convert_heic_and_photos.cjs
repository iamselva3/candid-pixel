const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');

const categories = {
  'baby': 'public/photos/baby',
  'Marriage': 'public/photos/marriage',
  'maternity': 'public/photos/maternity',
  'Model': 'public/photos/model'
};

async function processAll() {
  for (const [srcFolder, destFolder] of Object.entries(categories)) {
    const srcPath = path.join(__dirname, 'Photos', srcFolder);
    const destPath = path.join(__dirname, destFolder);
    fs.mkdirSync(destPath, { recursive: true });

    if (!fs.existsSync(srcPath)) continue;

    const files = fs.readdirSync(srcPath);
    let idx = 1;

    for (const f of files) {
      const filePath = path.join(srcPath, f);
      const stat = fs.statSync(filePath);
      if (!stat.isFile()) continue;

      const ext = path.extname(f).toLowerCase();
      const targetName = `${srcFolder.toLowerCase()}-${String(idx).padStart(2, '0')}.jpg`;
      const targetPath = path.join(destPath, targetName);

      try {
        if (ext === '.heic') {
          console.log(`Converting HEIC: ${f} -> ${targetName}`);
          const inputBuffer = fs.readFileSync(filePath);
          const outputBuffer = await heicConvert({
            buffer: inputBuffer,
            format: 'JPEG',
            quality: 0.92
          });
          fs.writeFileSync(targetPath, outputBuffer);
          console.log(`Saved: ${targetPath}`);
          idx++;
        } else if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
          console.log(`Copying image: ${f} -> ${targetName}`);
          fs.copyFileSync(filePath, targetPath);
          console.log(`Saved: ${targetPath}`);
          idx++;
        }
      } catch (err) {
        console.error(`Error processing ${f}:`, err);
      }
    }
  }
  console.log('All photos successfully processed and saved to public/photos/!');
}

processAll();

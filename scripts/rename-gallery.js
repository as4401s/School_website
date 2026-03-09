import fs from 'fs';
import path from 'path';

const galleryDir = path.join(process.cwd(), 'content/gallery');
const files = fs.readdirSync(galleryDir).filter(file => file.endsWith('.json'));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(galleryDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let modified = false;

    if (data.summary && data.summary.en && data.summary.en.includes("KM School")) {
        data.summary.en = data.summary.en.replace(/KM School/g, "KMS");
        modified = true;
    }

    if (data.summary && data.summary.bn && data.summary.bn.includes("কেএম স্কুল")) {
        data.summary.bn = data.summary.bn.replace(/কেএম স্কুল/g, "কেএমএস");
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        updatedCount++;
        console.log(`Updated ${file}`);
    }
});

console.log(`Done. Updated ${updatedCount} gallery JSON files.`);

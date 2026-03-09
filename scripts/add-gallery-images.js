import fs from 'fs';
import path from 'path';

const mediaDir = path.join(process.cwd(), 'public/media/Humaniapota School');
const galleryDir = path.join(process.cwd(), 'content/gallery');

// Ensure the gallery directory exists (it should, but safety first)
if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
}

const files = fs.readdirSync(mediaDir).filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'));

files.forEach((file, index) => {
    const jsonContent = {
        title: {
            en: "Campus Moment",
            bn: "ক্যাম্পাসের মুহূর্ত"
        },
        summary: {
            en: "A glimpse into daily life and activities at KM School.",
            bn: "কেএম স্কুলের প্রাত্যহিক জীবন এবং কার্যকলাপের এক ঝলক।"
        },
        imageUrl: `/media/Humaniapota%20School/${file}`,
        order: 10 + index
    };

    const jsonFileName = `humaniapota-${index + 1}.json`;
    fs.writeFileSync(path.join(galleryDir, jsonFileName), JSON.stringify(jsonContent, null, 2));
    console.log(`Created ${jsonFileName} for ${file}`);
});

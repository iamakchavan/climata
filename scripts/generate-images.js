import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceImage = path.join(__dirname, '../src/pages/climatapre.png');
const publicDir = path.join(__dirname, '../public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate favicon (32x32)
sharp(sourceImage)
  .resize(32, 32)
  .toFile(path.join(publicDir, 'climata-icon.png'))
  .then(() => console.log('Favicon generated successfully'))
  .catch(err => console.error('Error generating favicon:', err));

// Generate social media preview (1200x630)
sharp(sourceImage)
  .resize(1200, 630, {
    fit: 'cover',
    position: 'center'
  })
  .toFile(path.join(publicDir, 'climata-preview.png'))
  .then(() => console.log('Social media preview generated successfully'))
  .catch(err => console.error('Error generating social media preview:', err)); 
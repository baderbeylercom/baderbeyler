import sharp from 'sharp';
import { readdirSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, '../public/assets/images');

const exts = ['.jpeg', '.jpg', '.png'];

const files = readdirSync(dir).filter(f => exts.includes(extname(f).toLowerCase()));

for (const file of files) {
  const input = join(dir, file);
  const name = basename(file, extname(file));
  const output = join(dir, `${name}.webp`);
  await sharp(input).webp({ quality: 85 }).toFile(output);
  console.log(`✓ ${file} → ${name}.webp`);
}

console.log(`\nDone! ${files.length} files converted.`);

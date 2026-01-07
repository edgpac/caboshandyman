const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const JPEG_QUALITY = 90; // 0-100, higher = better quality but larger file
const REMOVE_ORIGINAL_PNG = false; // Set to true to delete PNGs after conversion
const ASSET_DIRECTORIES = [
  './src/assets',
];

// Files to exclude (icons, logos, favicons should stay as PNG)
const EXCLUDE_PATTERNS = [
  'favicon',
  'android-chrome',
  'apple-touch-icon',
  'CHLOGO.png',
];

// Check if file should be excluded
function shouldExclude(filePath) {
  return EXCLUDE_PATTERNS.some(pattern => filePath.includes(pattern));
}

// Find all PNG files recursively
function findPngFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist, skipping...`);
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findPngFiles(filePath, fileList);
    } else if (path.extname(file).toLowerCase() === '.png') {
      if (!shouldExclude(filePath)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

// Convert PNG to JPEG
async function convertPngToJpeg(pngPath) {
  try {
    // Handle double extension case (e.g., luxury-bathroom.jpeg.png)
    let jpegPath;
    if (pngPath.includes('.jpeg.png')) {
      jpegPath = pngPath.replace(/\.jpeg\.png$/i, '.jpeg');
    } else {
      jpegPath = pngPath.replace(/\.png$/i, '.jpeg');
    }

    // Skip if JPEG already exists and is newer
    if (fs.existsSync(jpegPath)) {
      const pngStat = fs.statSync(pngPath);
      const jpegStat = fs.statSync(jpegPath);
      if (jpegStat.mtime > pngStat.mtime) {
        console.log(`⏭️  Skipping ${path.basename(pngPath)} (JPEG already exists and is newer)`);
        return { skipped: true, path: pngPath };
      }
    }

    // Convert using Sharp
    await sharp(pngPath)
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(jpegPath);

    // Get file sizes for reporting
    const pngSize = fs.statSync(pngPath).size;
    const jpegSize = fs.statSync(jpegPath).size;
    const savings = ((pngSize - jpegSize) / pngSize * 100).toFixed(1);

    console.log(`✅ Converted: ${path.basename(pngPath)}`);
    console.log(`   → ${path.basename(jpegPath)}`);
    console.log(`   PNG: ${(pngSize / 1024).toFixed(1)} KB → JPEG: ${(jpegSize / 1024).toFixed(1)} KB (${savings}% smaller)`);

    // Optionally remove original PNG
    if (REMOVE_ORIGINAL_PNG) {
      fs.unlinkSync(pngPath);
      console.log(`   🗑️  Deleted original PNG`);
    }

    return {
      success: true,
      path: pngPath,
      jpegPath,
      pngSize,
      jpegSize,
      savings: parseFloat(savings)
    };

  } catch (error) {
    console.error(`❌ Error converting ${pngPath}:`, error.message);
    return { error: true, path: pngPath };
  }
}

// Main conversion function
async function convertAllPngs() {
  console.log('🔍 Searching for PNG files...\n');

  let allPngFiles = [];
  ASSET_DIRECTORIES.forEach(dir => {
    const pngFiles = findPngFiles(dir);
    allPngFiles = allPngFiles.concat(pngFiles);
  });

  if (allPngFiles.length === 0) {
    console.log('✅ No PNG files found to convert!');
    return;
  }

  console.log(`Found ${allPngFiles.length} PNG file(s) to convert\n`);
  console.log('━'.repeat(60));

  const results = [];
  for (const pngFile of allPngFiles) {
    const result = await convertPngToJpeg(pngFile);
    results.push(result);
    console.log('━'.repeat(60));
  }

  // Summary
  console.log('\n📊 CONVERSION SUMMARY:');
  const successful = results.filter(r => r.success).length;
  const skipped = results.filter(r => r.skipped).length;
  const errors = results.filter(r => r.error).length;
  const totalSavings = results
    .filter(r => r.success)
    .reduce((sum, r) => sum + (r.pngSize - r.jpegSize), 0);

  console.log(`✅ Successfully converted: ${successful}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`❌ Errors: ${errors}`);
  console.log(`💾 Total space saved: ${(totalSavings / 1024).toFixed(1)} KB`);

  if (successful > 0) {
    console.log('\n⚠️  NEXT STEPS:');
    console.log('1. Update image references in code (.png → .jpeg)');
    console.log('2. Test all pages to ensure images load correctly');
    console.log('3. Run npm run build to verify');
    console.log('4. Commit changes to git');
    if (!REMOVE_ORIGINAL_PNG) {
      console.log('5. Optionally delete original PNG files after verification');
    }
  }
}

// Run the conversion
convertAllPngs().catch(console.error);

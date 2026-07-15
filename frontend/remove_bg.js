const Jimp = require('jimp');
const path = require('path');

const logoPath = path.join(__dirname, 'src', 'assets', 'images', 'logo.png');
const faviconPath = path.join(__dirname, 'public', 'favicon.ico');

async function removeWhiteBg() {
  try {
    const image = await Jimp.read(logoPath);
    
    // iterate over all pixels
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red   = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue  = this.bitmap.data[idx + 2];
      
      // If the pixel is white or very close to white, make it transparent
      if (red > 240 && green > 240 && blue > 240) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
      }
    });

    await image.writeAsync(logoPath);
    await image.writeAsync(faviconPath);
    console.log("Background successfully removed.");
  } catch (error) {
    console.error("Error removing background:", error);
  }
}

removeWhiteBg();

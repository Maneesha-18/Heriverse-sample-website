import fs from "fs";
import path from "path";

// A valid 1x1 transparent PNG image in base64
const base64Png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const imageBuffer = Buffer.from(base64Png, "base64");

const baseDir = path.join(process.cwd(), "frontend", "src", "assets", "images");

const imagePaths = [
  // Hero
  "hero/hero1.jpg",
  "hero/hero2.jpg",
  "hero/hero3.jpg",
  
  // Categories
  "categories/temple.jpg",
  "categories/fort.jpg",
  "categories/museum.jpg",
  "categories/festival.jpg",
  "categories/beach.jpg",
  "categories/hill.jpg",
  
  // Places
  "places/brihadeeswarar.jpg",
  "places/meenakshi.jpg",
  "places/shore-temple.jpg",
  "places/airavatesvara.jpg",
  "places/gangaikonda.jpg",
  "places/vellore-fort.jpg"
];

// Ensure parent directories exist and write files
imagePaths.forEach((relPath) => {
  const fullPath = path.join(baseDir, relPath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
  
  fs.writeFileSync(fullPath, imageBuffer);
  console.log(`🖼 Generated image: ${fullPath}`);
});

console.log("✅ All placeholder assets generated successfully!");

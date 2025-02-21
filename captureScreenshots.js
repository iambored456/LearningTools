const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  // Launch Puppeteer with sandbox disabled
  const browser = await puppeteer.launch({
    headless: "new", // or simply true if you prefer the default
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Create the images folder if it doesn't exist
  const imagesDir = path.join(__dirname, 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }

  // List your app details with name and URL
  const apps = [
    { name: 'ReadAlongHighlighter', url: 'https://iambored456.github.io/ReadAlongHighlighter/' },
    { name: 'Visual-Metronome', url: 'https://iambored456.github.io/Visual-Metronome/' },
    { name: 'Student-Notation', url: 'https://iambored456.github.io/Student-Notation/' },
    { name: 'Pitch-Detect', url: 'https://iambored456.github.io/Pitch-Detect/' },
    { name: 'Diatonic-Compass', url: 'https://iambored456.github.io/Diatonic-Compass/' },
    { name: 'ClassClock', url: 'https://iambored456.github.io/ClassClock/' },
    { name: 'LaunchpadWhackaMole', url: 'https://iambored456.github.io/LaunchpadWhackaMole/' }
  ];

  // Loop through each app and capture a screenshot
  for (const app of apps) {
    console.log(`Capturing screenshot for ${app.name} from ${app.url}`);
    try {
      await page.goto(app.url, { waitUntil: 'networkidle2' });
      // Optionally adjust the viewport dimensions to suit your screenshot needs
      await page.setViewport({ width: 1280, height: 800 });

      const screenshotPath = path.join(imagesDir, `${app.name}-screenshot.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved: ${screenshotPath}`);
    } catch (error) {
      console.error(`Error capturing ${app.name}:`, error);
    }
  }

  await browser.close();
})();

require('dotenv').config();
const { scrapeImages } = require('./src/image-scraper');
const { uploadToNotion } = require('./src/notion-uploader');

// If no arguments are provided, show help
if (process.argv.length <= 2) {
  console.log('Usage: node index.js [search term] [number of images] [notion_page_id]');
  console.log('Example: node index.js "cute cats" 5 d9824bdb-c466-433a-91ae-123456789abc');
  process.exit(1);
}

async function main() {
  try {
    // Get command line arguments
    const searchTerm = process.argv[2];
    const numberOfImages = parseInt(process.argv[3] || '5', 10);
    const notionPageId = process.argv[4] || process.env.NOTION_PAGE_ID;
    
    console.log(`Searching for ${numberOfImages} images of "${searchTerm}"...`);
    
    // Scrape images from Google
    const images = await scrapeImages(searchTerm, numberOfImages);
    console.log(`Found ${images.length} images.`);
    
    // Upload images to Notion
    if (notionPageId) {
      console.log(`Uploading images to Notion page ${notionPageId}...`);
      await uploadToNotion(notionPageId, searchTerm, images);
      console.log('Upload to Notion completed successfully.');
    } else {
      console.log('No Notion page ID provided. Skipping upload.');
      console.log('Set NOTION_PAGE_ID in .env file or provide it as an argument.');
      console.log('Images found:');
      images.forEach((image, index) => {
        console.log(`${index + 1}. ${image.url}`);
      });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main();

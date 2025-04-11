# Image Scraper and Notion Uploader

A tool to scrape images from Google and upload them to Notion pages.

## Features

- Searches Google Images for any query
- Uploads the found images to a Notion page
- Adds source links to each image
- Easy to use from the command line

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/Arnoutopya/image-scraper-notion-uploader.git
   cd image-scraper-notion-uploader
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file from the example:
   ```
   cp .env.example .env
   ```

4. Set up your Notion API integration:
   - Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
   - Create a new integration
   - Copy the secret key to your `.env` file
   - Don't forget to share the Notion page with your integration

## Usage

```
node index.js [search term] [number of images] [notion_page_id]
```

Example:
```
node index.js "cute cats" 5 d9824bdb-c466-433a-91ae-123456789abc
```

If you've set the `NOTION_PAGE_ID` in your `.env` file, you can omit the last parameter:
```
node index.js "cute cats" 5
```

## Notion Setup

1. Create a Notion integration at [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Copy the secret key to your `.env` file
3. Create or open a Notion page where you want to add the images
4. In Notion, click "Share" at the top right of your page
5. Invite your integration (it should appear in the list)
6. Get the page ID from the URL (it's the part after the page title in the URL, or the last long string in the URL)

## Notes

- Notion API only supports external image URLs, so this tool embeds the images using their public URLs
- The image URLs might expire over time if the source removes them
- Google may occasionally block the scraping if too many requests are made in a short time

## License

MIT

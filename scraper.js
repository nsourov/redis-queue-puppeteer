const puppeteer = require("puppeteer");

async function crawler(url) {
  console.log(`Scraper running for ${url}`)
  let title;
  let browser;
  try {
    // creating browser instance
    browser = await puppeteer.launch({headless: true});
    // creating newpage
    const page = await browser.newPage();
    // navigating to the url that passed by worker
    await page.goto(url);
    // scraping title of that page
    title = await page.title()
    await browser.close()
    return title;
  } catch (error) {
    await browser.close();
    console.log(error);
    return;
  }
}
module.exports = crawler;

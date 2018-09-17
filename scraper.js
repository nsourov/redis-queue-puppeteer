const puppeteer = require("puppeteer");

async function crawler(url) {
  let title;
  try {
    // creating browser instance
    const browser = await puppeteer.launch({headless: true});
    // creating newpage
    const page = await browser.newPage();
    // navigating to the url that passed by worker
    await page.goto(url);
    // scraping title of that page
    title = await page.title()
    await browser.close()
  } catch (error) {
    console.log(error);
    return;
  }
  return title;
}
module.exports = crawler;

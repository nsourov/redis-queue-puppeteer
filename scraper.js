const puppeteer = require("puppeteer");

async function crawler(url) {
  try {
    // creating browser instance
    const browser = await puppeteer.launch({headless: false});
    // creating newpage
    const page = await browser.newPage();
    // navigating to the url that passed by worker
    await page.goto(url);
    // scraping title of that page
    const title = await page.title()
    console.log(`site:: ${url}, title:: ${title}`)
    await browser.close()
  } catch (error) {
    console.log(error);
    return;
  }
  return true;
}
module.exports = crawler;

const addJob = require("./master");
const doingJob = require("./worker");
const crawler = require("./scraper");

const urls = [
  "https://google.com",
  "http://www.example.com/",
  "https://optimalbits.github.io/bull/",
  "https://github.com"
];

/**
 * This function takes all the urls and mapping them thru. Master queue function taking the urls and adding to the queue.
 * Worker taking the urls from queue list and running the crawler function and apssing the url to that crawler.
 */
async function runQueue() {
  // Adding job from "MASTER"
  const addUrl = urls.map(async url => await addJob(url));
  await Promise.all(addUrl);
  // Doing the job by "WORKER"
  await doingJob(crawler);
}
runQueue();

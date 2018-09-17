/**
 * Worker will do the job that passed by master to worker.
 */
const Queue = require("bull");
const crawlQueue = new Queue("crawl title");
const crawler = require("./scraper");

crawlQueue
  .on("waiting", function(jobId) {
    console.log(`remaining job:: ${jobId}`);
  })
  .on("progress", function(job, progress) {
    console.log(`This job progress:: ${progress}`);
  })
  .on("completed", (job, result) => {
    console.log(`site title:: ${result}`);
  })
  .on("failed", (job, err) => {
    console.log(err);
  });

// worker taking the url and passing to crawler function
// concurrency 2
crawlQueue.process(2, async job => {
  return await crawler(job.data.url);
});

/**
 * Master will send jobs to worker.
 */
const Queue = require("bull");
const crawlQueue = new Queue("crawl title");

crawlQueue.on("global:completed", function(jobID, result) {
  console.log(`job ${jobID} completed`, result);
});

async function addJob(url) {
  // empty queue before adding jobs on queue
  // await queue.empty();
  // passing the url to the worker. worker will take the url and pass it to the crawler function
  const job = await crawlQueue.add(
    {
      url
    }
  );
  const result = await job.finished();
  return result;
}

const urls = [
  "https://google.com",
  "http://www.example.com/",
  "https://optimalbits.github.io/bull/",
  "https://github.com"
];
for (let url of urls) {
  addJob(url);
}

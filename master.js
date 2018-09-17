/**
 * Master will send jobs to worker.
 */
const Bull = require("bull");
const queue = new Bull("crawl title");

async function addJob(url) {
  // empty queue before adding jobs on queue
  await queue.empty();
  // passing the url to the worker. worker will take the url and pass it to the crawler function
  return await myFirstQueue.add({
    url
  });
}
module.exports = addJob;

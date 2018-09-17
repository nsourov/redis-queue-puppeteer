/**
 * Worker will do the job that passed by master to worker.
 */
const Bull = require("bull");

const queue = new Bull("crawl title");

function doingJob(fn) {
  // worker taking the url and passing to crawler function
  // concurrency 2
  return queue.process(2, async job => {
    return await fn(job.data.url);
  });
}
module.exports = doingJob;

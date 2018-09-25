const Queue = require('bull');

const crawlQueue = new Queue('crawl title');
const crawler = require('./scraper');

// Make sure to stop queue before process exits
async function termination() {
  await crawlQueue.close();
  process.exit();
}
process.on('SIGTERM', termination);
/**
 * Worker will do the job that passed by master to worker.
 * worker taking the url and passing to crawler function
 * concurrency 2
 */
crawlQueue.process(2, async (job) => {
  try {
    const res = await crawler(job.data.url);
    return res;
  } catch (error) {
    return { error: 'error processing task' };
  }
});

/**
 * Master will send jobs to worker.
 */
async function scraper(urls) {
  return Promise.all(
    urls.map(async (url) => {
      const addJob = await crawlQueue.add({ url }, { removeOnComplete: true });
      return addJob;
    }),
  );
}

const urls = [
  'https://goole.com',
  'http://www.example.com/',
  'https://optimalbits.github.io/bull/',
  'https://pptr.dev/',
];
scraper(urls);

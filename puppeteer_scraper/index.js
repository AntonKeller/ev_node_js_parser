const process = require('process');

const browserObject = require('./browser');
const scraperController = require('./controller');

const scrape = async location => {

    let browserInstance = await browserObject.startBrowser();
    await scraperController(browserInstance, '176083', true, true);
    process.exit();

}

console.log('Enter something: ');
process.openStdin().on('data', scrape);







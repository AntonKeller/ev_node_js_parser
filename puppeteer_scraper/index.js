const process = require('process');
const browserObject = require('./browser');
const scraperController = require('./controller');

(async function abc(){

    let browserInstance = await browserObject.startBrowser();

    //176083
    //2 СПБ
    await scraperController(browserInstance, '4927', true);

    process.exit();

})();


// const scrape = async location => {
//     let browserInstance = await browserObject.startBrowser();
//     await scraperController(browserInstance, '176083', true, false);
//     process.exit();
//
// }

//
// console.log('Enter something: ');
// process.openStdin().on('data', scrape);







const process = require('process');
const browserObject = require('./browser');
const scraperController = require('./controller');

(async function abc(){

    let browserInstance = await browserObject.startBrowser();

    await scraperController(browserInstance, "кемерово", true);

    process.exit();

})();








const pageScraper = require('./scraper');
const testJsonData = require("./save_data_functions/testData");
const saveInExcel = require("./save_data_functions/saveInExcel");

async function scrapeAll(browserInstance, url, isAutoClose, isLogging) {

    let browser;

    try {

        browser = await browserInstance;

        let responseJsonData = await pageScraper.scraper(browser, url, isLogging);
        // await saveInExcel(responseJsonData);

        !isAutoClose || await browser.close();
        return responseJsonData;

    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, url, isAutoClose, isLogging) => scrapeAll(browserInstance, url, isAutoClose, isLogging)
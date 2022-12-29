const pageScreenerObject = require('./pageScreener');

async function scrapeAll(browserInstance, urls) {

    let browser;

    try {
        browser = await browserInstance;

        return await pageScreenerObject.screener(browser, urls);

    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, urls) => scrapeAll(browserInstance, urls)
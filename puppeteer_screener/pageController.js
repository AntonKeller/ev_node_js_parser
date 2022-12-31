const pageScreenerObject = require('./pageScreener');

async function scrapeAll(browserInstance, urls) {

    let browser;

    try {
        browser = await browserInstance;

        await pageScreenerObject.screener(browser, urls);

        await browser.close();

    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, urls) => scrapeAll(browserInstance, urls)
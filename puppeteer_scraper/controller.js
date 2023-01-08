const pageLinksScraper = require('./scraper');

async function scrapeAll(browserInstance, url, isAutoClose, isLogging) {

    let browser;

    try {

        browser = await browserInstance;
        let response = await pageLinksScraper.scraper(browser, url);
        !isAutoClose || await browser.close();
        return response;

    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, url, response_structure) => scrapeAll(browserInstance, url, response_structure)
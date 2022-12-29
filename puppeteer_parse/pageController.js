const pageScraper = require('./pageScraper');

async function scrapeAll(browserInstance, url, response_structure) {
    let browser;
    try {
        browser = await browserInstance;

        let response = await pageScraper.scraper(browser, url);

        return await response.offers.map(response_structure);

    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, url, response_structure) => scrapeAll(browserInstance, url, response_structure)
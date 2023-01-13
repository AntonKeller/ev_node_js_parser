const get_offers = require("./scrap_functions/offers_request");

const timeout = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

const scraperObject = {

    async scraper(browser, url, isLogging) {

        return await get_offers(browser, url, isLogging);

    }
}

module.exports = scraperObject;
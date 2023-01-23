const loadOffersFromWebsite = require("./scrap_functions/offersLoader");
const CianConfig = require("./cianConfig");

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const CianScraperObject = {

    jsonPagesScrape: async (browser, locationID) => {

        console.log('find rent offers.....');

        let offersArray = [];
        let requestConfig = CianConfig.requestConfig;

        for (let config of requestConfig) {
            const buff = await loadOffersFromWebsite(browser, config.baseLink(locationID), config.getPageStateData);
            offersArray = offersArray.concat(buff);
            await timeout(2000);
        }

        return offersArray;
    },

}

module.exports = CianScraperObject;
const loadOffersFromWebsite = require("./scrap_functions/offersLoader");
const CianConfig = require("./cianConfig");

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const CianScraperObject = {

    jsonPagesScrape: async (browser, locationID) => {

        console.log('Start search offers.....');

        let offersArray = [];
        let requestConfig = CianConfig.requestConfig;

        for (let config of requestConfig) {
            const buff = await loadOffersFromWebsite(browser, locationID, config);
            offersArray = offersArray.concat(buff);
            await timeout(2000);
        }

        for (let i = 0; i < offersArray.length; i++) {
            offersArray[i].number = i + 1;
        }

        return offersArray;
    },

}

module.exports = CianScraperObject;
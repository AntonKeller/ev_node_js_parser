const loadOffersFromWebsite = require("./scrap_functions/offersLoader");

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const CianScraperObject = {

    jsonPagesScrape: async (browser, locationID, cianConfig) => {

        console.log('Start search offers.....');

        let offersArray = [];

        for (let config of cianConfig) {
            offersArray = offersArray.concat(await loadOffersFromWebsite(browser, locationID, config));
        }

        // correcting response objects id
        for (let i = 0; i < offersArray.length; i++) offersArray[i].number = i + 1;

        return offersArray;
    },

}

module.exports = CianScraperObject;
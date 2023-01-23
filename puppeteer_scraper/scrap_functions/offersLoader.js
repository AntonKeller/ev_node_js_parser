const {COUNT_OFFERS_IN_ONE_PAGE, COUNT_PAGES_MAX, getOffer} = require("../sctructures/offer");

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const useRemoteConsole = (page, url, sleep_ms = 1000) => new Promise(async resolve => {

    await page.goto(url);
    await timeout(sleep_ms);
    const results = await page.evaluateHandle(results => results, await page.evaluateHandle(() => window._cianConfig));
    resolve(results.jsonValue());
});


// Urls generate
const urlsGenerate = async (page, baseLink, getPageStateData) => {

    // get json from console
    let pageSate = await useRemoteConsole(page, `${baseLink}&p=1`);
    let firstResponse = getPageStateData(pageSate);

    // Determine the number of pages
    let pagesCount;
    if (Math.ceil(firstResponse.aggregatedOffers / COUNT_OFFERS_IN_ONE_PAGE) <= COUNT_PAGES_MAX) {
        pagesCount = Math.ceil(firstResponse.aggregatedOffers / COUNT_OFFERS_IN_ONE_PAGE)
    } else {
        pagesCount = COUNT_PAGES_MAX;
    }

    let urls = [];
    for (let i = 1; i <= pagesCount; i++) {
        urls.push(`${baseLink}&p=${i}`);
    }

    return urls;
}


// website offers request
const loadOffersFromWebsite = async (browser, baseLink, getPageStateData) => {


    let page = await browser.newPage();
    let urls = await urlsGenerate(page, baseLink, getPageStateData);
    let responseOffersFullData = [];


    for (let i = 0; i < urls.length; i++) {
        let buff = getPageStateData(await useRemoteConsole(page, urls[i]));
        responseOffersFullData = responseOffersFullData.concat(buff.offers);
        console.log('loading.....', `${i + 1}/${urls.length}`);
    }


    // get structured offers
    let offersArray = [];
    let i = 0;
    for (let buffOfferFullData of responseOffersFullData) {
        offersArray = offersArray.concat(getOffer(responseOffersFullData[i], ++i));
    }


    await page.close();
    return offersArray;
};

module.exports = loadOffersFromWebsite;
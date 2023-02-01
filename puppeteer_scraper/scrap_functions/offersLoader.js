const {COUNT_OFFERS_IN_ONE_PAGE, COUNT_PAGES_MAX, getOffer} = require("../sctructures/offer");

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const useRemoteConsole = (page, url, sleep_ms = 1) => new Promise(async (resolve, reject) => {
    try {
        await page.goto(url);
        await timeout(sleep_ms);
        await page.waitForSelector("._25d45facb5--container--AncgU"); // logotype
        const results = await page.evaluateHandle(results => results, await page.evaluateHandle(() => window._cianConfig));
        resolve(results.jsonValue());
    } catch {
        console.log("function useRemoteConsole error");
        reject("function useRemoteConsole error");
    }
});

//urls generator
const urlsGenerate = async (page, baseLink, getPageStateCallBack) => {

    // get json data from first page
    let pageSate = await useRemoteConsole(page, `${baseLink}&p=1`);
    let firstResponse = getPageStateCallBack(pageSate);

    // Determine the number of pages
    let pagesCount;
    pagesCount = Math.ceil(firstResponse.aggregatedOffers / COUNT_OFFERS_IN_ONE_PAGE);
    if (pagesCount > COUNT_PAGES_MAX) pagesCount = COUNT_PAGES_MAX;

    let urls = [];
    for (let i = 1; i <= pagesCount; i++) {
        urls.push(`${baseLink}&p=${i}`);
    }

    return urls;
}


// website json offers loader
const loadOffersFromWebsite = async (browser, locationID, config) => {

    let baseLink = config.baseLink(locationID);
    let page = await browser.newPage();
    let urls = await urlsGenerate(page, baseLink, config.getPageStateData);
    let arrayOffersIsDone = [];

    for (let i = 0; i < urls.length; i++) {
        let buff;
        try {
            //load box offers
            buff = config.getPageStateData(await useRemoteConsole(page, urls[i])).offers;

            //loading status
            console.log(`Загрузка: ${config.offerName}.....`, `${i + 1}/${urls.length}`);

            //get structured offers
            arrayOffersIsDone = arrayOffersIsDone.concat(buff.map(offer => getOffer(offer)));
        } catch (err) {
            console.log(`${err} | function: useRemoteConsole, URL: ${urls[i]}`);
            continue;
        }
    }

    await page.close();
    return arrayOffersIsDone;
};

module.exports = loadOffersFromWebsite;
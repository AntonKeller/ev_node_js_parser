const responseJsonStructure = require("../sctructures/offer");
const {
    getOfferStructure,
    DEAL_TYPE_SALE,
    DEAL_TYPE_RENT,
    COUNT_OFFERS_IN_ONE_PAGE,
    COUNT_PAGES_MAX,
} = require("../sctructures/offer");

const jsonRequest = (browser, url, requestCallback) => new Promise(async resolve => {

    let page = await browser.newPage();
    await page.goto(url);
    const aHandle = await page.evaluateHandle(requestCallback);
    const results = await page.evaluateHandle(results => results, aHandle);
    let respJson = results.jsonValue();
    resolve(respJson);

})

async function requestGenerator(dealType = DEAL_TYPE_SALE, location = '1', pageNumber = '1', offerType = 'offices', officeType = '1') {

    const main = 'https://www.cian.ru/cat.php?';
    const dt = `deal_type=${dealType}`; // (rent/sale)
    const ev = '&engine_version=2';
    const loc = `&location=${location}`; // city number 1-Moskow
    const offrt = `&offer_type=${offerType}`; // offer type
    const offst = `&office_type=${officeType}`;
    const p = `&p=${pageNumber}`;
    return `${main}${dt}${ev}${loc}${offrt}${offst}${p}`

}

//Консольные команды
const offers_console_request = () => window._cianConfig["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results.offers;
const results_console_request = () => window._cianConfig["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results;

//вспомогательные функции
const request = async (browser, dealType, locationNum) => {

    //Создаем стартовый url и запрашиваем json с нашим кол-вом найденых результатов
    let startUrl = await requestGenerator(dealType, `${locationNum}`, '1');

    console.log('startUrl', startUrl);

    let results = await jsonRequest(browser, startUrl, results_console_request);

    //Определяем кол-во страниц
    let pagesCount = Math.ceil(results.aggregatedOffers / COUNT_OFFERS_IN_ONE_PAGE) <= COUNT_PAGES_MAX ? Math.ceil(results.aggregatedOffers / COUNT_OFFERS_IN_ONE_PAGE) : COUNT_PAGES_MAX;

    //Генерируем страницы
    let urls = [];
    for (let i = 1; i <= pagesCount; i++) urls.push(await requestGenerator(dealType, `${locationNum}`, `${i}`));

    //Пробегаем по страницам и запрашиваем предложения
    let offersResult = [];

    for (let i = 0; i < urls.length; i++) {

        let offers28 = await jsonRequest(browser, urls[i], offers_console_request);
        offers28 = offers28.map((offer, index) => getOfferStructure(offer, index, dealType));
        offers28.map(offer => offersResult.push(offer));
        console.log('progress: ', `${i + 1}/${urls.length}`);

    }

    for (let i = 0; i < offersResult.length; i++) {
        offersResult[i]['№'] = `${i + 1}`;
    }

    return offersResult;
}


async function offers_request(browser, locationNum, isLogging) {

    let result = [];
    let buffer = [];

    console.log('find rent offers.....');
    buffer = await request(browser, DEAL_TYPE_RENT, locationNum);
    buffer.map(offer => result.push(offer));

    // console.log('find sale offers.....');
    // buffer = await request(browser, DEAL_TYPE_SALE, locationNum);
    // buffer.map(offer => result.push(offer));

    for (let i = 0; i < result.length; i++) {
        result[i]['№'] = `${i + 1}`;
    }

    console.log('search operation complete.');
    console.log(`found: ${result.length} offers.`);

    console.log(result);

    return result;
}


module.exports = offers_request;
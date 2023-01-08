const responseJsonStructure = require("../sctructures/offer");
const jsonRequest = (browser, url, requestCallback) => new Promise(async resolve => {

    let page = await browser.newPage();
    await page.goto(url);
    const aHandle = await page.evaluateHandle(requestCallback);
    const results = await page.evaluateHandle(results => results, aHandle);
    resolve(results.jsonValue());

})

async function requestGenerator(dealType = 'rent', location = '1', pageNumber = '1', offerType = 'offices', officeType = '1') {

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
// ---------------

const offersCountInOnePage = 28; //Кол-во оферов на одной странице

async function offers_request(browser, locationNum) {

    //Создаем стартоый url и запрашиваем json с нашим кол-вом найденых результатов
    let startUrl = await requestGenerator('rent', `${locationNum}`, '1');
    let results = await jsonRequest(browser, startUrl, results_console_request);

    //Определяем кол-во страниц
    let pagesCount = Math.ceil(results.aggregatedOffers / offersCountInOnePage) <= 54 ? Math.ceil(results.aggregatedOffers / offersCountInOnePage) : 54;

    //Генерируем страницы
    let urls = [];
    for (let i = 1; i <= pagesCount; i++) urls.push(await requestGenerator('rent', `${locationNum}`, `${i}`));

    //Пробегаем по страницам и запрашиваем предложения
    let offersResult = [];

    for (let i = 0; i < urls.length; i++) {
        let offers28 = await jsonRequest(browser, urls[i], offers_console_request);
        offers28 = offers28.map(responseJsonStructure);
        offers28.map(offer => offersResult.push(offer));
        console.log('progress: ', `${i + 1}/${urls.length}`);
    }

    for (let i = 0; i < offersResult.length; i++) {
        offersResult[i]['№'] = `${i + 1}`;
    }

    //Вывод
    // console.log('pageCount:\n', pagesCount);
    // console.log('urls:\n', urls);
    // console.log('offers28:\n', offers28);
    // console.log('offersResult:\n', offersResult);

    let n = 10;
    console.log('offersResult:\n', offersResult.slice(0, n));
    console.log('offersResult.length:', offersResult.length);

}


module.exports = offers_request;
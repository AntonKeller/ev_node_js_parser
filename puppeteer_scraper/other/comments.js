
// let response = await jsonRequest(browser, "https://www.cian.ru/", requestsCallBackConsoleObject.citiesCallback);
//
//
// console.log('response:', response);
// console.log('response length:', response.length);
// let page = await browser.newPage();
// await page.goto('https://yaroslavl.cian.ru/snyat-ofis-yaroslavskaya-oblast-yaroslavl-kirovskiy-04321/');
// const response = await page.evaluateHandle(results => results, () => {
//     return window._cianConfig["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.filters.regions;
// });
//
// await page.screenshot({
//     path: `${path.resolve(__dirname)}/scrap_json_test.jpeg`
// });
// await page.close();
//
// console.log('response', response.jsonValue());
// let response = await scrapFunctions.get_json(browser, url, scrapFunctions.regionsCallback);
// console.log('response', response);
// let promiseGetLinks = (baseUrl) => new Promise(async (resolve, reject) => {
//     let page = await browser.newPage();
//     // await page.goto(baseUrl);
//     await page.goto('https://cian.ru');
//     await timeout(2500);
//     await page.goto('https://www.cian.ru/snyat-ofis/');
//     await timeout(1500);
//     await page.goto('https://www.cian.ru/cat.php?deal_type=rent&engine_version=2&offer_type=offices&office_type%5B0%5D=1&p=5&region=1');
//     await timeout(2500);
//     await page.goto('https://www.cian.ru/cat.php?deal_type=rent&engine_version=2&offer_type=offices&office_type%5B0%5D=1&p=6&region=1');
//     await timeout(3000);
//     await page.goto('https://www.cian.ru/cat.php?deal_type=rent&engine_version=2&offer_type=offices&office_type%5B0%5D=1&p=12&region=1');
//     // await page.waitForSelector('div._32bbee5fda--offer-container--Zhu18');
//     let response_urls = await page.$$eval('ul._32bbee5fda--list--G2FoV > li > a', nodes => nodes.map(el => el.href));
//     // await page.close();
//     resolve(response_urls);
// });
// await scrapPageLinks(browser, 'https://www.cian.ru/', 1500,false);
// await scrapPageLinks(browser, 'https://www.cian.ru/commercial/', 1500, false);
// let iter = 0;
// let ms = 2500;
// let response = '';
// let page = await browser.newPage();
// do {
//     iter++;
//     await page.goto(url);
//     response = await page.$$eval('h1.title', nodes => nodes.map(el => el.innerText));
//     await timeout(ms);
//     console.log('response:', response, 'iter:', iter, 'timeout, ms:', ms);
//     ms += 100;
// } while (response == 'Мы проверяем ваш браузер')
// console.log('Дождался')
// class="title" h1
// const hrefElement = await page.$('._25d45facb5--container--AncgU');
// await hrefElement.click();
// let response = await scrapPageLinks(browser, url);
// let go = true;
// let activeUrl = url;
// let resultUrlsList = [];
// let responsePromise = await promiseGetLinks(activeUrl)
// console.log('response promise:', responsePromise)
// while (go) {
//     let response = await promiseGetLinks(activeUrl);
//     response.then(responseUrls => {
//
//         console.log('activeUrl', activeUrl);
//         console.log('activeUrl', activeUrl);
//         console.log('last url response', responseUrls[responseUrls.length - 1]);
//
//         if (activeUrl == responseUrls[responseUrls.length - 1]) {
//             go = false;
//         }
//
//         for (url of responseUrls) {
//             resultUrlsList.push(url);
//         }
//
//         activeUrl = resultUrlsList[resultUrlsList.length - 1];
//     })
// }
// console.log('result:', resultUrlsList)
// await results.dispose();
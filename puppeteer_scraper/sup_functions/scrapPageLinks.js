let timeout = (ms) => new Promise(async resolve => setTimeout(() => resolve(), ms));
let scrapPageLinks = (browser, url = '', time_ms = 0, isScraping = true) => new Promise(async (resolve, reject) => {

    let page = await browser.newPage();

    await timeout(time_ms);
    await page.goto(url);
    await timeout(time_ms);

    let response_urls = isScraping ?
        await page.$$eval('ul._32bbee5fda--list--G2FoV > li > a', nodes => nodes.map(el => el.href))
        :
        [];

    await page.close();

    resolve(response_urls);
});

module.exports = scrapPageLinks;


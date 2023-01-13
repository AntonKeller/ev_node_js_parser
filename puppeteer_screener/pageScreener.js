const path = require('node:path');

const timeout = async ms => new Promise(r => setTimeout(r, ms));

const adCleaner = async (page) => {

    let nodeTarget = [
        '#adfox-stretch-banner',
        '.a10a3f92e9--container--SpAqP',
        '.a10a3f92e9--main--_w7i2',
        '._25d45facb5--container--zRDqi',
        '.a10a3f92e9--mortgage-banner--ATbzm',
        '.a10a3f92e9--container--RgpNj',
    ];

    // console.log('find banners.....');

    nodeTarget.map(async cl => {
        await page.evaluate(`
            if (document.querySelectorAll('${cl}').length != 0) {
                document.querySelectorAll('${cl}').forEach(item => item.style.cssText = 'display:none')
            };
        `)
    });

    // console.log('Banners removed!');
}

const pagePromise = (page, urlObj, timeout_ms = 2000) => new Promise(async response => {

    await page.goto(urlObj.url);
    await timeout(timeout_ms);
    // let body = await page.$('body'); ->
    let body = await page.waitForSelector('body');
    let body_viewport = await body.boundingBox();
    let offer_card_page = await page.waitForSelector('.a10a3f92e9--offer_card_page-main--kaTJT');
    let removedPublicationStatus = false;

    if ((await page.$(".a10a3f92e9--container--RXoIe")) !== null) {
        removedPublicationStatus = true;
    }

    if (offer_card_page !== null) {

        await adCleaner(page);

        let offer_card_page_main_viewport = await offer_card_page.boundingBox();

        // common coordinates
        let x = body_viewport["x"];
        let w = body_viewport["width"];
        let y = body_viewport["y"];
        let h = removedPublicationStatus ? body_viewport["width"] : offer_card_page_main_viewport["height"];

        //screens and response
        await page.screenshot({
            // quality: 100, //Качество изображения
            path: `${path.resolve(__dirname)}/images/${urlObj.index}_${urlObj.urlId}_1.jpeg`,
            clip: {
                'x': x,
                'y': y,
                'width': w,
                'height': h,
            }
        });

        if (!removedPublicationStatus) {
            await page.screenshot({
                // quality: 100, //Качество изображения
                path: `${path.resolve(__dirname)}/images/${urlObj.index}_${urlObj.urlId}_2.jpeg`,
                clip: {
                    'x': x,
                    'y': h,
                    'width': w,
                    'height': h,
                }
            });
        }

        // await page.close();
        response({status: true, removed: removedPublicationStatus, ...urlObj});

    } else {
        // await page.close();
        response({status: false, removed: removedPublicationStatus, ...urlObj});
    }
});

const screen = async (browser, arrayObjectsUrl, timeout_ms = 20000) => {

    //copy arrayObjectsUrl in buffer

    let bufferUrlsObj = [];
    let index = 1;

    for (let urlOb of arrayObjectsUrl) {
        bufferUrlsObj.push({
            index: index,
            url: urlOb.url,
            urlId: urlOb.urlId
        });
        index++;
    }

    // go requests for bufferUrlsObj
    let errArrayIdUrls = [];
    let resultUrlsObj = [];
    let requestsSeriesCount = 1;
    let removedPublications = 0;
    let page = await browser.newPage();
    do {

        console.log(`\n\nrequests series count [${requestsSeriesCount}]:`);

        for (let urlOb of bufferUrlsObj) {

            console.time('FirstWay');
            let responseStatus = await pagePromise(page, urlOb);
            console.timeEnd('FirstWay');
            if (responseStatus.removed) {
                removedPublications++;
            }

            if (!responseStatus.status) {  //unsuccessful request
                console.log(`progress:[${urlOb.index}/${bufferUrlsObj.length}][${urlOb.url}][${urlOb.urlId}][err]`);
                errArrayIdUrls.push({
                    index: urlOb.index,
                    url: urlOb.url,
                    urlId: urlOb.urlId
                })
            } else { //successful request
                console.log(`progress:[${urlOb.index}/${bufferUrlsObj.length}][${urlOb.url}][${urlOb.urlId}][complete][removed:${responseStatus.removed}]`);
                resultUrlsObj.push({
                    index: urlOb.index,
                    url: urlOb.url,
                    urlId: urlOb.urlId
                })
            }
        }

        console.log(`err requests: [${errArrayIdUrls.length}]`);
        console.log(`removed publications: [${removedPublications - errArrayIdUrls.length}]`);
        console.log(`timeout 20 sec`);
        bufferUrlsObj = errArrayIdUrls;
        requestsSeriesCount++;
        if (errArrayIdUrls.length === 0) break;
        await timeout(timeout_ms);

    } while (requestsSeriesCount >= 5)
    await page.close();
    console.log("errArrayIdUrls:", errArrayIdUrls);
}

const screenerObject = {

    async screener(browser, arrayObjectsUrl) {

        await screen(browser, arrayObjectsUrl);

    }
}

module.exports = screenerObject;
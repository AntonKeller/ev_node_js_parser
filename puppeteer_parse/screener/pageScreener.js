const {promise} = require("selenium-webdriver");

async function hideAds(page) {
    let classes = [
        '.a10a3f92e9--container--SpAqP', //Реклама справа от объявления
        '.a10a3f92e9--main--_w7i2', //Реклама в шапке объявления
        '._25d45facb5--container--zRDqi', // Окно впорос о сохранении cookies
        '.a10a3f92e9--mortgage-banner--ATbzm',
        '#canvas', //Канвас с рекламой в шапке
    ]

    // a10a3f92e9--mortgage-offer-card-template-wrapper--WM64N

    classes.map(async cl => {
        await page.evaluate(`
            if(document.querySelector('${cl}') != 'null'){
               document.querySelector('${cl}').style.cssText = 'display:none'
            }
            
        `)
    })
}


async function screen(browser, urls) {

    // let newPage = await browser.newPage();
    // await newPage.goto('https://saratov.cian.ru/rent/commercial/269412751/');
    // await newPage.goto('https://saratov.cian.ru/rent/commercial/281749139/');

    let pagePromise = (link, i) => new Promise(async (res, rej) => {
        let page = await browser.newPage();
        await page.goto(link);
        await page.screenshot({path: `logo_${i+1}.png`});
        await page.close();
    })

    urls.forEach(await pagePromise)

    return false
    // urls.map((url, index) => {
    //     await page.goto(urls[0]);
    //     // await hideAds(page);
    //     // await page.screenshot({path: `screens/logo_${index}.png`});
    // })


    // const results = await page.evaluate(`
    //     window._cianConfig["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results.offers.length
    //     `);

    // await hide(page);
    // console.log('results', results);
    // await page.waitForSelector('body');               // дожидаемся загрузки селектора
    // const logo = await page.$('body');                // объявляем переменную с ElementHandle
    // const box = await logo.boundingBox();              // данная функция возвращает массив геометрических параметров объекта в пикселях
    // const x = box['x'];                                // координата x
    // const y = box['y'];                                // координата y
    // const w = box['width'];                            // ширина области
    // const h = box['height'];                           // высота области
    // const h = 1500;
    // await page.screenshot({'path': `logo_${index}.png`, 'clip': {'x': x, 'y': y, 'width': w, 'height': h}});     // выполняем скриншот требуемой области и сохраняем его в logo.png
    // await page.screenshot({path: `logo_${index}.png`});
    // await browser.close();                             // закрываем браузер
}

const screenerObject = {

    async screener(browser, urls) {

        return await screen(browser, urls);

        // await urls.forEach((url, index) => {
        //     console.log(`Navigating to ${url}...`);
        //     get_image(browser, url, index)
        // })
    }
}

module.exports = screenerObject;
const path = require('node:path');


async function hideAds(page) {
    let nodeTarget = [
        '#adfox-stretch-banner',
        '.a10a3f92e9--container--SpAqP', //Реклама справа от объявления
        '.a10a3f92e9--main--_w7i2', //Реклама в шапке объявления
        '._25d45facb5--container--zRDqi', // Окно впорос о сохранении cookies
        '.a10a3f92e9--mortgage-banner--ATbzm',
    ];

    nodeTarget.map(async cl => {
        await page.evaluate(`
            if (document.querySelectorAll('${cl}').length != 0) {
                document.querySelectorAll('${cl}').forEach(item => item.style.cssText = 'display:none')
            };
        `)
    });
}

// a.forEach(item => {item.style.cssText = 'display:none'})

async function screen(browser, urls) {

    let pagePromise = (link, i) => new Promise(async (res, rej) => {
        let page = await browser.newPage();
        await page.goto(link);
        await hideAds(page);
        await page.screenshot({
            // quality: 100, //Качество изображения
            path: `${path.resolve(__dirname)}/images/logo_${i+1}.jpeg`
        });
        await page.close();
        res(true);
    });

    let index = 0;

    for (let url of urls){
        await pagePromise(url, index++);
    }

    // await urls.forEach(await pagePromise);

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

        await screen(browser, urls);

    }

}

module.exports = screenerObject;
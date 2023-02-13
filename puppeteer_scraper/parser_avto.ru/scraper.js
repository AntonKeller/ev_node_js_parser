const browserObject = require("../browser");
const process = require("process");
const fs = require('fs');


const existInArray = (array, value) => {
    for (let element of array) if (element === value) return true;
    return false;
}

const clear_EngineString = str => str.split("/")
    .map(el => el.replace(/[^0-9,.]/g, ''))
    .filter(el => el.length > 0)
    .map(el => el.replace(/\.\./g, ""))
    .map(el => el.replace(/,,/g, ""));

const getNumberOfString = str => str.replace(/[^0-9,.]/g, '');

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const getTextElement = async (page, selector, plug) => await page.$eval(selector, link => link?.textContent).then(data => data).catch(() => plug);

const loadLinksToOffers = async (page) => {
    // "Легковые"
    let priorityGroups = ["Коммерческие"];
    let linksToOffers = [];

    // заходим на главную | получаем все ссылки из header | фильтруем по требования priorityGroups
    await page.goto("https://auto.ru/");
    await page.screenshot({path: "test_bot_image.png", fullPage: true});
    let linksToGroupCars = await page.$$eval("div.Header__secondLine a", links => {
        return links.map(link => new Object({href: link.href, textContent: link.textContent}));
    })
    linksToGroupCars = linksToGroupCars.filter(link => existInArray(priorityGroups, link.textContent));

    // обходим группы
    for (let group of linksToGroupCars) {
        // заходим в группу | получаем номер последней страницы | листаем страницы
        await page.goto(group.href);
        await page.screenshot({path: "offers_menu.png", fullPage: true});
        let maxPagesCount = await page.$eval("div.ListingCarsPagination span.ControlGroup a:last-child", link => Number(link.textContent));

        for (let i = 1; i < 4; i++) { //  ~maxPagesCount
            try {
                await timeout(500);
                console.log(`loading..... ${group.textContent}: ${i}/${maxPagesCount}`);
                await page.waitForSelector("div.ListingPagination__sequenceControls > a.ListingPagination__next");
                // получаем ссылки на офферы
                let result = await page.$$eval(".ListingItem .ListingItemTitle__link", links => links.map(link => new Object(
                    {href: link.href, textContent: link.textContent}
                )));
                linksToOffers = linksToOffers.concat(result);
                // переходим на следующую страницу
                await page.click("div.ListingPagination div.ListingPagination__sequenceControls > a.ListingPagination__next");
            } catch (err) {
                console.log(`Страница [${i}] пропущена`);
                console.log(err);
                continue;
            }
        }
    }

    return linksToOffers;
}


const scrapOffers = async page => {

    const cardKeys = {
        title: {ru: "Наименование", value: null},
        price: {ru: "Цена, руб.", value: null},
        link: {ru: "Источник", value: null},
        year: {ru: "Год выпуска", value: null},
        kmAge: {ru: "Пробег, км.", value: null},
        bodytype: {ru: "Кузов", value: null},
        transmission: {ru: "Тип коробки", value: null},
        state: {ru: "Состояние", value: null},
        capacityEngine: {ru: "Объем двигателя л.", value: null},
        enginePower: {ru: "Мощность двигателя? л.с.", value: null},
        engineType: {ru: "Тип двигателя", value: null}
    }
    const cards = [];
    const plug = "***";

    const linksToOffers = await loadLinksToOffers(page); // загружаем все ссылки на предложения
    //linksToOffers.length
    for (let i = 0; i < 10; i++) { // бежим по карточкам
        try {

            await page.goto(linksToOffers[i].href); // заходим в карточку
            console.log(`open card [${i + 1}/${linksToOffers.length}]:`, linksToOffers[i].href);

            const card = new Object(cardKeys);
            let buff_price = await getTextElement(page, ".OfferPriceCaption__price", plug);
            let buff_kmAge = await getTextElement(page, ".CardInfoRow_kmAge > span:last-child", plug);
            let buff_EngineString = await getTextElement(page, ".CardInfoRow_engine > span:last-child > div", plug);

            card.title.value = await getTextElement(page, ".CardHead__title", plug);
            card.price.value = buff_price === plug ? plug : getNumberOfString(buff_price);
            card.link.value = linksToOffers[i].href;
            card.year.value = await getTextElement(page, ".CardInfoRow_year > span:last-child > a", plug);
            card.kmAge.value = buff_kmAge === plug ? "Новый" : getNumberOfString(buff_kmAge);
            card.bodytype.value = await getTextElement(page, ".CardInfoRow_bodytype > span:last-child > a", plug);
            card.transmission.value = await getTextElement(page, ".CardInfoRow_transmission > span:last-child", plug);
            card.state.value = await getTextElement(page, ".CardInfoRow_state > span:last-child", plug);
            card.capacityEngine.value = clear_EngineString(buff_EngineString)[0] || plug;
            card.enginePower.value = clear_EngineString(buff_EngineString)[1] || plug;
            card.engineType.value = await getTextElement(page, ".CardInfoRow_engine > span:last-child > div > a", plug);
            cards.push(card);

        } catch (err) {
            console.log(`карточка [${linksToOffers[i].href}] пропущена`);
            console.log(err);
            continue;
        }
    }

    // Получаем значения с ключами
    let values = cards.map(bCard => {
        let resultObject = {};
        Object.keys(bCard).map(key => {
            resultObject[key] = bCard[key].value;
        })
        return resultObject;
    });

    //сохраняем данные
    const writerScript = require("../../exceljs/ExcelWriter");
    await writerScript.ExcelWriter.writeInExcelX([{
        columnsKeys: Object.keys(cardKeys).map(key => new Object({key: key})),
        columnsDesc: Object.keys(cardKeys).map(key => cardKeys[key].ru),
        rowsData: values,
    }], `data_cars_${Math.floor(11111 + Math.random() * 81111)}.xlsx`);
}

// use mode WithDebug
const getCookie = async (page) => {
    await page.goto("https://auto.ru/");
    let cookie = await page.cookies("https://auto.ru/");
    fs.writeFileSync('cookie.json', JSON.stringify(cookie));
}

(async function a() {

    const w = 1920, h = 1080;
    let browserInstance = await browserObject.startBrowser(false);
    let browser = await browserInstance;
    let page = await browser.newPage();
    await page.setViewport({width: w, height: h, deviceScaleFactor: 0});
    await getCookie(page) // сохраняем cookie

    // загружаем и устанавливаем cookie | загружаем офферы на все виды машин
    let cookie = JSON.parse(fs.readFileSync('cookie.json'));
    await page.setCookie(...cookie);
    await scrapOffers(page);
    await page.close();
    process.exit();

}())

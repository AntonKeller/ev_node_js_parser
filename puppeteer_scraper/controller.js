const CianScraperObject = require('./scraper');
const {ExcelWriter} = require("../puppeteer_screener/exceljs/ExcelWriter");
const {offerDescriptions, offerKeys} = require("./sctructures/offer");
const searchLocationIdByName = require("./Geo");

async function scrapeAll(browserInstance, locationName, isAutoClose) {
    let browser;
    try {

        browser = await browserInstance;

        let LID = await searchLocationIdByName(locationName, browser);

        if (!LID.title) throw "Город не найден!";

        console.log("search for", LID.title, "id: ", LID.id);

        let offersTemplate = {
            sheetName: "Выгрузка",
            columnsKeys: offerKeys,
            columnsDesc: offerDescriptions,
            rowsData: await CianScraperObject.jsonPagesScrape(browser, LID.id),
        }

        await ExcelWriter.writeInExcelX([offersTemplate], `${LID.title}.xlsx`);

        !isAutoClose || await browser.close();
        return true;

    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, locationName, isAutoClose) => scrapeAll(browserInstance, locationName, isAutoClose)
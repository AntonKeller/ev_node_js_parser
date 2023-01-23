const CianScraperObject = require('./scraper');
const {ExcelWriter} = require("../puppeteer_screener/exceljs/ExcelWriter");
const {offerDescriptions, offerKeys} = require("./sctructures/offer");

async function scrapeAll(browserInstance, locationID, isAutoClose) {
    let browser;
    try {

        browser = await browserInstance;

        let offersTemplate = {
            sheetName: "Выгрузка",
            columnsKeys: offerKeys,
            columnsDesc: offerDescriptions,
            rowsData: await CianScraperObject.jsonPagesScrape(browser, locationID),
        }

        await ExcelWriter.writeInExcelX([offersTemplate], `${locationID}.xlsx`);

        !isAutoClose || await browser.close();
        return true;

    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, locationID, isAutoClose) => scrapeAll(browserInstance, locationID, isAutoClose)
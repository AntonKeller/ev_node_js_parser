const CianScraperObject = require('./scraper');
const {ExcelWriter} = require("../exceljs/ExcelWriter");
const {offerDescriptions, offerKeys} = require("./sctructures/offer");
const searchLocationIdByName = require("./Geo");
const {FlatConfig, CommercialConfig} = require("./cianConfig");

async function scrapeAll(browserInstance, locationName, isAutoClose) {
    let browser;
    try {

        browser = await browserInstance;


        let LID = await searchLocationIdByName(locationName, browser);
        if (!LID) throw "Город не найден!";
        console.log("поиск (", LID.title, ") id: ", LID.id);


        let flatConfig = FlatConfig.config();
        let commercialConfig = CommercialConfig.config();

        let offersTemplateForExcel = {
            sheetName: "Выгрузка",
            columnsKeys: offerKeys,
            columnsDesc: offerDescriptions,
            rowsData: await CianScraperObject.jsonPagesScrape(browser, LID.id, flatConfig),
        }

        await ExcelWriter.writeInExcelX([offersTemplateForExcel], `${LID.title}.xlsx`);


        !isAutoClose || await browser.close();
        return true;

    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, locationName, isAutoClose) => scrapeAll(browserInstance, locationName, isAutoClose)
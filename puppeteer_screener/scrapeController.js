const pageScreenerObject = require('./pageScreener');
const {ExcelWriter, F_XLSX} = require("./exceljs/ExcelWriter");
const loadUrlsFromExcel = require("./exceljs/urlsLoader")

const createArrayFromObject = arrayObjectsUrls => {

    let arrayForReturn = [
        Object.keys(arrayObjectsUrls[0])
    ];

    //content forming
    for (let obj of arrayObjectsUrls) {

        let buffArray = [];

        for (let title in obj) {
            buffArray.push(obj[title]);
        }

        arrayForReturn.push(buffArray);
    }

    return arrayForReturn;
}


const screenshotScraper = async (browserInstance, folders, isLogging = true) => {

    let browser;

    try {
        browser = await browserInstance;


        // loading objects
        console.log("Loading data from excel.....");
        let response = await loadUrlsFromExcel(folders, isLogging);
        let arrayObjectsUrl = response.slice(0, 5);
        console.log("loaded", arrayObjectsUrl.length, "urls.");


        // getting images from pages and saving
        let saveInExcelObjectsUrl =  await pageScreenerObject.screener(browser, arrayObjectsUrl, isLogging);


        // Create matrix and save data in excel,
        console.log("save matrix.....");
        await ExcelWriter.writeInExcel(createArrayFromObject(saveInExcelObjectsUrl), "matrix", F_XLSX);


    } catch (err) {
        console.log("screenshot scraper error: ", err);
    } finally {
        await browser.close();
    }
}

module.exports = screenshotScraper;
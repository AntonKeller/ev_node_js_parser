const pageScreenerObject = require('./pageScreener');
const excel_writer = require("../exceljs/excel_writer");
const readUrlsFromExcel = require("../exceljs/excel_urls_reader");

const loadUrlsFromExcel = async folders => {

    let arrayObjectsUrlResponseUnited = [];
    let arrayObjectsUrlResult = [];

    //reading url from excel
    for (let i = 0; i < folders.length; i++) {
        let bufArrayUrls = await readUrlsFromExcel(folders[i]);
        arrayObjectsUrlResponseUnited = arrayObjectsUrlResponseUnited.concat(bufArrayUrls);
    }

    //correcting url_objects id
    for (let i = 0; i < arrayObjectsUrlResponseUnited.length; i++) {
        arrayObjectsUrlResponseUnited[i] = {
            id: i + 1,
            ...arrayObjectsUrlResponseUnited[i],
        }
    }

    // removing url_id duplicates
    for (let i = 0; i < arrayObjectsUrlResponseUnited.length - 1; i++) {

        let duplicateStatus = false;

        let buff_ObjectUrl = arrayObjectsUrlResponseUnited[i];

        for (let j = 0; j < arrayObjectsUrlResult.length; j++) {
            if (arrayObjectsUrlResult[j].urlId === buff_ObjectUrl.urlId) {
                duplicateStatus = true;
                break;
            }
        }

        if (!duplicateStatus) {
            arrayObjectsUrlResult.push(buff_ObjectUrl);
        }

    }

    return arrayObjectsUrlResult;
}

const matrixForm = arrayObjectsUrls => {

    let complexArray = [];

    //header forming
    for (let element of arrayObjectsUrls) {

        let buffArray = [];

        for (let elementHead in element) {
            buffArray.push(elementHead);
        }

        complexArray.push(buffArray);
        break;
    }

    //content forming
    for (let element of arrayObjectsUrls) {

        let buffArray = [];

        for (let elementHead in element) {
            buffArray.push(element[elementHead]);
        }

        complexArray.push(buffArray);
    }

    return complexArray;
}

const scrapeController = {

    screenshotScraper: async (browserInstance, folders, isLogging = true) => {
        let browser;

        try {
            browser = await browserInstance;

            // loading objects
            console.log("Loading data from excel.....");
            let arrayObjectsUrl = (await loadUrlsFromExcel(folders, isLogging)).slice(0, 10);
            console.log("loaded", arrayObjectsUrl.length, "urls.");

            // formation of a matrix from links
            console.log("Creating urls matrix.....");
            let matrixFormComplexArray = matrixForm(arrayObjectsUrl);

            // write matrix data in excel
            console.log("Writing urls matrix in excel.....");
            await excel_writer(matrixFormComplexArray, "matrix");

            // getting images from pages and saving
            await pageScreenerObject.screener(browser, arrayObjectsUrl, isLogging);

        } catch (err) {
            console.log("screenshot scraper error: ", err);
        } finally {
            await browser.close();
        }
    }

}

module.exports = scrapeController;
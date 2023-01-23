const excel_writer = require("../../puppeteer_screener/exceljs/ExcelWriter");
const testJsonData = require("./testData");


const saveInExcel = async (jsonData = testJsonData) => {

    if (jsonData.length > 0) {

        try {

            let header = [];
            let complexArray = [];

            for (let key in jsonData[0]) {
                header.push(key);
            }

            console.log('header', header);

            for (let i = 0; i < jsonData.length; i++) {
                complexArray.push(header.map(title => jsonData[i][title]));
            }

            complexArray.unshift(header);

            await excel_writer(complexArray, 'cian_scrap_data');

        } catch (err) {
            console.log("Could not save file", err);
        }

    }

}

module.exports = saveInExcel;
const ExcelJS = require("exceljs");

(function a() {

    const wb = new ExcelJS.Workbook();

    wb.xlsx.readFile("C:\\projects\\test\\puppeteer_screener\\files_data\\data_1.xlsx").then(() => {

        let sheet = '';
        let indexSheet = 1;

        let sheets = wb.worksheets;
        let sheetsNames = [];


        for (let i = 0; i < sheets.length; i++){
            sheetsNames.push(sheets[i].name);
        }

        console.log('sheets', sheetsNames)
        // wb.worksheets.map(sheet => {
        //     console.log('sheet.name', Array.isArray(sheet.name))
        // })
        // const buffSheet = wb.getWorksheet("17");
        // do {
        //     const buffSheet = wb.getWorksheet(indexSheet);
        //     if (buffSheet === undefined) break;
        //     console.log(`index sheet name [${indexSheet}]:`, buffSheet.name);
        //     indexSheet++;
        // } while (sheet !== undefined)

        // console.log('Sheets:', indexSheet -1);

    }).catch(err => {
        console.log(err.message);
    });

})()
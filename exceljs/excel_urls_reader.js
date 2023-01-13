const ExcelJS = require('exceljs');

const default_file_name = 'data_1.xlsx'

const defaultParams = {
    keyWord: "cian",
    columnStartIndex: 5,
    columnEndIndex: 12,
}


const getUrlObjectFromCell = (cell, keyWord = "cian") => {

    if (String(cell.text) != null) {
        if (String(cell.text).indexOf(keyWord) !== -1) {

            let url = String(cell.text);

            let buff = url.split("/")
                .map(item => item.split("-"))
                .flat()
                .filter(item => item.length > 0);

            let urlId = buff[buff.length - 1];

            return {
                urlId: urlId,
                url: url,
            };
        }
    }

    return undefined;
}


const readUrlsFromExcel = async (fileName = default_file_name, params = defaultParams) => new Promise(resolve => {

    const workbook = new ExcelJS.Workbook();
    const buffArrayObjectsUrl = [];

    workbook.xlsx.readFile(fileName).then(() => {
        let sheets = workbook.worksheets;
        let arraySheetsName = [];

        for (let i = 0; i < sheets.length; i++) {
            arraySheetsName.push(sheets[i].name);
        }

        for (let i = 0; i < arraySheetsName.length; i++) {

            let sheet = workbook.getWorksheet(arraySheetsName[i]);

            for (let i = params.columnStartIndex; i <= params.columnEndIndex; i++) {

                sheet.getColumn(i).eachCell(cell => {

                    let buffUrlObj = getUrlObjectFromCell(cell, params.keyWord);
                    if (buffUrlObj !== undefined){
                        buffArrayObjectsUrl.push({
                            sheetName: sheet.name,
                            path: fileName,
                            ...buffUrlObj,
                        });
                    }

                });

            }

        }

        resolve(buffArrayObjectsUrl);

    }).catch(err => {
        console.log(err.message);
    })
})

module.exports = readUrlsFromExcel;
const ExcelJS = require('exceljs');


const defaultParams = {
    keyWord: "cian",
    columnStartIndex: 5,
    columnEndIndex: 12,
}


const getUrlFromCell = (cell, keyWord = "cian") => {

    let cellValue = String(cell.text);

    if ((cellValue != null) && (cellValue.indexOf(keyWord) !== -1)) {

        let buff = cellValue.split("/")
            .map(item => item.split("-"))
            .flat()
            .filter(item => item.length > 0);

        return {
            url: cellValue,
            urlId: buff[buff.length - 1],
        };

    }

    return undefined;
}


const getUrlsArray = async (fileName, params = defaultParams) => new Promise((resolve) => {

    const workbook = new ExcelJS.Workbook();

    workbook.xlsx.readFile(fileName)
        .then(() => {

            let sheets = workbook.worksheets;
            let buffUrlsArray = [];
            let sheetsNames = [];

            for (let i = 0; i < sheets.length; i++) {
                sheetsNames.push(sheets[i].name);
            }

            for (let i = 0; i < sheetsNames.length; i++) {

                let sheet = workbook.getWorksheet(sheetsNames[i]);

                for (let i = params.columnStartIndex; i <= params.columnEndIndex; i++) {

                    sheet.getColumn(i).eachCell(cell => {

                        let buffUrlObj = getUrlFromCell(cell, params.keyWord);

                        if (buffUrlObj) { //buffUrlObj !== undefined

                            buffUrlsArray.push({
                                path: fileName,
                                sheetName: sheet.name,
                                url: buffUrlObj.url,
                                urlId: buffUrlObj.urlId,
                            });

                        }

                    });

                }

            }

            resolve(buffUrlsArray);

        })
        .catch(err => {
            console.log(err.message);
        });
});


const loadUrlsFromExcel = async folders => {

    let responseUrlObjects = [];
    let arrayObjectsUrlResult = [];

    //reading url from excel
    for (let fileName of folders) {
        responseUrlObjects = responseUrlObjects.concat(await getUrlsArray(fileName));
    }

    //complex array -> simple array
    responseUrlObjects.flat();

    //correcting url_objects id
    for (let i = 0; i < responseUrlObjects.length; i++) {
        responseUrlObjects[i] = {
            id: i + 1,
            ...responseUrlObjects[i],
        }
    }

    // removing url_id duplicates
    for (let i = 0; i < responseUrlObjects.length - 1; i++) {

        let duplicateStatus = false;

        let buff_ObjectUrl = responseUrlObjects[i];

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


module.exports = loadUrlsFromExcel;
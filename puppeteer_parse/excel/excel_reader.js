const ExcelJS = require('exceljs');

const default_file_name = 'simple.xlsx'

const excel_reader = (file_name = default_file_name) => {
    const wb = new ExcelJS.Workbook();

    wb.xlsx.readFile(file_name).then(() => {

        const ws = wb.getWorksheet('My Sheet');

        const c1 = ws.getColumn(1);

        c1.eachCell(c => {

            console.log(c.value);
        });

        const c2 = ws.getColumn(2);

        c2.eachCell(c => {

            console.log(c.value);
        });
    }).catch(err => {
        console.log(err.message);
    });
}

excel_reader();

module.exports = excel_reader;
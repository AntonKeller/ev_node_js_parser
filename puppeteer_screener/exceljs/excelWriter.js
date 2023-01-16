const Excel = require('exceljs');

const writeInExcel = async (
    complex_array = [["default"]["default"]],
    file_name = "defaultFileName"
) => {

    const workbook = new Excel.Workbook();
    (workbook.addWorksheet('sheet_1')).addRows(complex_array);
    workbook.xlsx.writeFile(`${file_name}.xlsx`).catch(err => {
        console.log(err.message);
    });

}

module.exports = writeInExcel;
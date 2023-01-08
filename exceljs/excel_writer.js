const Excel = require('exceljs');

let default_complex_array = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10]
];

let default_file_name = 'simple.xlsx';

const excel_writer = (complex_array = default_complex_array, file_name = default_file_name) => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('My Sheet');

    ws.addRows(complex_array);
    //
    // const v0 = ws.getCell('A1').value;
    // console.log(v0);
    //
    // const v1 = ws.getCell(1, 1).value;
    // console.log(v1);
    //
    // const v2 = ws.getRow(2).getCell(2).value;
    // console.log(v2);

    wb.xlsx
        .writeFile(file_name)
        .then(() => {
            console.log('file created');
        })
        .catch(err => {
            console.log(err.message);
        });
}

module.exports = excel_writer;
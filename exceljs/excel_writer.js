const Excel = require('exceljs');


const default_complex_array = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10]
];

const default_file_name = 'simple';

const excel_writer = async (complex_array = default_complex_array, file_name = default_file_name) => {

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('sheet_1');
    worksheet.addRows(complex_array);

    workbook.xlsx.writeFile(`${file_name}.xlsx`)
        .catch(err => {
            console.log(err.message);
        });
}

module.exports = excel_writer;
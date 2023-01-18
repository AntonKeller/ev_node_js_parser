const Excel = require('@nbelyh/exceljs');

const F_XLSX = "xlsx";
const F_CSV = "csv";

const writeInExcel = async (
    complex_array = [["default"]["default"]],
    file_name = "defaultFileName",
    fileFormat = F_XLSX,
    params = {properties: {defaultColWidth: 18}},
) => {

    const workbook = new Excel.Workbook();
    workbook.addWorksheet('data', params).addRows(complex_array);

    workbook.xlsx.writeFile(`${file_name}.${fileFormat}`).catch(err => {
        console.log(err.message);
    });

}

let defaultTemplate = {
    columnsKeys: [{key: "title_1"}, {key: "title_2"}],
    columnsDesc: ["Заголовок 1", "Заголовок 2"],
    rowsData: [
        {
            title_1: "data first title",
            title_2: "data second title",
        },
    ],
}


let saveExcelX = async (
    template = defaultTemplate,
    fileName = "default.xlsx",
    params = {properties: {defaultColWidth: 18}},
) => {
    const workbook = new Excel.Workbook();

    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'everest';
    workbook.created = new Date(1997, 4, 26);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2023, 1, 18);

    const worksheet = workbook.addWorksheet('data', params);
    worksheet.columns = template.columnsKeys;
    // worksheet.addRow(template.columnsDesc.length).values = template.columnsDesc;
    worksheet.addRow(template.columnsDesc);
    worksheet.addRows(template.rowsData);
    workbook.xlsx.writeFile(fileName)
        .catch(err => {
            console.log(err.message);
        });
}

module.exports = {
    writeInExcel,
    saveExcelX,
    F_XLSX,
    F_CSV,
};
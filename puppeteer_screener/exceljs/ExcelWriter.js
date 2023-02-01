const Excel = require('@nbelyh/exceljs');


const F_XLSX = "xlsx";
const F_CSV = "csv";

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

const ExcelWriter = {

    writeInExcel: async (
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
    },

    writeInExcelX: async (
        templates = [defaultTemplate],
        fileName = "default.xlsx",
        params = {properties: {defaultColWidth: 18, tabColor:{argb:'FF00FF00'}}},
    ) => {
        const workbook = new Excel.Workbook();
        workbook.company = 'everest';

        for (let template of templates) {
            const worksheet = await workbook.addWorksheet(template.sheetName, params);
            worksheet.columns = template.columnsKeys;
            worksheet.addRow(template.columnsDesc);
            worksheet.addRows(template.rowsData);
        }

        await workbook.xlsx.writeFile(fileName).catch(err => {
            console.log(err.message);
        });
    }
}


module.exports = {
    ExcelWriter,
    F_XLSX,
    F_CSV,
};
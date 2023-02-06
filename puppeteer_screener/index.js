const browserObject = require('./browser');
const screenshotScraper = require('./scrapeController');
const loadUrlsFromExcel = require("./exceljs/urlsLoader");
const CianScreener = require("./ev_screener_cian.ru");
const process = require("process");
const path = require("node:path");
const {ExcelWriter} = require("./exceljs/ExcelWriter");

(async function start() {

    const excelTemplate = {
        sheetName: "матрица",
        columnsKeys: [{key: "id"}, {key: "sheet"}, {key: "path"}, {key: "urlId"}, {key: "url"}],
        columnsDesc: ["№", "вкладка", "файл", "ID предложения", "источник"],
        rowsData: [],
    }

    let folders = [
        "./files_data/СП_коммерческая_1.xlsx",
        // "./files_data/СП_коммерческая_2.xlsx",
    ];

    let browserInstance = await browserObject.startBrowser(true);
    let browser = await browserInstance;
    let analogues = (await loadUrlsFromExcel(folders, false));
    console.log("Excel data is loaded!");


    // cleaning of duplicates
    let analoguesWithoutDuplicatesObject = {};

    analogues.map(analogue => {
        if (!(analogue.urlId in analoguesWithoutDuplicatesObject)) {
            analoguesWithoutDuplicatesObject[analogue.urlId] = {
                id: analogue.id,
                path: analogue.path,
                sheetName: analogue.sheetName,
                url: analogue.url,
            };
        }
    });

    let analoguesWithoutDuplicates = Object.keys(analoguesWithoutDuplicatesObject).map((key, index) => {
        return {
            id: index,
            path: analoguesWithoutDuplicatesObject[key].path,
            sheetName: analoguesWithoutDuplicatesObject[key].sheetName,
            url: analoguesWithoutDuplicatesObject[key].url,
            urlId: key,
        }
    })


    // screening
    let counter = 1;
    for (let analogue of analoguesWithoutDuplicates) {

        const page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080});

        let config = {
            path: "",
            clip: {
                x: 0,
                y: 0,
                width: 1920,
                height: 1200
            },
        };

        const delayMs = Math.floor(300 + Math.random() * 600);

        // скриншот 1
        config.path = `${path.resolve(__dirname)}/images/${analogue.urlId}-1.jpeg`;
        await CianScreener.screenshot(page, analogue.url, config, delayMs);
        excelTemplate.rowsData.push({
            id: counter++,
            sheet: analogue.sheetName,
            path: analogue.path,
            urlId: `${analogue.urlId}-1`,
            url: analogue.url
        })


        let mapHandle = await page.$("div[data-name=CardSection]");
        if (mapHandle) {
            // скриншот 2
            let mapY = await page.evaluate(e => e.offsetTop, mapHandle);
            config.clip.y = mapY - 100;
            config.path = `${path.resolve(__dirname)}/images/${analogue.urlId}-2.jpeg`;
            await CianScreener.screenshot(page, analogue.url, config, delayMs);
            excelTemplate.rowsData.push({
                id: counter++,
                sheet: analogue.sheetName,
                path: analogue.path,
                urlId: `${analogue.urlId}-2`,
                url: analogue.url
            })
        }

        console.log(`loading.....${analogue.urlId}`);

        await page.close();
    }


    await ExcelWriter.writeInExcelX([excelTemplate], "matrix.xlsx");
    process.exit();

})()


// // bot testing
// let browserInstance = await browserObject.startBrowser();
// let page = await browserInstance.newPage();
// await page.goto("https://bot.sannysoft.com");
// await page.screenshot({path: `${path.resolve(__dirname)}/TEST_BOT.jpeg`});








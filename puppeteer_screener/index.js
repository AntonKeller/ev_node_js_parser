const browserObject = require('./browser');
const scrapeController = require('./scrapeController');

(async function start() {

    //X:\NewEvConsDocs\СОГАЗ\МСФО_2022\2 Working\Расчеты\СП_2022\СП_коммерческая_1.xlsx
    // X:\NewEvConsDocs\СОГАЗ\МСФО_2022\2 Working\Расчеты\СП_2022\СП_коммерческая_2.xlsx
    //
    // Папка
    // X:\NewEvConsDocs\СОГАЗ\МСФО_2022\4 Report\Приложения\скрины

    const isLogging = true;

    let folders = [
        "C:\\projects\\test\\puppeteer_screener\\files_data\\СП_коммерческая_1.xlsx",
        "C:\\projects\\test\\puppeteer_screener\\files_data\\СП_коммерческая_2.xlsx"
    ];

    // bot testing
    // let page = await browserInstance.newPage();
    // await page.goto("https://bot.sannysoft.com");
    // await page.screenshot({path: `${path.resolve(__dirname)}/TEST_BOT.jpeg`});

    console.log("Start load images from website");

    scrapeController
        .screenshotScraper(await browserObject.startBrowser(), folders, isLogging)
        .then(() => console.log('Process completed!'));

})()





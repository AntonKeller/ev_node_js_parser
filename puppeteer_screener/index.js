const browserObject = require('./browser');
const scrapeController = require('./scrapeController');

(async function start() {

    const isLogging = true;

    let folders = [
        "./files_data/data_1.xlsx",
        "./files_data/data_2.xlsx"
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





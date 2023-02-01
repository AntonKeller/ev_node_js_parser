const process = require('process');
const browserObject = require('./browser');
const scraperController = require('./controller');


(async function abc() {

    const flats = [
        // "Вологодская область",
        // "Забайкальский край",
        // "Иркутская область",
        // "Калининградская область",
        // "Кировская область",
        // "Красноярский край",
        // "Республика Хакасия",
        // "Тюменская область",
    ]

    let browserInstance = await browserObject.startBrowser();

    await scraperController(browserInstance, "ярославская", true);

    process.exit();

})();








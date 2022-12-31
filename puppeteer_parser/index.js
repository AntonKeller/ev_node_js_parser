const browserObject = require('./browser');
const scraperController = require('./pageController');
const response_structure = require('./response_structure')

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

let options = {
    // era: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // weekday: 'long',
    // timezone: 'UTC',
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric'
};

let url = 'https://www.cian.ru/cat.php?deal_type=rent&engine_version=2&offer_type=offices&p=2&region=4608'

// Pass the browser instance to the scraper controller
scraperController(browserInstance, 'https://samara.cian.ru/rent/commercial/', response_structure)
    .then(response_structured => {

        console.log(response_structured)

    })
    .then(results => {
        // let currentPage = results.currentPage + 1;
        // console.log("results", results);
        // console.log("json_file", json_file)
        // while (currentPage <= json_file.pagesCount){
        //
        // }
    })


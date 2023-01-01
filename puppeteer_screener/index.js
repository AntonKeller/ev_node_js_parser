const browserObject = require('./browser');
const scraperController = require('./pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

let urls = [
    'https://saratov.cian.ru/rent/commercial/269412751/',
    'https://saratov.cian.ru/rent/commercial/238375469/',
    'https://www.cian.ru/rent/commercial/281335995/',
    // 'https://www.cian.ru/rent/commercial/274017408/',
    // 'https://www.cian.ru/rent/commercial/281927447/',
    // 'https://www.cian.ru/rent/commercial/281878518/',
]

// Pass the browser instance to the scraper controller
scraperController(browserInstance, urls)
    .then(() => {
        console.log('complete');
    })


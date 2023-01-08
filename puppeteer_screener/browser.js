const {executablePath} = require('puppeteer')
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function startBrowser(){
    let browser;

    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({

            headless: true,
            executablePath: executablePath(),
            // slowMo: 1000,
            // executablePath: "C:\Program Files\Google\Chrome\Application\chrome.exe",
            defaultViewport: {
                width: 1440,
                height: 2000,
            },

            args: [
                "--disable-setuid-sandbox",
            ],
            'ignoreHTTPSErrors': true
        });

    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }

    return browser;
}

module.exports = {
    startBrowser
};
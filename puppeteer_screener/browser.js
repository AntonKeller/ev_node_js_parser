const {executablePath} = require('puppeteer')
const puppeteer = require('puppeteer-extra');
const stealth= require('puppeteer-extra-plugin-stealth')();
const {chromium} = require('playwright-extra')


chromium.use(stealth);

puppeteer.use(stealth);

async function startBrowserPlaywrightExtra(){

    let browser;

    try {
        console.log("Opening the browser......");
        browser = await chromium.launch({headless: true});

    } catch (err) {
        console.log("Could not create a browser playwright extra instance => : ", err);
    }

    return browser;
}

async function startBrowser(){

    let browser;

    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: true,
            executablePath: executablePath(),
            // slowMo: 100,
            // executablePath: "C:\Program Files\Google\Chrome\Application\chrome.exe",
            defaultViewport: {
                width: 1440,
                height: 3100,
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
    startBrowser,
    startBrowserPlaywrightExtra,
};
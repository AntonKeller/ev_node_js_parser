const {executablePath} = require('puppeteer')
const puppeteer = require('puppeteer-extra');
puppeteer.use(require('puppeteer-extra-plugin-stealth')());

// create using puppeteer.
const {DEFAULT_INTERCEPT_RESOLUTION_PRIORITY} = require('puppeteer');

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

puppeteer.use(
    AdblockerPlugin({
        interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY
    })
)

async function startBrowser(headless) {

    let browser;

    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: headless,
            // executablePath: executablePath(),
            executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
            slowMo: 20,
            args: [
                "--disable-setuid-sandbox",
                "--start-maximized",
                "--ignore-certificate-errors",
                // "--blink-settings=scriptEnabled=false"
                // '--window-size=1920,1080',
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
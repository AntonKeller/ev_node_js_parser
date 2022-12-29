const puppeteer = require('puppeteer');

async function startBrowser(){
    let browser;
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            // executablePath: "C:\Program Files\Google\Chrome\Application\chrome.exe",
            defaultViewport: {
                width: 1440,
                height: 2000,
            },
            headless: false,
            slowMo: 100,
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
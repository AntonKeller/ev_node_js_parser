const {executablePath} = require('puppeteer')
const puppeteer = require('puppeteer-extra');
puppeteer.use(require('puppeteer-extra-plugin-stealth')());

async function startBrowser(){

    let browser;

    try {

        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: true,
            executablePath: executablePath(),
            // slowMo: 1000,
            args: ["--disable-setuid-sandbox"],
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
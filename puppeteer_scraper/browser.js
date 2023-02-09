const {executablePath} = require('puppeteer')
const puppeteer = require('puppeteer-extra');
puppeteer.use(require('puppeteer-extra-plugin-stealth')());

async function startBrowser(headlessType = true){

    let browser;

    try {

        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: headlessType,
            isMobile:true,
            executablePath: executablePath(),
            // waitForInitialPage: true,
            slowMo: 30,
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
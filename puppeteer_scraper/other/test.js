// require executablePath from puppeteer
const {executablePath} = require('puppeteer')
const puppeteer = require('puppeteer-extra');
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const path = require("node:path");

puppeteer.use(StealthPlugin());
puppeteer.launch({
    headless: true,
    executablePath: executablePath(),

}).then(async browser => {

    console.log('Running tests..')

    const page = await browser.newPage()
    await page.goto('https://www.cian.ru/cat.php?deal_type=rent&engine_version=2&offer_type=offices&office_type%5B0%5D=1&p=5&region=1')
    await page.screenshot({path: `${path.resolve(__dirname)}/testresult.jpeg`, fullPage: true})
    await browser.close()

    console.log(`All done, check the screenshot.`)

})
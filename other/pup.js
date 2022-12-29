const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.cian.ru/', {
        timeout: 8000,
    });
    await page.screenshot({ path: 'example.png' , fullPage: true});
    await browser.close();
})();
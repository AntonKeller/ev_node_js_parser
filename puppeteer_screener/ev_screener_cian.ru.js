const delay = ms => new Promise(async resovle => setTimeout(r => resovle(r), ms));

const CianScreener = {

    screenshot: (page, url, config, timeout_ms) => new Promise(async resolve => {
        await page.goto(url);
        await delay(timeout_ms);
        await page.screenshot(config);

        // await page.setJavaScriptEnabled(false);
        // await page.evaluate(`document.querySelector('body').style = {}`);
        // await adCleaner();
        try {
            await page.click("div[data-name=CookiesNotification] > div > ._25d45facb5--button--Cp1dl")
        } catch (err) {
        }
        resolve();
    }),

};

module.exports = CianScreener;
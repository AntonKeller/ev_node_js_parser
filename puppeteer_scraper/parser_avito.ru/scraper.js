const browserObject = require("../browser");
const process = require("process");
const path = require("node:path");

let AvitoScraper = {

    other: {
        screener: {
            config: {
                clip: {
                    'x': 0,
                    'y': 0,
                    'width': 1100,
                    'height': 1000,
                },
            },
            screenshotNow: async (page, path, width = 1100, height = 1000) => page.screenshot({
                ...this.config,
                path,
                width,
                height
            })
        },
    },

    mainPage: {

        URL: "https://www.avito.ru/",

        async waitFor(page) {
            await page.goto(this.URL);
            await page.waitForSelector("body");
        },

        async getMainCategoryLinks(page) {
            await this.waitFor(page);
            return await page.$$eval(".category-with-counters-root-z4cPe a", links => links.map(link => link.href));
        },

        async getRecommends(page) {
            await this.waitFor(page);
            return await page.$$eval("div[data-marker=bx-recommendations-block-item]", links => {
                return links.map(link => {
                    return {
                        title: link.querySelector("h3").textContent,
                        price: link.querySelector("span.price-price-JP7qe > meta[itemprop=price]").getAttribute("content"),
                        address: "",
                        date: "",
                        url: link.querySelector("a").href,
                    }
                })
            });
        },
    }
};

(async function a() {
    const w = 1620, h = 1080;
    let browserInstance = await browserObject.startBrowser(false);
    let browser = await browserInstance;
    let page = await browser.newPage();
    await page.setViewport({width: w, height: h, deviceScaleFactor: 2});
    let recommendSaleLinksFromMainPage = await AvitoScraper.mainPage.getRecommends(page);
    let categoryLinksFromMainPage = await AvitoScraper.mainPage.getMainCategoryLinks(page);
    await AvitoScraper.other.screener.screenshotNow(page, `${path.resolve(__dirname)}/images/img.jpeg`, w, h);
    await page.close();
    process.exit();
}())

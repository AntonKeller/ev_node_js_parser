const {executablePath} = require('puppeteer')
const puppeteer = require('puppeteer-extra');
const writeInExcel = require("../exceljs/ExcelWriter");
puppeteer.use(require('puppeteer-extra-plugin-stealth')());


puppeteer.launch({
    headless: false,
    executablePath: executablePath(),
})
    .then(async browser => {
        console.log('Running tests..')
        const page = await browser.newPage()
        await page.goto('https://avtocod.ru/proverkaavto/%D0%9C524%D0%90%D0%A1799?rd=GRZ')
        await page.waitForSelector(".car__img");

        let data = await page.$$eval("#identifiers > .lcn-lists > ul > li", links => {
            return links.map(link => {

                let title = link.querySelector("span");
                let value = link.querySelector("div > div > div > span");

                return {
                    title: title.textContent.replace(/\r?\n/g, "").trim(),
                    value: value ? value.textContent.replace(/\r?\n/g, "").trim() : "-",
                }
            })
        });

        let complexArray = [];
        let head = [];
        let content = [];

        for (obj of data) {
            head.push(obj.title);
            content.push(obj.value);
        }

        complexArray.push(head);
        complexArray.push(content);


        await writeInExcel(complexArray, "autocode_data");

        console.log("data", data);

        await browser.close();
        console.log(`All done, check the screenshot. ✨`);
    })

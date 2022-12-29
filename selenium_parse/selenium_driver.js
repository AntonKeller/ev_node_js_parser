const {By, Key, Builder, until} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
require("chromedriver");

const {fs} = require("node:fs");
const path = require("path");

const chromeOptions = new chrome.Options();

const timeout = 5000;

async function test() {
    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions.excludeSwitches("enable-logging")).build();

    await driver.manage()
        .setTimeouts({implicit: timeout});

    await driver.get("https://www.cian.ru/");

    await driver.findElement(By.xpath("//button[contains(.,'Принять')]")).click();

    await driver.findElement(By.id("geo-suggest-input"))
        .sendKeys("Ярославль, Кировский район")

    let item = await driver.findElement(By.css(".\\_025a50318d--item-selected--aQFJG"));

    // let item = await driver.wait(until.elementLocated(By.css(".\\_025a50318d--item-selected--aQFJG")), timeout);

    await item.click()

    let btn_find = await driver.wait(until.elementLocated(By.xpath("//a[contains(text(),'Найти')]")), timeout);

    await btn_find.click();

    await driver.takeScreenshot().then((image) => {
        require('fs').writeFileSync('captured_image_3.png', image, 'base64');
    })


    let html = await driver.findElement(By.tagName("html"));

    html.getAttribute("innerHTML")
        .then((html_text) => {
            // require('fs').writeFileSync('html_text.txt', html_text, 'base64');
            console.log('html_text.length: ', html_text.length);
            const str = 'window._cianConfig[\'legacy-commercial-serp-frontend\'] = (window._cianConfig[\'legacy-commercial-serp-frontend\'] || []).concat('
            console.log('start', html_text.spl);
            console.log('end', );

            return driver.getCurrentUrl();
        }).then(currentUrl => {
        console.log('current url: ', currentUrl)
    })
}

test()

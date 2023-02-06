const {By, Builder, until} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
require("chromedriver");

const chromeOptions = new chrome.Options();

async function test() {


    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions.excludeSwitches("enable-logging")).build();

    await driver.manage().setTimeouts({implicit: 50000});

    await driver.get("https://www.cian.ru/");
    await driver.get("https://www.cian.ru/commercial/");
    await driver.findElement(By.xpath("//button[contains(.,'Принять')]")).click();
    await driver.findElement(By.id("geo-suggest-input")).sendKeys("Москва, ЦАО");
    await driver.findElement(By.xpath("//*[@id=\"frontend-mainpage\"]/section/div/div[2]/div[2]/div[1]/div[1]/div[1]/div/ul/li[1]/a")).click();
    await driver.findElement(By.xpath("//*[@id=\"frontend-mainpage\"]/section/div/div[2]/div[2]/div[1]/div[1]/div[1]/div/ul/li[1]/a")).click();
    await driver.findElement(By.xpath("//*[@id=\"frontend-mainpage\"]/section/div/div[2]/div[2]/div[1]/div[1]/div[1]/div/ul/li[2]/a")).click();
    // await driver.wait(until.elementLocated(By.xpath("//*[@id=\"legacy-commercial-serp-frontend\"]/div/div[9]/div/ul/li[2]/a")), timeout).click();

    await driver.findElement(By.css(".\\_025a50318d--item--pYbdY")).click();

    let btn_find = await driver.findElement(By.xpath("//a[contains(text(),'Найти')]"));

    await btn_find.click();

    // await driver.takeScreenshot().then((image) => {
    //     require('fs').writeFileSync('captured_image_3.png', image, 'base64');
    // })


    let html = await driver.findElement(By.tagName("html"));

    html.getAttribute("innerHTML")
        .then((html_text) => {
            // require('fs').writeFileSync('html_text.txt', html_text, 'base64');
            console.log('html_text.length: ', html_text.length);
            const str = 'window._cianConfig[\'legacy-commercial-serp-frontend\'] = (window._cianConfig[\'legacy-commercial-serp-frontend\'] || []).concat('
            console.log('start', html_text.indexOf(str));
            console.log('end', );

            return driver.getCurrentUrl();
        }).then(currentUrl => {
        console.log('current url: ', currentUrl)
    })
}

test()

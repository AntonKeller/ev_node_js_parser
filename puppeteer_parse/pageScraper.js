const scraperObject = {

    async scraper(browser, url) {
        let page = await browser.newPage();

        console.log(`Navigating to ${url}...`);

        await page.goto(url);

        const aHandle = await page.evaluateHandle(
            () => window._cianConfig["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results
        );

        const results = await page.evaluateHandle(results => results, aHandle);

        return await results.jsonValue();

        await results.dispose();
    }
}

module.exports = scraperObject;
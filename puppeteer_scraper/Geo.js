const defineIndexStrOfStr = require("../algorithms/defineIndexStrOfStr");
const locationsStateUrl = "https://www.cian.ru/";
const stateJsonAddress = () => window._cianConfig['frontend-mainpage'].find(item => item.key === 'initialState').value.mainpage.regionsData;

const getRegionsData = async (page) => {
    await page.goto(locationsStateUrl);
    const results = await page.evaluateHandle(results => results, await page.evaluateHandle(stateJsonAddress));
    return results.jsonValue();
};


const search = (regionsData, address) => {

    let priorityIndices = [];

    // prioritization regions
    for (let region of regionsData.regions) {

        const rang = defineIndexStrOfStr(address, region.title).rang;
        if (rang > 0) {
            priorityIndices.push({
                ...region,
                locationPriority: 0,
                priority: rang,
            })
        }

    }

    // prioritization cities
    for (let city of regionsData.cities) {

        const rang = defineIndexStrOfStr(address, city.title).rang;
        if (rang > 0) {
            priorityIndices.push({
                ...city,
                locationPriority: 1,
                priority: rang,
            })
        }
    }

    if (priorityIndices.length <= 0) return null;

    // search hight priority address
    if (priorityIndices.length > 1) {

        let result = priorityIndices[0];
        for (let i = 1; i < priorityIndices.length; i++) {
            let current = priorityIndices[i];
            if ((result.priority < current.priority) || (result.priority === current.priority && result.locationPriority < current.locationPriority)) {
                result = current;
            }
        }
        return result;
    }

    return priorityIndices[0];
};

const searchLocationIdByName = async (nameCity, browser) => {

    let page = await browser.newPage();
    const regionsData = await getRegionsData(page);
    await page.close();
    return search(regionsData, nameCity);

};

module.exports = searchLocationIdByName;
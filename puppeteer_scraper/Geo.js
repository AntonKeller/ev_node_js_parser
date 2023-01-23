const locationsStateUrl = "https://www.cian.ru/";
const stateJsonAddress = () => window._cianConfig['frontend-mainpage'].find(item => item.key === 'initialState').value.mainpage.regionsData;

const getRegionsData = async (page) => {
    await page.goto(locationsStateUrl);
    const results = await page.evaluateHandle(results => results, await page.evaluateHandle(stateJsonAddress));
    return results.jsonValue();
};


const search = (regionsData, name) => {

    let success = false;
    let nameSplit = name.toLowerCase().split(" ");

    for (let i = 0; i < regionsData.regions.length; i++) {

        let title = regionsData.regions[i].title.toLowerCase();

        for (let subName of nameSplit) {
            success = (title.indexOf(subName) !== -1);
            if (success) {
                return regionsData.regions[i];
                break;
            }
        }

    }

    for (let i = 0; i < regionsData.cities.length; i++) {

        let title = regionsData.cities[i].title.toLowerCase();

        for (let subName of nameSplit) {
            success = (title.indexOf(subName) !== -1);
            if (success) {
                return regionsData.cities[i];
                break;
            }
        }

    }

    return {};
};

const searchLocationIdByName = async (name, browser) => {
    let page = await browser.newPage();
    const regionsData = await getRegionsData(page);
    await page.close();
    return search(regionsData, name);
};

module.exports = searchLocationIdByName;
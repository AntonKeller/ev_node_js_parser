const keyCallBack = item => item.key === 'initialState';
const object_main = "legacy-commercial-serp-frontend";
const object_serp = "frontend-mainpage";

const requestsCallBackConsoleObject = {
    foundPagesCount: () => window._cianConfig[object_main].find(keyCallBack).value.results.aggregatedOffers,
    offersCallback: () => window._cianConfig[object_main].find(keyCallBack).value.results.offers,
    regionsCallback: () => window._cianConfig[object_serp].find(keyCallBack).value.mainpage.regionsData.regions,
    citiesCallback: () => window._cianConfig[object_serp].find(keyCallBack).value.mainpage.regionsData.cities,
}

module.exports = requestsCallBackConsoleObject;
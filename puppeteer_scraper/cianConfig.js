const main = "https://www.cian.ru/cat.php?";

const CianConfig = {
    requestConfig: [
        // {
        //     offerType: "Аренда офисов",
        //     baseLink: locationID => `${main}deal_type=rent&engine_version=2&offer_type=offices&office_type=1&location=${locationID}`,
        //     getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        // },
        // {
        //     offerName: "Продажа офисов",
        //     baseLink: locationID => `${main}deal_type=sale&engine_version=2&offer_type=offices&office_type=1&location=${locationID}`,
        //     getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        // },
        // {
        //     offerName: "Торговая площадь",
        //     baseLink: locationID => `${main}deal_type=rent&engine_version=2&offer_type=offices&office_type=2&location=${locationID}`,
        //     getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        // },
        // {
        //     offerName: "Торговая площадь",
        //     baseLink: locationID => `${main}deal_type=sale&engine_version=2&offer_type=offices&office_type=2&location=${locationID}`,
        //     getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        // },
        // {
        //     offerName: "Склад",
        //     baseLink: locationID => `${main}deal_type=rent&engine_version=2&offer_type=offices&office_type=3&location=${locationID}`,
        //     getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        // },
        // {
        //     offerName: "Склад",
        //     baseLink: locationID => `${main}deal_type=sale&engine_version=2&offer_type=offices&office_type=3&location=${locationID}`,
        //     getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        // },
        // {
        //     offerName: "Производственное помещение",
        //     baseLink: locationID => `${main}deal_type=rent&engine_version=2&offer_type=offices&office_type=7&location=${locationID}`,
        //     getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        // },
        // {
        //     offerName: "Производственное помещение",
        //     baseLink: locationID => `${main}deal_type=sale&engine_version=2&offer_type=offices&office_type=7&location=${locationID}`,
        //     getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        // },
        // {
        //     offerName: "Здание",
        //     baseLink: locationID => `${main}deal_type=rent&engine_version=2&offer_type=offices&office_type=11&location=${locationID}`,
        //     getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        // },
        // {
        //     offerName: "Здание",
        //     baseLink: locationID => `${main}deal_type=sale&engine_version=2&offer_type=offices&office_type=11&location=${locationID}`,
        //     getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        // },
        // {
        //     offerName: "Помещение свободного назначения",
        //     baseLink: locationID => `${main}deal_type=rent&engine_version=2&offer_type=offices&office_type=5&location=${locationID}`,
        //     getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        // },
        // {
        //     offerName: "Помещение свободного назначения",
        //     baseLink: locationID => `${main}deal_type=sale&engine_version=2&offer_type=offices&office_type=5&location=${locationID}`,
        //     getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        // },
        // {
        //     offerName: "Готовый бизнес",
        //     baseLink: locationID => `${main}deal_type=sale&engine_version=2&offer_type=offices&office_type=10&location=${locationID}`,
        //     getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        // },
        {
            offerName: "Коммерческая земля",
            baseLink: locationID => `${main}cats%5B0%5D=commercialLandRent&deal_type=rent&engine_version=2&offer_type=offices&location=${locationID}`,
            getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        },
        {
            offerName: "Коммерческая земля",
            baseLink: locationID => `${main}cats%5B0%5D=commercialLandRent&deal_type=sale&engine_version=2&offer_type=offices&location=${locationID}`,
            getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        },
        {
            //legacy-commercial-serp-frontend
            offerName: "Машиноместо",
            baseLink: locationID => `${main}deal_type=rent&engine_version=2&offer_type=offices&office_type=6&location=${locationID}`,
            getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        },
        {
            offerName: "Машиноместо",
            baseLink: locationID => `${main}deal_type=sale&engine_version=2&offer_type=offices&office_type=6&location=${locationID}`,
            getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
        },
    ],
};

module.exports = CianConfig;
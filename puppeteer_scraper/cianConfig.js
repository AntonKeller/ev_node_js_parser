const CommercialConfig = {

    dealTypes: [
        {name: "Sale", desc: "продажа"},
        // {name: "Rent", desc: "аренда"}
    ],

    commercialTypes: {
        elements: [
            {
                name: "офисы", excludeDealType: null,
                key: (deal_type) => `https://www.cian.ru/cat.php?deal_type=${deal_type.toLowerCase()}&engine_version=2&offer_type=offices&office_type=1`,
            },
            // {
            //     name: "торговая площадь", excludeDealType: null,
            //     key: (deal_type) => `https://www.cian.ru/cat.php?deal_type=${deal_type.toLowerCase()}&engine_version=2&offer_type=offices&office_type=2`,
            // },
            // {
            //     name: "склад", excludeDealType: null,
            //     key: (deal_type) => `https://www.cian.ru/cat.php?deal_type=${deal_type.toLowerCase()}&engine_version=2&offer_type=offices&office_type=3`,
            // },
            // {
            //     name: "производственное помещение", excludeDealType: null,
            //     key: (deal_type) => `https://www.cian.ru/cat.php?deal_type=${deal_type.toLowerCase()}&engine_version=2&offer_type=offices&office_type=7`,
            // },
            // {
            //     name: "здания", excludeDealType: null,
            //     key: (deal_type) => `https://www.cian.ru/cat.php?deal_type=${deal_type.toLowerCase()}&engine_version=2&offer_type=offices&office_type=11`,
            // },
            // {
            //     name: "псн.", excludeDealType: null,
            //     key: (deal_type) => `https://www.cian.ru/cat.php?deal_type=${deal_type.toLowerCase()}&engine_version=2&offer_type=offices&office_type=5`,
            // },
            // {
            //     name: "готовый бизнес", excludeDealType: "Rent",
            //     key: (deal_type) => `https://www.cian.ru/cat.php?deal_type=${deal_type.toLowerCase()}&engine_version=2&offer_type=offices&office_type=10`,
            // },
            // {
            //     name: "коммерческая земля/участок", excludeDealType: null,
            //     key: (deal_type) => `https://www.cian.ru/cat.php?cats%5B0%5D=commercialLand${deal_type}&deal_type=${deal_type.toLowerCase()}&engine_version=2&offer_type=offices`,
            // },
            // {
            //     name: "машиноместо/гаражи", excludeDealType: null,
            //     key: (deal_type) => `https://www.cian.ru/cat.php?deal_type=${deal_type.toLowerCase()}&engine_version=2&offer_type=offices&office_type=6`,
            // },
        ]
    },

    config() {

        let resultArray = [];
        for (let el of this.commercialTypes.elements) {
            for (let dealType of this.dealTypes) {

                if (el.excludeDealType === dealType.name) continue;

                resultArray.push({
                    offerName: `${el.name} (${dealType.desc})`,
                    baseLink: locationID => `${el.key(dealType.name)}&location=${locationID}`,
                    getPageStateData: stateObject => stateObject["legacy-commercial-serp-frontend"].find(item => item.key === 'initialState').value.results,
                })

            }
        }

        return resultArray;
    },
}

const FlatConfig = {

    roomCounts: [
        // {num: 1, description: "1-комнатных"},
        // {num: 2, description: "2-комнатных"},
        // {num: 3, description: "3-комнатных"},
        // {num: 4, description: "4-комнатных"},
        {num: 5, description: "5-комнатных"}
    ],

    dealTypes: [
        // {type: "rent", description: "Аренда"},
        {type: "sale", description: "Продажа"}
    ],

    config() {
        let resultArray = [];
        for (let dealT of this.dealTypes) {
            for (let roomC of this.roomCounts) {
                resultArray.push({
                    offerName: `${dealT.description} ${roomC.description} квартир`,
                    baseLink: locationID => `https://www.cian.ru/cat.php?deal_type=${dealT.type}&engine_version=2&offer_type=flat&room${roomC.num}=1&location=${locationID}`,
                    getPageStateData: stateObject => stateObject["frontend-serp"].find(item => item.key === 'initialState').value.results,
                })
            }
        }
        return resultArray;
    },
};

module.exports = {
    CommercialConfig,
    FlatConfig,
};
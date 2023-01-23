const DEAL_TYPE_SALE = "sale";
const DEAL_TYPE_RENT = "rent";
const COUNT_OFFERS_IN_ONE_PAGE = 28;
const COUNT_PAGES_MAX = 54;

const translate = enWord => {
    const data = {
        commercialLandRent: "Коммерческий участок",
        commercialLandSale: "Коммерческий участок",
        office: "Офисное помещение",
        officeRent: "Офисное помещение",
        officeSale: "Офисное помещение",
        warehouse: "Складское помещение",
        warehouseRent: "Складское помещение",
        warehouseSale: "Складское помещение",
        shoppingArea: "Торговая площадь",
        floorSpace: "Торговая площадь",
        garageRent: "Гараж",
        garage: "Гараж",
        garageSale: "Гараж",
        shoppingAreaRent: "Торговая площадь",
        shoppingAreaSale: "Торговая площадь",
        production: "Производство",
        industry: "Производство",
        industryRent: "Производство",
        industrySale: "Производство",
        building: "Здание",
        buildingRent: "Здание",
        buildingSale: "Здание",
        freeAppointment: "Помещение свободного назначения",
        freeAppointmentObjectRent: "Помещение свободного назначения",
        freeAppointmentObjectSale: "Помещение свободного назначения",
        business: "Готовый бизнес",
        businessSale: "Готовый бизнес",
        rent: "аренда",
        sale: "продажа",
        rur: "руб.",
        squareMeter: "за метр",
        all: "за всю площадь",
        included: "включен",
        usn: "УСН",
        notIncluded: "не включен",
        monthly: "ежемесячно",
        annual: "ежегодно",
        longTerm: "на длительный срок",
        fewMonths: "на несколько месяцев",
        central: "центральное",
        autonomous: "автономное",
        ground: "наземная",
        underground: "подземная",
        hectare: "гектар",
        sotka: "сотка",
        multilevel: "Многоуровневая",
    };
    return data[enWord] || enWord;
}

const Offer = {
    keys: {
        number: "№",
        id: "ID предложения",
        cadastralNumber: "Кадастровый номер",
        category: "Категория помещения",
        fullUrl: "Источник",
        description: "Описание",
        creationDate: "Дата публикации",
        offerType: "Тип предложения",
        raion: "Район",
        mikroraion: "Микрорайон",
        okrug: "Округ",
        metro: "Метро",
        address: "Адрес",
        coordinatesLat: "Широта",
        coordinatesLng: "Долгота",
        phoneNumber: "Номер телефона",
        landAreaUnitType: "Единица изм. площади земли",
        landArea: "Площадь земли",
        totalArea: "Площадь м2",
        buildingFloorsCount: "Этажность здания",
        floorNumber: "Этаж",
        buildingClassType: "Класс недвижимости",
        buildingBuildYear: "Год постройки",
        buildingParkingType: "Тип парковки",
        buildingType: "Тип здания",
        buildingMaterialType: "Строительный материал",
        buildingCargoLiftsCount: "Грузовых лифтов, шт.",
        buildingPassengerLiftsCount: "Пассажирских лифтов, шт.",
        buildingHeatingType: "Тип отопления",
        dealType: "Тип сделки",
        currency: "Валюта",
        priceRentWithVat: "Цена аренды (руб/мес. с НДС)",
        priceSaleWithVat: "Цена продажи (руб, с НДС)",
    },

    getKeys() {
        return Object.keys(this.keys).map(e => {
            return {key: e};
        })
    },

    getDescription() {
        return Object.values(this.keys);
    },

    getOffer: (offer, index) => {

        const getPriceWithVat = (priceType, price, vatType, paymentPeriod, totalArea) => {
            let resultPrice = price;
            resultPrice = (paymentPeriod === "annual") ? Math.ceil(resultPrice / 12) : resultPrice;
            resultPrice = (priceType === "squareMeter") ? Math.ceil(resultPrice * totalArea) : resultPrice;
            resultPrice = (vatType === "notIncluded") ? Math.ceil(resultPrice * 1.2) : resultPrice;
            return resultPrice;
        }

        const handleCoordinates = (str, countSymbols) => str.slice(0, countSymbols);

        const handleDate = timestamp => [
            new Date(timestamp * 1000).getDate(),
            new Date(timestamp * 1000).getMonth() || 12,
            new Date(timestamp * 1000).getFullYear(),
        ].join(".")

        // const getTotalPriceRentOrSaleWithVat = (price, vatType) => {
        //     return (vatType === "notIncluded") ? Math.ceil(price * 1.2) : price;
        // }

        const plug = "-";
        const _city = offer.geo.address.filter(e => e.type == "location").map(e => e.fullName).toString();
        const _raion = offer.geo.address.filter(e => e?.type == "raion").map(e => e.name).toString();
        const _metro = offer.geo.address.filter(e => e?.type == "metro").map(e => e.name).toString();
        const _okrug = offer.geo.address.filter(e => e?.type == "okrug").map(e => e.name).toString();
        const _street = offer.geo.address.filter(e => e?.type == "street").map(e => e.fullName).toString();
        const _house = offer.geo.address.filter(e => e?.type == "house").map(e => e.name).toString();
        const _mikroraion = offer.geo.address.filter(e => e?.type == "mikroraion").map(e => e.name).toString();
        const _priceRentWithVat = offer.dealType !== "rent" ? plug : getPriceWithVat(
            offer.bargainTerms?.priceType || "",
            offer.bargainTerms?.price || 0,
            offer.bargainTerms?.vatType || "",
            offer.bargainTerms?.paymentPeriod || "",
            offer.totalArea || 0,
        );
        const _priceSaleWithVat = offer.dealType !== "sale" ? plug : getPriceWithVat(
            offer.bargainTerms?.priceType || "",
            offer.bargainTerms?.price || 0,
            offer.bargainTerms?.vatType || "",
            offer.bargainTerms?.paymentPeriod || "",
            offer.totalArea || 0,
        );

        // --old:
        // priceType: offer.bargainTerms?.priceType || plug,
        // price: offer.bargainTerms?.price || plug,
        // vatPrice: offer.bargainTerms?.vatPrice || plug,
        // vatType: offer.bargainTerms?.vatType || plug,
        // paymentPeriod: offer.bargainTerms?.paymentPeriod || plug,
        // leaseTermType: offer.bargainTerms?.leaseTermType || plug,
        // priceType: "Тип цены",
        // price: "Цена",
        // vatPrice: "Величина НДС",
        // vatType: "Тип НДС",
        // paymentPeriod: "Платежный период",
        // leaseTermType: "Условия аренды",

        const objectReturn = {
            number: 0,
            id: offer?.cianId || plug,
            cadastralNumber: offer.cadastralNumber || plug,
            category: offer.category || plug,
            fullUrl: offer.fullUrl || plug,
            description: offer.description || plug,
            creationDate: handleDate(offer.addedTimestamp) || plug,
            offerType: offer.offerType || plug,
            raion: _raion || plug,
            mikroraion: _mikroraion || plug,
            okrug: _okrug || plug,
            metro: _metro || plug,
            address: `${_city}, ${_street}, ${_house}`,
            coordinatesLat: handleCoordinates(offer.geo?.coordinates?.lat.toString(), 8) || plug,
            coordinatesLng: handleCoordinates(offer.geo?.coordinates?.lng.toString(), 8) || plug,
            phoneNumber: `${offer.phones[0]?.countryCode || plug} ${offer.phones[0]?.number || plug}`,
            landAreaUnitType: offer.land?.areaUnitType || plug,
            landArea: (offer.land?.area || plug).replace(/\./, ','),
            totalArea: (offer.totalArea || plug).replace(/\./, ','),
            buildingFloorsCount: offer.building?.floorsCount || plug,
            floorNumber: offer.floorNumber || plug,
            buildingClassType: offer.building?.classType || plug,
            buildingBuildYear: offer.building?.buildYear || plug,
            buildingParkingType: offer.building?.parking?.type || plug,
            buildingType: offer.building?.type || plug,
            buildingMaterialType: offer.building?.materialType || plug,
            buildingCargoLiftsCount: offer.building?.cargoLiftsCount || plug,
            buildingPassengerLiftsCount: offer.building?.passengerLiftsCount || plug,
            buildingHeatingType: offer.building?.heatingType || plug,
            dealType: offer.dealType || plug,
            currency: offer.bargainTerms?.currency || plug,
            priceRentWithVat: _priceRentWithVat,
            priceSaleWithVat: _priceSaleWithVat,
        }

        for (let k in objectReturn) {
            objectReturn[k] = translate(objectReturn[k]);
        }

        return objectReturn;
    },
};

module.exports = {
    offerKeys: Offer.getKeys(),
    offerDescriptions: Offer.getDescription(),
    getOffer: Offer.getOffer,
    DEAL_TYPE_SALE,
    DEAL_TYPE_RENT,
    COUNT_OFFERS_IN_ONE_PAGE,
    COUNT_PAGES_MAX,
};
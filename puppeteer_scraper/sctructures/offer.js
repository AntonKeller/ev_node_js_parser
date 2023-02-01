const TranslateModule = require("./translateModule")

const DEAL_TYPE_SALE = "sale";
const DEAL_TYPE_RENT = "rent";
const COUNT_OFFERS_IN_ONE_PAGE = 28;
const COUNT_PAGES_MAX = 54;

const whatIsLocation = (addrObject) => {

    let searchStr = addrObject.fullName.toLowerCase();

    if (searchStr.indexOf("область") !== -1) {
        return {
            key: "subject",
            value: addrObject.fullName
        };
    }
    if ((searchStr.indexOf(" округ") !== -1) || (searchStr.indexOf("округ ") !== -1)) {
        return {
            key: "okrug",
            value: addrObject.name
        };
    } else if (searchStr.indexOf("район") !== -1 && searchStr.indexOf("мкр") === -1 && searchStr.indexOf("микро") === -1) {
        return {
            key: "subjectRaion",
            value: addrObject.name
        }
    } else if (searchStr.indexOf("мкр") !== -1) {
        return {
            key: "mikroraion",
            value: addrObject.name
        }
    } else {
        return {
            key: "city",
            value: addrObject.fullName
        }
    }

}

const Offer = {

    keys: {
        number: "№", id: "ID предложения", cadastralNumber: "Кадастровый номер", category: "Категория помещения",
        fullUrl: "Источник", description: "Описание", creationDate: "Дата публикации", offerType: "Тип предложения",
        address: "Полный адрес", subject: "Субъект Федерации", subjectRaion: "Район в регионе", city: "Город",
        okrug: "Округ", raion: "Район в городе", mikroraion: "Микрорайон", metro: "Метро",
        coordinatesLat: "Широта", coordinatesLng: "Долгота", phoneNumber: "Номер телефона",
        landAreaUnitType: "Единица изм. площади земли", landArea: "Площадь земли", totalArea: "Площадь помещения м2",
        buildingFloorsCount: "Этажность здания", floorNumber: "Этаж", buildingClassType: "Класс недвижимости",
        buildingBuildYear: "Год постройки", buildingParkingType: "Тип парковки", buildingType: "Тип здания",
        buildingMaterialType: "Строительный материал", buildingCargoLiftsCount: "Грузовых лифтов, шт.",
        buildingPassengerLiftsCount: "Пассажирских лифтов, шт.", buildingHeatingType: "Тип отопления",
        dealType: "Тип сделки", currency: "Валюта", priceRentWithVat: "Цена аренды (руб/мес. с НДС)",
        priceSaleWithVat: "Цена продажи (руб, с НДС)",
    },

    getKeys() {
        return Object.keys(this.keys).map(key => new Object({key: key}));
    },

    getDescription() {
        return Object.values(this.keys)
    },

    getOffer: offer => {

        const plug = "<><><>";

        const getPriceWithVat = (priceType, price, vatType, paymentPeriod, totalArea) => {
            let resultPrice = price;
            resultPrice = (paymentPeriod === "annual") ? Math.ceil(resultPrice / 12) : resultPrice;
            resultPrice = (priceType === "squareMeter") ? Math.ceil(resultPrice * totalArea) : resultPrice;
            resultPrice = (vatType === "notIncluded") ? Math.ceil(resultPrice * 1.2) : resultPrice;
            return resultPrice;
        }

        const handleDate = timestamp => [
            new Date(timestamp * 1000).getDate(),
            new Date(timestamp * 1000).getMonth() || 12,
            new Date(timestamp * 1000).getFullYear(),
        ].join(".")

        const _address = offer.geo?.address.map(el => el.fullName).join(", ");
        const _raion = offer.geo.address.filter(e => e?.type == "raion").map(e => e.name).toString();
        const _metro = offer.geo.address.filter(e => e?.type == "metro").map(e => e.name).toString();
        const _okrug = offer.geo.address.filter(e => e?.type == "okrug").map(e => e.name).toString();
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

        let buffStructure = {
            number: 0,
            id: offer.cianId || plug,
            cadastralNumber: offer.cadastralNumber || plug,
            category: offer.category || plug,
            fullUrl: offer.fullUrl || plug,
            description: offer.description || plug,
            creationDate: handleDate(offer.addedTimestamp) || plug,
            offerType: offer.offerType || plug,
            address: _address || plug,
            subject: plug, //Субъект Федерации
            subjectRaion: plug, //Район в регионе
            city: plug, //Город
            okrug: _okrug || plug, //Округ
            raion: _raion || plug, //Район в городе
            mikroraion: _mikroraion || plug, //Микрорайон
            metro: _metro || plug, //Метро
            coordinatesLat: offer.geo?.coordinates?.lat.toString().slice(0, 8) || plug,
            coordinatesLng: offer.geo?.coordinates?.lng.toString().slice(0, 8) || plug,
            phoneNumber: `${offer.phones[0]?.countryCode || plug} ${offer.phones[0]?.number || plug}`,
            landAreaUnitType: offer.land?.areaUnitType || plug,
            landArea: (offer.land?.area || plug).replace(/\./, ',') || plug,
            totalArea: (offer.totalArea || plug).replace(/\./, ',') || plug,
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
            priceRentWithVat: _priceRentWithVat || plug,
            priceSaleWithVat: _priceSaleWithVat || plug,
        }

        const buffDataAddress = offer.geo.address.filter(item => item.geoType === "location" && item.type === "location");

        for (let element of buffDataAddress) {
            let location = whatIsLocation(element);
            if (buffStructure[location.key].length <= 2 || buffStructure[location.key] === plug) buffStructure[location.key] = location.value || plug;
        }

        Object.keys(buffStructure).map(key => {
            buffStructure[key] = TranslateModule.translate(buffStructure[key])
        });

        return buffStructure;
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
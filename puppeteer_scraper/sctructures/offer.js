const DEAL_TYPE_SALE = "sale";
const DEAL_TYPE_RENT = "rent";
const COUNT_OFFERS_IN_ONE_PAGE = 28;
const COUNT_PAGES_MAX = 54;

const getOfferStructure = (offer, index, dealType) => {

    let obj = {
        ["№"]: index + 1,
        ["ID предложения"]: String(offer.cianId),
        ["Кадастровый номер здания"]: offer.buildingCadastralNumber || "-",
        ["Ссылка на предложение cian.ru"]: offer.fullUrl,//`https://cian.ru/rent/commercial/${offer.cianId}/`,
        ["Дата публикации"]: offer.added,
        ["Тип предложения"]: offer.offerType,
        ["Полный адрес"]: offer.geo.userInput || "-",
        ["Координаты [Ш,Д]"]: `[${offer.geo.coordinates.lat},${offer.geo.coordinates.lng}]`,
        ["Номер телефона"]: "+" + offer.phones[0].countryCode + offer.phones[0].number,
        ["Общая площадь м2"]: offer.totalArea,
        ["Этажность здания"]: offer.building.floorsCount,
        ["Этаж"]: offer.floorNumber,
        ["Год постройки"]: offer.building.buildYear || "-",
        ["Тип здания"]: offer.building.type || "-",
        ["Строительный материал"]: offer.building.materialType || "-",
        ["Количество грузовых лифтов, шт."]: offer.building.cargoLiftsCount || "-",
        ["Количество пассажирских лифтов, шт."]: offer.building.passengerLiftsCount || "-",
        ["Тип отопления"]: offer.building.heatingType || "-",
        ["Тип сделки"]: dealType == "rent" ? "Аренда" : "Продажа",
    }

    if (offer.bargainTerms.priceType == "all") {
        obj["Стоимость, руб."] = offer.bargainTerms.priceRur;
        obj["Стоимость м2/руб/мес."] = Math.ceil(offer.bargainTerms.priceRur / offer.totalArea);
        obj["Стоимость м2/руб/г."] = Math.ceil((offer.bargainTerms.priceRur / offer.totalArea) * 12);
    }

    if (offer.bargainTerms.priceType == "squareMeter") {
        obj["Стоимость, руб."] = offer.bargainTerms.priceRur * offer.totalArea;
        obj["Стоимость м2/руб."] = offer.bargainTerms.priceRur;
    }

    if (dealType == DEAL_TYPE_RENT) {
        obj["Платежный период"] = offer.bargainTerms.paymentPeriod;
    }

    if (offer.bargainTerms.vatType == "included") {
        obj["НДС"] = "Включен";
    }

    return obj;
}

module.exports = {
    getOfferStructure,
    DEAL_TYPE_SALE,
    DEAL_TYPE_RENT,
    COUNT_OFFERS_IN_ONE_PAGE,
    COUNT_PAGES_MAX,
};
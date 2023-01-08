const responseJsonStructure = (offer, index) => {
    return {
        "№": index + 1,
        "ID предложения": String(offer.cianId),
        "Кадастровый номер здания": offer.buildingCadastralNumber || "-",
        "Ссылка на предложение cian.ru": offer.fullUrl,//`https://cian.ru/rent/commercial/${offer.cianId}/`,
        "Дата публикации": offer.added,
        "Тип предложения": offer.offerType,
        "Тип сделки": offer.dealType == "rent" ? "Аренда" : "/Продажа", //rent/sale
        "Наименование объявления": "",
        "Стоимость": offer.priceTotalPerMonthRur,
        "НДС": offer.vatPriceTotalPerMonthRur == null ? "Без НДС" : offer.vatPriceTotalPerMonthRur,
        "Стоимость за м2": offer.pricePerUnitAreaPerYearRur,
        "Полный адрес": offer.geo.userInput,
        "Координаты": `Широта [${offer.geo.coordinates.lat}] Долгота [${offer.geo.coordinates.lng}]`,
        "Номер телефона": "+" + offer.phones[0].countryCode + offer.phones[0].number,
        "Общая площадь м2": offer.totalArea,
        "Этажность здания": offer.building.floorsCount,
        "Этаж": offer.floorNumber,
        "Год постройки": offer.building.buildYear || "-",
        "Тип здания": offer.building.type || "-",
        "Строительный материал": offer.building.materialType || "-",
        "Количество грузовых лифтов": offer.building.cargoLiftsCount || "-",
        "Количество пассажирских лифтов": offer.building.passengerLiftsCount || "-",
        "Тип отопления": offer.building.heatingType || "-",
    }
}

module.exports = responseJsonStructure;
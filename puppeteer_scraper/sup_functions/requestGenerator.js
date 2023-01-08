async function requestGenerator(dealType = 'rent', location = '1', pageNumber= '1', offerType = 'offices', officeType = '1'){
    const main = 'https://www.cian.ru/cat.php?';
    const dt = `deal_type=${dealType}`; // (rent/sale)
    const ev = '&engine_version=2';
    const loc = `&location=${location}`; // city number 1-Moskow
    const offrt = `&offer_type=${offerType}`; // offer type
    const offst = `&office_type=${officeType}`;
    const p = `&p=${pageNumber}`;
    return `${main}${dt}${ev}${loc}${offrt}${offst}${p}`
}

module.exports = requestGenerator;
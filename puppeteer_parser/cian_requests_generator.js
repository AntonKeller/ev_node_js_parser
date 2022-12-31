const request_params_default = {
    pre_url: 'https://www.cian.ru/cat.php?',
    deal_type: [
        'deal_type=rent', //Аренда
        'deal_type=sale'  //Продажа
    ],
    engine_version: 'engine_version=2', //const
    offer_type: [
        'offer_type=offices',
        'offer_type=flat'
    ],
    office_type: 'office_type=0',
    region: '1', // ID Города
    street: '1351' //ID Улицы
}

function url_generate(params = request_params_default) {
    let array = [];

    for (let i = 0; i < params.deal_type.length; i++)
        for (let j = 0; j < params.offer_type.length; j++)
            for (let k = 1; k <= 5; k++)
                 array.push(`
                 ${params.pre_url}&
                 ${params.deal_type[i]}&
                 ${params.engine_version}&
                 ${params.offer_type[j]}&
                 ${params.office_type}&p=${k}
                 `);
    return array;
}

console.log(url_generate())
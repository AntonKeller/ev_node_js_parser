const osmosis = require('osmosis');

const top = 245;
let errorRequests = [];

for (let i = 0; i < top; i++) {

    let num = '';
    if (i >= 1000) num = i;
    if ((i < 1000) && (i >= 100)) num = `0${i}`;
    if ((i < 100) && (i >= 10)) num = `00${i}`;
    if (i < 10) num = `000${i}`;

    setTimeout(() => {

        osmosis.get(`https://yaroslavl.cian.ru/rent/commercial/28025${num}/`)
            .set({'Title': 'title'})
            .data(data => {
                data.title == 'Ошибка - Циан' ? errorRequests.push(`https://yaroslavl.cian.ru/rent/commercial/28025${num}/`) : console.log(data);
            })

    }, 500);

    if (i == top) console.log('error requests:', errorRequests);
}


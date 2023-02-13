// const isNumber = str => !isNaN(Number("3.0"));
//
// const getNumbers = str => str.split("/").map(el => el.replace(/[^0-9,.]/g, '')).filter(el => el.length > 0)
//     .map(el => el.replace(/\.\./g, "")).map(el => el.replace(/,,/g, ""))

const getNumbers = str => str.replace(/[^0-9,.]/g, '');


// let test_1 = getNumbers("2.3 л / 120 л.с. / Дизель")
// let test_2 = getNumbers("2.7 л / 107 л.с. / Бензин");

let test_11 = getNumbers("112 673 км");
let test_12 = getNumbers("790 000 ₽");


console.log()
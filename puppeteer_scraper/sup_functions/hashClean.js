const hashClean = str => new Promise(async (resolve, reject) => {

    let array = await str.map((el, i) => el.split('&'));

    let result_array = await array.map(box => box.map(el => {

        if ((el.indexOf('%') != -1) && (el.indexOf('=') != -1)) {
            return el.slice(0, el.indexOf('%')) + el.slice(el.indexOf('='), el.length)
        }

        return el;
    }));

    resolve(result_array);
});


module.exports = hashClean;
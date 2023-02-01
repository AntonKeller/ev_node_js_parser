let defineIndexStrOfStr = (
    s = "Красноярский край,  г. Ачинск, ул. Кравченко, д. 7, кв. 82",
    s2 = "АчИнСк"
) => {

    if (s.length <= 0 || s2.length <= 0 || s === " " || s2 === " ") {
        return {
            name: s,
            title: s2,
            rang: 0,
        }
    }

    let s_split = s.toLowerCase().trim().replace(/[^a-zа-яё\s]/gi, '').split(" ");
    let s2_split = s2.toLowerCase().trim().replace(/[^a-zа-яё\s]/gi, '').split(" ");
    let rang = 0;

    for (let el of s_split) {
        if (s2_split.indexOf(el) !== -1) {
            rang++;
        }
    }

    return {
        name: s,
        title: s2,
        rang: rang,
    }
}

module.exports = defineIndexStrOfStr;
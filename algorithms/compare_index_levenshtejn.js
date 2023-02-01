// Расстояние Левенштейна
let compareIndexLevenshtejn = (word1 = "лабрадор", word2 = "Лаборант") => {

    let finalArray = [];
    let firstWord = word1.toLowerCase();
    let secondWord = word2.toLowerCase();
    let firstMax = firstWord.length;
    let secondMax = secondWord.length;

    let fM = (a, b) => a === b ? 0 : 1;

    //set size
    finalArray.length = firstMax + 2;
    for (let i = 0; i < finalArray.length; i++) {
        finalArray[i] = [];
        finalArray[i].length = secondMax + 2;
        finalArray[i].fill(0);
    }

    //set titles horizontal
    for (let i = 0; i < secondWord.length; i++) {
        finalArray[0][i + 2] = secondWord[i];
        finalArray[1][i + 2] = i + 1;
    }

    //set titles vertical
    for (let i = 0; i < firstWord.length; i++) {
        finalArray[i + 2][0] = firstWord[i];
        finalArray[i + 2][1] = i + 1;
    }

    for (let i = 2; i < finalArray.length; i++) {
        for (let j = 2; j < finalArray[i].length; j++) {

            let buff = [
                finalArray[i - 1][j] + 1,
                finalArray[i][j - 1] + 1,
                finalArray[i - 1][j - 1] + fM(finalArray[0][j], finalArray[i][0]),
            ]

            finalArray[i][j] = Math.min(...buff);
        }
    }
    //
    // for (let i = 0; i < finalArray.length; i++) {
    //     for (let j = 0; j < finalArray[i].length; j++) {
    //         finalArray[i][j] = String(finalArray[i][j]);
    //         if ((i === finalArray.length - 1) && (j === finalArray[i].length - 1)) {
    //             finalArray[i][j] = `(${finalArray[i][j]})`;
    //         }
    //     }
    // }
    //
    // console.log("finalArray:\n", finalArray);
    finalArray = finalArray.flat(1);
    console.log("Итог:", finalArray[finalArray.length - 1]);
}

compareIndexLevenshtejn()

module.exports = compareIndexLevenshtejn;





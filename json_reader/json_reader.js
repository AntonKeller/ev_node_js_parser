const fs = require('fs')

const json_writer = (path_file, json) => {
    // fs.writeFileSync('new_xlsx.json', JSON.stringify(xlsx_json));
    fs.writeFileSync(path_file, JSON.stringify(json));
}
//
// let rawdata = fs.readFileSync('../other/xlsx.json');
// let xlsx_json = JSON.parse(rawdata);
// console.log(xlsx_json);
//
//

module.exports = json_writer;
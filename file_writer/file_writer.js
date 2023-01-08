const fs = require('fs')

const json_writer = (path_file, json) => {
    // fs.writeFileSync('new_xlsx.json', JSON.stringify(xlsx_json));
    fs.writeFileSync(path_file, JSON.stringify(json));
}

module.exports = json_writer;
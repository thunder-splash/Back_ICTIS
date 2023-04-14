const xlsx = require("xlsx");

const workbook = xlsx.readFile('Sample.xlsx')
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
let data = xlsx.utils.sheet_to_json(worksheet);

const convertExcelDate = (excelDate) => {
    const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
    return date;
}

const createTable = (sdata) => {
    let table = "<table>";
    table += "<thead><tr>";
    for (let key in sdata[0]) {
        table += `<th>${key}</th>`;
    }
    table += "</tr></thead>";
    table += "<tbody>";
    for (let row of sdata) {
        table += "<tr>";
        for (let key in sdata[0]) {
            let value = row[key] || "";
            if (key === 'BIRTHDATE') {
                value = convertExcelDate(value).toLocaleDateString();
            }
            table += `<td>${value}</td>`;
        }
        table += "</tr>";
    }
    table += "</tbody></table>";

    return table
}

const formatData = (column, cvalue) => {
    var adata = data.filter(function(item) {
        if (column === 'BIRTHDATE') {
            return convertExcelDate(item[column]).toLocaleDateString() && convertExcelDate(item[column]).toLocaleDateString() === cvalue.toString()
        }
        return item[column] && item[column].toString() === cvalue.toString();
    });
    return createTable(adata)
}

class Simplecontroller {
    async getAllTable (req, res) {
        try {
            res.send(createTable(data))
        } catch (e) {
            console.log(e)
        }
    }

    async getFormatizeData (req, res) {
        try {
            res.send(formatData(req.params.column, req.params.cvalue));
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new Simplecontroller()
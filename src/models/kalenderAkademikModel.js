const connection = require("../config/mysql");

const kalenderAkademikModel = {
    findAll: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM kalender_akademik',
            (err, rows) => {
                if (err) {
                    reject(err)
                };
                resolve(rows);
            })
        })
    },
}

module.exports = kalenderAkademikModel
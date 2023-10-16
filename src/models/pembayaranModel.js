const connection = require("../config/mysql");

const pembayaranModel = {
    fetchByNPM: (npm, semester) => {
        const query = `
        SELECT * FROM pembayaran
        WHERE npm = '${npm}'
        AND semester = '${semester}'
        `

        return new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },
}

module.exports = pembayaranModel
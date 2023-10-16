const connection = require("../config/mysql");

const khsModel = {
    findAll: () => {
        const query = `
        SELECT khs.*, matkul.nama_matkul, matkul.semester, matkul.sks
        FROM khs
        INNER JOIN matkul ON khs.kode_matkul=matkul.kode_matkul
        `

        return new Promise((resolve, reject) => {
            connection.query(query,
            (err, rows) => {
                if (err) {
                    reject(err)
                };
                resolve(rows);
            })
        })
    },
    getByNPM: (npm) => {
        const query = `
        SELECT khs.*, matkul.nama_matkul, matkul.semester, matkul.sks
        FROM khs
        INNER JOIN matkul ON khs.kode_matkul=matkul.kode_matkul
        WHERE npm = '${npm}'
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

module.exports = khsModel
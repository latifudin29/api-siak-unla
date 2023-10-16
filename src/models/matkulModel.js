const connection = require("../config/mysql");

const matkulModel = {
    findAll: () => {
        const query = `
        SELECT matkul.*, dosen.nama_dosen, jadwal.*
        FROM matkul
        INNER JOIN dosen ON matkul.nidn=dosen.nidn
        INNER JOIN jadwal ON matkul.id_jadwal=jadwal.id
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
}

module.exports = matkulModel
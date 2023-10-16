const connection = require("../config/mysql");

const krsModel = {
    getByNPM: (npm, semester_krs) => {
        const query = `
            SELECT krs.*, matkul.nama_matkul, matkul.sks, matkul.semester
            FROM krs
            INNER JOIN matkul ON krs.kode_matkul=matkul.kode_matkul
            WHERE npm = '${npm}'
            AND semester_krs = '${semester_krs}'
        `;

        return new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },
    create: (semester_krs, npm, kode_matkul) => {
        const query = `
            INSERT INTO krs 
            (semester_krs, npm, kode_matkul) 
            VALUES 
            ('${semester_krs}', '${npm}', '${kode_matkul}')
        `;

        return new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },
    edit: (semester_krs, npm, status) => {
        return new Promise((resolve, reject) => {
            connection.beginTransaction((err) => {
                if (err) {
                    reject(err);
                    return;
                }
    
                const updateQuery = `
                    UPDATE krs
                    SET 
                    status = '${status}'
                    WHERE semester_krs = '${semester_krs}'
                    AND npm = '${npm}'
                `;
    
                connection.query(updateQuery, (updateErr, updateResult) => {
                    if (updateErr) {
                        connection.rollback(() => {
                            reject(updateErr);
                        });
                    } else if (status != 'pending'){
                        const insertQuery = `
                            INSERT INTO khs (semester_khs, npm, kode_matkul)
                            SELECT semester_krs, npm, kode_matkul
                            FROM krs
                            WHERE semester_krs = '${semester_krs}'
                            AND npm = '${npm}'
                        `;
    
                        connection.query(insertQuery, (insertErr, insertResult) => {
                            if (insertErr) {
                                connection.rollback(() => {
                                    reject(insertErr);
                                });
                            } else {
                                connection.commit((commitErr) => {
                                    if (commitErr) {
                                        connection.rollback(() => {
                                            reject(commitErr);
                                        });
                                    } else {
                                        resolve(updateResult);
                                    }
                                });
                            }
                        });
                    }
                });
            });
        });
    },
    delete: (semester_krs, npm, kode_matkul) => {
        const query = `
            DELETE FROM krs WHERE semester_krs = ${semester_krs} AND npm = ${npm} AND kode_matkul = ${kode_matkul}
        `;

        return new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
};

module.exports = krsModel;

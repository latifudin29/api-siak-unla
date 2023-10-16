const connection = require("../config/mysql")

const mahasiswaModel = {
    findAll: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM mahasiswa',
            (err, rows) => {
                if (err) {
                    reject(err)
                };
                resolve(rows);
            })
        })
    },
    findByNPM: (npm) => {
        const query = `
        SELECT mahasiswa.*, dosen.nama_dosen, fakultas.nama_fakultas, prodi.nama_prodi, kelas.nama_kelas
        FROM mahasiswa
        INNER JOIN dosen ON mahasiswa.dosen_wali=dosen.nidn
        INNER JOIN fakultas ON mahasiswa.id_fakultas=fakultas.id
        INNER JOIN prodi ON mahasiswa.id_prodi=prodi.id
        INNER JOIN kelas ON mahasiswa.id_kelas=kelas.id
        WHERE npm = '${npm}'
        `
        return new Promise((resolve, reject) => {
            connection.query(query,
            (err, rows) => {
                if (err) {
                    reject(err)
                };
                resolve(rows[0]);
            })
        })
    },
    findGender: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM jenis_kelamin',
            (err, rows) => {
                if (err) {
                    reject(err)
                };
                resolve(rows);
            })
        })
    },
    create: (npm, password, nama_mahasiswa, jenis_kelamin, tempat_lahir, tanggal_lahir, telepon, alamat, foto, dosen_wali, id_fakultas, id_prodi, id_kelas, tahun_masuk, semester, status) => {
        const query = `
            INSERT INTO mahasiswa 
            (npm, password, nama_mahasiswa, jenis_kelamin, tempat_lahir, tanggal_lahir, telepon, alamat, foto, dosen_wali, id_fakultas, id_prodi, id_kelas, tahun_masuk, semester, status) 
            VALUES 
            ('${npm}', '${password}', '${nama_mahasiswa}', '${jenis_kelamin}', '${tempat_lahir}', '${tanggal_lahir}', '${telepon}', '${alamat}', '${foto}', '${dosen_wali}', '${id_fakultas}', '${id_prodi}', '${id_kelas}', '${tahun_masuk}', '${semester}', '${status}')
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
    updateProfile: (npm, nama_mahasiswa, jenis_kelamin, tempat_lahir, tanggal_lahir, telepon, alamat) => {
        const query = `
            UPDATE mahasiswa 
            SET
            nama_mahasiswa = '${nama_mahasiswa}', jenis_kelamin = '${jenis_kelamin}', tempat_lahir = '${tempat_lahir}', tanggal_lahir = '${tanggal_lahir}', telepon = '${telepon}', alamat = '${alamat}'
            WHERE npm = '${npm}'
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
    updatePhoto: (npm, foto) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE mahasiswa SET foto = '${foto}' WHERE npm = '${npm}'`,
            (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows);
            })
        })
    },
    updatePassword: (npm, newHashPassword) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE mahasiswa SET password = '${newHashPassword}' WHERE npm = '${npm}'`,
            (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows);
            })
        })
    },
}

module.exports = mahasiswaModel
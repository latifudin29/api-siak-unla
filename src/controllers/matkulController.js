const matkulModel = require("../models/matkulModel")

const matkulController = {
    fetchMatkul: async(req, res) => {
        try {
            const matkul = await matkulModel.findAll()
            res.json({
                "success": true,
                "message": "Berhasil menampilkan data",
                "data": matkul
            })
        } catch (error) {
            console.error(error);
            res.json({
                "success": false,
                "message": "Gagal menampilkan data",
            });
        }
    },
}

module.exports = matkulController
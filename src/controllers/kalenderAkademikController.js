const kalenderAkademikModel = require("../models/kalenderAkademikModel")

const kalenderAkademikController = {
    fetchKalender: async(req, res) => {
        try {
            const kalender = await kalenderAkademikModel.findAll()
            res.json({
                "success": true,
                "message": "Berhasil menampilkan data",
                "data": kalender
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

module.exports = kalenderAkademikController
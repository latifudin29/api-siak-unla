const pembayaranModel = require("../models/pembayaranModel");

const pembayaranController = {
    fetchPembayaran: async (req, res) => {
        try {
            const npm = req.params.npm;
            const semester = req.query.semester;
            const pembayaran = await pembayaranModel.fetchByNPM(npm, semester);
            if (pembayaran.length == 0) {
                res.json({
                    "success": false,
                    "message": "Data pembayaran kosong",
                });
            } else {
                res.json({
                    "success": true,
                    "message": "Berhasil menampilkan data",
                    "data": pembayaran
                });
            }
        } catch (error) {
            console.error(error);
            res.json({
                "success": false,
                "message": "Gagal menampilkan data",
            });
        }
    },
}

module.exports = pembayaranController
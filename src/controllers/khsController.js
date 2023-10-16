const khsModel = require("../models/khsModel");

const khsController = {
    fetchKHS: async(req, res) => {
        try {
            const khs = await khsModel.findAll()
            if (khs.length == 0) {
                res.json({
                    "success": false,
                    "message": "Data KHS kosong",
                });
            } else {
                res.json({
                    "success": true,
                    "message": "Berhasil menampilkan data",
                    "data": khs
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
    fetchKHSByNPM: async (req, res) => {
        try {
            const npm = req.params.npm;
            const khs = await khsModel.getByNPM(npm);
            if (khs.length == 0) {
                res.json({
                    "success": false,
                    "message": "Data KHS kosong",
                });
            } else {
                res.json({
                    "success": true,
                    "message": "Berhasil menampilkan data",
                    "data": khs
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

module.exports = khsController
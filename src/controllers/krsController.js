const krsModel = require("../models/krsModel");

const krsController = {
    getKRSByNPM: async (req, res) => {
        try {
            const npm = req.params.npm;
            const semester_krs = req.query.semester_krs
            const result = await krsModel.getByNPM(npm, semester_krs);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    createKRS: async (req, res) => {
        try {
            const { semester_krs, npm, kode_matkul } = req.body;
            const result = await krsModel.create(semester_krs, npm, kode_matkul);
            res.status(201).json({ success: true, message: 'KRS Berhasil disimpan', data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    editKRS: async (req, res) => {
        try {
            const npm = req.params.npm;
            const { semester_krs, status } = req.body;
            const result = await krsModel.edit(semester_krs, npm, status);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    deleteKRS: async (req, res) => {
        try {
            const kode_matkul = req.params.kode_matkul;
            const semester_krs= req.query.semester_krs;
            const npm = req.query.npm;
            const result = await krsModel.delete(semester_krs, npm, kode_matkul);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};

module.exports = krsController;

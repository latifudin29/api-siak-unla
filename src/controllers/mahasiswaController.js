const mahasiswaModel = require("../models/mahasiswaModel")
const bcrypt = require('bcrypt')
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = 'photo' + Date.now();
        cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage: storage });

const mahasiswaController = {
    fetchMahasiswa: async(req, res) => {
        try {
            const mahasiswa = await mahasiswaModel.findAll()
            res.json({
                "success": true,
                "message": "Berhasil menampilkan data",
                "data": mahasiswa
            });
        } catch (error) {
            console.error(error);
            res.json({
                "success": false,
                "message": "Gagal menampilkan data",
            });
        }
    },
    fetchGender: async(req, res) => {
        try {
            const gender = await mahasiswaModel.findGender()
            res.json({
                "success": true,
                "message": "Berhasil menampilkan data",
                "data": gender
            });
        } catch (error) {
            console.error(error);
            res.json({
                "success": false,
                "message": "Gagal menampilkan data",
            });
        }
    },
    fetchByNPM: async(req, res) => {
        const npm = req.params.npm;
        try {
            const mahasiswa = await mahasiswaModel.findByNPM(npm)
            res.json({
                "success": true,
                "message": "Berhasil menampilkan data",
                "data": mahasiswa
            });
        } catch (error) {
            console.error(error);
            res.json({
                "success": false,
                "message": "Gagal menampilkan data",
            });
        }
    },
    register: async (req, res) => {
        const {npm, password, nama_mahasiswa, jenis_kelamin, tempat_lahir, tanggal_lahir, telepon, alamat, foto, dosen_wali, id_fakultas, id_prodi, id_kelas, tahun_masuk, semester, status} = req.body
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        
        try {
            await mahasiswaModel.create(
                npm, hashPassword, nama_mahasiswa, jenis_kelamin, tempat_lahir, tanggal_lahir, telepon, alamat, foto, dosen_wali, id_fakultas, id_prodi, id_kelas, tahun_masuk, semester, status
            )
            res.json({
                "success": true,
                "message": "Berhasil register"
            });
        } catch (error) {
            console.error(error);
            res.json({
                "success": false,
                "message": "Gagal register",
            });
        }
    },
    login: async (req, res) => {
        const { npm, password } = req.body;
        try {
            const mahasiswa = await mahasiswaModel.findByNPM(npm);
            if (!mahasiswa) return res.json({ "success": false, "message": "NPM salah!" });

            const match = await bcrypt.compare(password, mahasiswa.password);
            if (!match) return res.json({ "success": false, "message": "Password salah!" });

            res.json({
                "success": true,
                "message": "Berhasil login",
                "data": mahasiswa,
            });
        } catch (error) {
            console.error(error);
            res.json({
                "success": false,
                "message": "Gagal login",
            });
        }
    },
    editProfile: async (req, res) => {
        const { npm } = req.params;
        const { nama_mahasiswa, jenis_kelamin, tempat_lahir, tanggal_lahir, telepon, alamat} = req.body 
        try {
            await mahasiswaModel.updateProfile(
                npm, nama_mahasiswa, jenis_kelamin, tempat_lahir, tanggal_lahir, telepon, alamat
                )
            const mahasiswa = await mahasiswaModel.findByNPM(npm)
            res.json({
                "success": true,
                "message": "Berhasil update profil",
                "data": mahasiswa,
            });
        } catch (error) {   
            console.error(error);
            res.json({
                "success": false,
                "message": "Gagal update profil",
            });
        }
    },
    changePhoto: upload.single('foto'),
    updatePhoto: async (req, res) => {
        try {
        const { npm } = req.params;
        const foto = req.file.filename;

        const mahasiswa = await mahasiswaModel.findByNPM(npm);
        if (!mahasiswa) {
            return res.status(404).json({ success: false, message: 'Mahasiswa tidak ditemukan' });
        }

        if (mahasiswa.foto) {
            const fotoSebelumnyaPath = path.join('./src/uploads', mahasiswa.foto);

            fs.unlinkSync(fotoSebelumnyaPath);
        }

        await mahasiswaModel.updatePhoto(npm, foto);

        res.json({ success: true, message: 'Foto berhasil diubah' });
        } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan saat mengubah foto' });
        }
    },
    changePassword: async (req, res) => {
        const { npm } = req.params;
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.json({ success: false, message: 'Konfirmasi password tidak sesuai!' });
        }

        const mahasiswa = await mahasiswaModel.findByNPM(npm);
            if (!mahasiswa) return res.json({ "success": false, "message": "Mahasiswa tidak ditemukan!" });

        const match = await bcrypt.compare(oldPassword, mahasiswa.password);
            if (!match) return res.json({ "success": false, "message": "Password lama salah!" });

        const salt = await bcrypt.genSalt();
        const newHashPassword = await bcrypt.hash(newPassword, salt);
    
        try {
            await mahasiswaModel.updatePassword(npm, newHashPassword);
            res.json({
                "success": true,
                "message": "Berhasil update Password"
            });
        } catch (error) {
            console.error(error);
            res.json({
                "success": false,
                "message": "Gagal update password",
            });
        }
    },
    
}

module.exports = mahasiswaController
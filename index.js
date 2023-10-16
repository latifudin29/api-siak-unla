const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const port = 3000
dotenv.config()

const mahasiswaController = require('./src/controllers/mahasiswaController')
const matkulController = require('./src/controllers/matkulController')
const krsController = require('./src/controllers/krsController')
const khsController = require('./src/controllers/khsController')
const kalenderAkademikController = require('./src/controllers/kalenderAkademikController')
const pembayaranController = require('./src/controllers/pembayaranController')

const { fetchMahasiswa, fetchByNPM, fetchGender, register, login, editProfile, changePhoto, updatePhoto, changePassword } = mahasiswaController
const { fetchMatkul } = matkulController
const { getKRSByNPM, createKRS, editKRS, deleteKRS } = krsController
const { fetchKHS, fetchKHSByNPM } = khsController
const { fetchKalender } = kalenderAkademikController
const { fetchPembayaran } = pembayaranController

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/mahasiswa', fetchMahasiswa)
app.post('/register', register)
app.post('/login', login)
app.put('/update/:npm', editProfile)
app.get('/get/:npm', fetchByNPM)
app.get('/gender', fetchGender)
app.put('/changePhoto/:npm', changePhoto, updatePhoto)
app.put('/changePassword/:npm', changePassword)

app.get('/matkul', fetchMatkul)

app.get('/kalender', fetchKalender)

app.get('/pembayaran/:npm', fetchPembayaran)

app.get('/krs/:npm', getKRSByNPM)
app.post('/krs', createKRS)
app.put('/krs/:npm', editKRS)
app.delete('/krs/:kode_matkul', deleteKRS)

app.get('/khs', fetchKHS)
app.get('/khs/:npm', fetchKHSByNPM)

app.listen(port, () => console.log(`Server berjalan di port ${port}!`))
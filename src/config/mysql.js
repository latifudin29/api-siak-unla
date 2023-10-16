const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  dateStrings: true,
})

connection.connect(function(error){
  if(error){
    console.log(error);
  }else{
    console.log('Koneksi Berhasil!');
  }
})

module.exports = connection;
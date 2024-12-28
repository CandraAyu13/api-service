const mysql = require('mysql2')

const db = mysql.createConnection({
  host: "29ou2.h.filess.io",
  port: "3307",
  user: "candraProject_outsideoil",
  password: "054272ebf93efbb0b6560cb554f69fb1bd916b04",
  database: "candraProject_outsideoil"
})

module.exports = db

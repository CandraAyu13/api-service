const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");
const cors = require("cors");

// routes / URL / enpoint utama method GET

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  response(200, "API v1 ready to go", "SUCCES", res);
});

// select all data
app.get("/client", (req, res) => {
  const sql = "SELECT * FROM contact";
  db.query(sql, (error, result) => {
    if (error) throw error;
    response(200, result, "get all data from client", res);
  });
});

// select one data
app.get("/client/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT nama FROM contact WHERE id = ${id}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    response(200, result, "get name client", res);
  });
});

// insert data
app.post("/client", (req, res) => {
  const { nama, email, keterangan } = req.body;
  if (nama !== "" && email !== "" && keterangan !== "") {
    const sql = `INSERT INTO contact (nama, email, pesan) VALUES ('${nama}', '${email}', '${keterangan}')`;
    db.query(sql, (error, result) => {
      if (error) response(500, "Phone Number or Email Already Exist", "Error", res);
      if (result?.affectedRows) {
        response(200, result.insertId, "Data added successfuly", res);
      }
    });
  } else {
    response(500, "Do not null", "Error", res)
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

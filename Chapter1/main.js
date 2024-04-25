const express = require("express");
const mariadb = require("mariadb");

const app = express();
const port = 3000;

app.use(express.json());

const { json } = express.json();

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cobacoba",
  connectionLimit: 5,
});

app.get("/", (_req, res) => {
  res.send("HELLO WORLD");
});

app.get("/user", async (_req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const user = await conn.query("SELECT * FROM user");
    res.json({
      status: "success",
      message: "Berhasil diakses",
      user,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/user", async (req, res) => {
  const { nama, password, email } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("INSERT INTO user (nama, password , email) VALUES (?, ?, ?)", [nama, password, email]);
    res.json({
      status: "success",
      message: "data berhasil ditambah",
      user: {
        nama,
        password,
        email,
      },
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log("example app listening on port : " + port);
});

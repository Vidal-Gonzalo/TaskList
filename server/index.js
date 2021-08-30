require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: process.env.MYSQL_USER,
  host: process.env.HOST,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "¡Nombre de usuario y/o contraseña incorrectos!" });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("Conexión realizada");
});

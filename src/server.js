const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");
const app = express();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const PORT = process.env.PORT || 3000;

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../app.js"));
app.use(bodyParser.urlencoded({ extended: false }));
//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  req.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "dante",
  password: "Etnad.h75",
  database: "task"
});
app.listen(PORT, () => {
  console.log("app running on port", { PORT });
});

require("./routes/html-routes")(app, connection);
require("./routes/addTask")(app, connection);
require("./routes/deleteTask")(app, connection);
require("./routes/signUp")(app, connection);
require("./routes/signIn")(app, connection);

function findUser(req, res, next) {
  const { email, password } = req.query;

  connection.query(
    `SELECT username,password from users where email= (?)`,
    email,
    (err, rows) => {
      for (var i in rows) {
        const hash = rows[i].password;
        const user = rows[i].username;

        bcryptjs.compare(password, hash, function(err, res) {
          console.log("findeuser function= ", res);
          req.found = res;
          next();
        });
      }
    }
  );
}

app.post("/login", findUser, (req, res) => {
  const { email } = req.query;

  console.log("email= ", email);

  const found = req.found;
  console.log("finduser route=", found);
  if (found) {
    var token = jwt.sign({ email }, "Secret Password", {
      expiresIn: "1sec"
    });
    jwt.verify(token, "Secret Password", function(err, decoded) {});
    console.log("token= ", token);
    res.send({ token });
  } else {
    res.send({ token: "token no valido" });
  }
  if (decoded) {
    console.log(decoded);
  } else {
    console.log(err);
  }
});

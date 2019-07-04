const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");
const app = express();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const fs = require("fs");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../app.js"));
app.use(bodyParser.urlencoded({ extended: false }));
//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser());
const connection = mysql.createConnection({
  host: "localhost",
  user: "dante",
  password: "Etnad.h75",
  database: "task"
});
app.listen(PORT, () => {
  console.log("app running on port", { PORT });
});
const privateKEY = fs.readFileSync("./routes/private.key", "utf8");
const publicKEY = fs.readFileSync("./routes/public.key", "utf8");
const i = "Dante :D"; // Issuer
const a = "http://task-manager.com"; // Audience

const signOptions = {
  issuer: i,
  audience: a,
  expiresIn: "1h",
  algorithm: "RS256"
};
const veryOptions = {
  issuer: i,
  audience: a,
  expiresIn: "1h",
  algorithm: ["RS256"]
};

const findUser = function(req, res, next) {
  const { email, password } = req.query;
  console.log("findUser email", email);
  connection.query(
    `SELECT user_id,username,password from users where email= (?)`,
    email,
    (err, rows) => {
      if (rows == "") {
        req.found = false;
        next();
      } else {
        for (const i in rows) {
          const hash = rows[i].password;
          const user = rows[i].username;
          const id = rows[i].user_id;
          bcryptjs.compare(password, hash, function(err, res) {
            console.log("findeuser function= ", res);
            req.username = user;
            req.id = id;
            console.log("found user=", req.username);
            req.found = res;
            next();
          });
        }
      }
    }
  );
};

const getUsername = function(req, res, next) {
  const id = req.cookies.id;
  connection.query(
    `SELECT username FROM users WHERE user_id= (?)`,
    id,
    (err, res) => {
      req.user = res[0].username;
      console.log("user function=", req.user);

      next();
    }
  );
};
const verifyToken = function(req, res, token) {
  const legit = jwt.verify(token, publicKEY, veryOptions);
  console.log("verifyToken function= ", legit);
  if (typeof legit === undefined) {
    req.verified = false;
  } else {
    req.verified = true;
  }
};

require("./routes/html-routes")(app, getUsername, connection, verifyToken);
require("./routes/addTask")(app, connection, verifyToken, findUser);
require("./routes/verifyUser")(app, verifyToken);
require("./routes/deleteTask")(app, connection, verifyToken);
require("./routes/logOut")(app);
require("./routes/login")(app, findUser, privateKEY, signOptions);
require("./routes/signUp")(app, findUser, connection, privateKEY, signOptions);

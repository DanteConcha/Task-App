const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");
const app = express();
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
require("./routes/html-routes")(app, connection);

app.listen(PORT, () => {
  console.log("app running on port", { PORT });
});

app.post("/task/add", (req, res) => {
  const { tittle, responsible, description, priority } = req.query;
  const INSERT_TASK_QUERY =
    "INSERT INTO task (tittle,responsible,description,priority) VALUES (?)";
  let values = [tittle, responsible, description, priority];
  connection.query(INSERT_TASK_QUERY, [values], (err, results) => {
    err ? res.send(err, "chale") : res.send("se agrego a db task");
  });
});

app.post("/task/delete", (req, res) => {
  const { id } = req.query;
  const DELETE_TASK_QUERY = "delete from task where id= (?)";
  let values = [id];
  connection.query(DELETE_TASK_QUERY, [values], (err, results) => {
    err ? res.send(err, "chale") : res.send("se elimino");
  });
});

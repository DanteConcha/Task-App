module.exports = function(app, connection, verifyToken, findUser) {
  app.post("/task/add", (req, res) => {
    findUser(req, res);
    const { tittle, responsible, description, priority } = req.query;
    const id = req.cookies.id;
    console.log("add id= ", id);
    const token = req.cookies.cookie.replace("cookie=", "");
    verifyToken(req, res, token);
    const verified = req.verified;
    if (verified) {
      console.log(verified);
      const INSERT_TASK_QUERY =
        "INSERT INTO task (tittle,responsible,description,priority,users_id) VALUES (?)";
      let values = [tittle, responsible, description, priority, id];
      connection.query(INSERT_TASK_QUERY, [values], (err, results) => {
        err ? res.send(err, "chale") : res.send("se agrego a db task");
      });
    } else {
      console.log(verified);
    }
  });
};

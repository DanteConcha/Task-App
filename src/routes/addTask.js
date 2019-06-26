module.exports = function(app, connection) {
  app.post("/task/add", (req, res) => {
    const { tittle, responsible, description, priority } = req.query;
    const INSERT_TASK_QUERY =
      "INSERT INTO task (tittle,responsible,description,priority) VALUES (?)";
    let values = [tittle, responsible, description, priority];
    connection.query(INSERT_TASK_QUERY, [values], (err, results) => {
      err ? res.send(err, "chale") : res.send("se agrego a db task");
    });
  });
};

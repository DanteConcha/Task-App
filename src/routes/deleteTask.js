module.exports = function(app, connection) {
  app.post("/task/delete", (req, res) => {
    const { id } = req.query;
    const DELETE_TASK_QUERY = "delete from task where id= (?)";
    let values = [id];
    connection.query(DELETE_TASK_QUERY, [values], (err, results) => {
      err ? res.send(err, "chale") : res.send("se elimino");
    });
  });
};

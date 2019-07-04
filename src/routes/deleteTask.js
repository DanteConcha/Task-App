module.exports = function(app, connection, verifyToken) {
  app.post("/task/delete", (req, res) => {
    const { id } = req.query;
    const DELETE_TASK_QUERY = "delete from task where id= (?) ";
    const token = req.cookies.cookie.replace("cookie=", "");
    verifyToken(req, res, token);
    const verified = req.verified;
    let values = [id];
    if (verified) {
      console.log("si jala el delete= ", id);
      connection.query(DELETE_TASK_QUERY, [values], (err, results) => {
        err ? res.send(err, "chale") : res.send("se elimino");
      });
    } else {
      console.log("no jala");
    }
  });
};

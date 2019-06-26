module.exports = function(app, connection) {
  app.get("/task", function(req, res) {
    connection.query("SELECT * FROM task", function(err, data) {
      err ? res.send(err) : res.json({ db: data });
    });
  });
};

module.exports = function(app, getUsername, connection, verifyToken) {
  app.get("/task", getUsername, (req, res) => {
    const user = req.user;
    console.log("user=", user);

    const token = req.cookies.cookie.replace("cookie=", "");
    console.log("token html routes= ", token);
    verifyToken(req, res, token);
    const verified = req.verified;
    console.log("html routes verify=", verified);
    if (verified) {
      const id = req.cookies.id;
      console.log(id);
      const values = [id];
      connection.query(
        "SELECT tittle,responsible,description,priority,id FROM task where users_id= (?)",
        [values],
        function(err, data) {
          err ? res.send(err) : res.json({ db: data, user: user });
        }
      );
    } else {
      console.log(verified);
    }
  });
};

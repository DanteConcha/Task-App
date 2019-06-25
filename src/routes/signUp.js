module.exports = function(app, connection) {
  app.post("/signUp", (req, res) => {
    const { email, password, username } = req.query;
    bcryptjs.hash(password, 10, function(err, hash) {
      // Store hash in database
      let values = [email, hash, username];
      const SIGN_UP_QUERY =
        "INSERT INTO users (email,password,username) VALUES (?)";
      connection.query(SIGN_UP_QUERY, [values], (err, results) => {
        err ? res.send(err, "chale") : res.send("se elimino");
      });
    });
  });
};

const bcryptjs = require("bcryptjs");

module.exports = function(app, connection) {
  app.post("/signIn", (req, res) => {
    const { email, password } = req.query;
    const GET_PASSWORD_QUERY = `SELECT password,username from users where email= (?)`;
    connection.query(GET_PASSWORD_QUERY, email, (err, rows) => {
      if (err) throw err;

      for (var i in rows) {
        const hash = rows[i].password;
        const user = rows[i].username;
        console.log(hash);

        bcryptjs.compare(password, hash, function(err, res) {
          console.log(res);
          console.log(user);
        });
      }
    });
  });
};

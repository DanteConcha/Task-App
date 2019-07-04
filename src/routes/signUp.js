const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
module.exports = function(app, findUser, connection, privateKEY, signOptions) {
  app.get("/signUp", findUser, (req, res) => {
    const { username, email, password } = req.query;
    const found = req.found;
    if (found) {
      res.send("nelson");
    } else {
      bcryptjs.hash(password, 10, function(err, hash) {
        let values = [email, hash, username];
        const SIGN_UP_QUERY =
          "INSERT INTO users (email,password,username) VALUES (?)";
        connection.query(SIGN_UP_QUERY, [values], (err, results) => {});

        connection.query(
          `SELECT user_id FROM users WHERE email= (?)`,
          email,
          (err, ressults) => {
            req.id = ressults[0].user_id;
            console.log("id function=", req.id);
            const token = jwt.sign({ email }, privateKEY, signOptions);
            res.cookie("cookie", token, { httpOnly: true });
            res.cookie("id", req.id, { httpOnly: true });
            res.end("signed up :v");
          }
        );
      });
    }
  });
};

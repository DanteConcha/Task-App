const jwt = require("jsonwebtoken");
module.exports = function(app, findUser, privateKEY, signOptions) {
  app.get("/login", findUser, (req, res) => {
    const { email } = req.query;
    const found = req.found;

    if (found) {
      const token = jwt.sign({ email }, privateKEY, signOptions);
      console.log("simon");
      res.cookie("cookie", token, { httpOnly: true });
      res.cookie("id", req.id, { httpOnly: true });
      res.end("khe");
    } else {
      res.send({ token: "token no valido" });
    }
  });
};

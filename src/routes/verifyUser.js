module.exports = function(app, verifyToken) {
  app.get("/verify", (req, res) => {
    console.log(req.cookies.cookie);
    const token = req.cookies.cookie.replace("cookie=", "");
    verifyToken(req, res, token);
    const verified = req.verified;
    res.send({ verified });
  });
};

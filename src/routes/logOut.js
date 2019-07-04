module.exports = function(app) {
  app.get("/logOut", (req, res) => {
    res.clearCookie("cookie");
    res.clearCookie("id");
    res.end("succesful");
  });
};

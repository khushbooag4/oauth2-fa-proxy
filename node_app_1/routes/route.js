var router = require("express").Router();

router.get("/", (req, res) => {
  res.send(
    "<h1>Node Application 1</h1>" + "<h2>" + req.oidc.isAuthenticated()
      ? "Logged in"
      : "Logged out" + "</h2>"
  );
});

module.exports = router;

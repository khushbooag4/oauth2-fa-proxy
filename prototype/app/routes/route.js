var router = require("express").Router();

router.get("/", (req, res) => {
  res.send(
    "<h1>Node Application 1</h1>" + "<h2>" + req.oidc.isAuthenticated()
      ? "Logged in"
      : "Logged out" + "</h2>"
  );
});

// When this server gets an API call in '/greet' endpoint,
// it will call the 'AuthenticateAccessToken' function.
// After successful authentication, the 3rd parameter in app.get()
// i.e, the anonymous function, will get executed.
router.get("/greet", AuthenticateAccessToken, (req, res) => {
  res.json({ message: "Whola...you are authorized to access this API" });
});

function AuthenticateAccessToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.json({ message: "Invalid access token" });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.json({ message: "Some error occured" });
      } else {
        next();
      }
    });
  }
}

module.exports = router;

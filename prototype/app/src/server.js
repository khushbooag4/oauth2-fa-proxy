const express = require("express");
const path = require("path");
var session = require("express-session");
const app = express();
const port = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", {
    status: "Logged In",
  });
});

app.get("/idToken", (req, res) => {
  res.send(
    "Id Token" +
    req.oidc.idToken +
    "Id Claims" +
    JSON.stringify(req.oidc.idTokenClaims, null, 2)
  );
});

app.get("/callback", (req, res) => {
  console.log(req.oidc);
});

app.get("/user", (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

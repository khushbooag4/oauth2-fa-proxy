const express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");
const dotenv = require("dotenv").config();
const path = require("path");
var session = require("express-session");
const app = express();
const port = 3002;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "fusionauth",
    resave: false,
    saveUninitialized: true,
  })
);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "kZ7J1JkxwfzhZHjwaYXtcAlZMS9l1rAjxd7-6CRKaoA",
  baseURL: "http://localhost:3001",
  clientID: "619b9903-0a5a-41f3-9183-6380df21e254",
  issuerBaseURL: "http://localhost:9011",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", {
    status: req.oidc.isAuthenticated() ? "Looged In" : "Logged Out",
  });
});

app.get("/idToken", requiresAuth(), (req, res) => {
  res.send(
    "Id Token" +
      req.oidc.idToken +
      "Id Claims" +
      JSON.stringify(req.oidc.idTokenClaims, null, 2)
  );
});

app.get("/callback", (req, res) => {
  console.log(req.query.err);
});
app.get("/user", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

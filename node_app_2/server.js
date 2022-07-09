const express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");
const dotenv = require("dotenv").config();
const path = require("path");
var session = require("express-session");
var jwt = require("jsonwebtoken");
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
  authRequired: true,
  auth0Logout: false,
  secret: "40JGJMspPGp2q3VaTGj5pOLbmjHrkGu7QOVIXJHaheg",
  baseURL: "http://localhost:3002",
  clientID: "094469e3-23a0-4624-b176-c4d78c9adb2a",
  issuerBaseURL: "https://fa-op.chakshu-rd.samagra.io/",
  clientSecret: "40JGJMspPGp2q3VaTGj5pOLbmjHrkGu7QOVIXJHaheg",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged In" : "Logged Out");
});

app.get("/oauth2/callback", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.render("index", {
      status: "User Authenticated Successfully",
    });
  } else {
    res.send("Server Error");
  }
});

app.get("/user", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

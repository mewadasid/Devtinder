const express = require("express");

const { userAuth } = require("./middleware/auth");

const app = express();

app.use("/admin", (req, res, next) => {
  const token = "Sids";
  const isAuthorized = token === "Sid";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized user");
  } else {
    next();
  }
});

app.get("/user/login", (req, res) => {
  res.send("User Logged in successfully");
});

app.get("/user/getUser", userAuth, (req, res) => {
  res.send("User data sended.");
});

app.get("/admin/getData", (req, res) => {
  res.send("All admin data sended..");
});

app.listen(3000, () => {
  console.log("Server listing on port 3000");
});

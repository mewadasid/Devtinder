const express = require("express");

const app = express();

// ':' indicate dynamic route
app.get("/user/:userID", (req, res) => {
  console.log("req.query", req.query); //Req.query means passing query parmas using ? in url
  console.log("req.params", req.params); // req.params means passing dynamic route using /: in url it will /user/101
  res.send({ firstname: "Siddharth", lastname: "Pandya" });
});

app.post("/user", (req, res) => {
  res.send("User Info Updated Sucessfully.");
});

// The app.use() accept all https method get post put etc so it send same for all http method
// app.use("/test", (req, res) => {
//   res.send("Hello From Server...");
// });

app.listen(3000, () => {
  console.log("Server listing on port 3000");
});

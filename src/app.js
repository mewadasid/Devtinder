const express = require("express");
const { connectDatabase } = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

connectDatabase()
  .then(() => {
    // Why DB connection required first because if server start listening on port.
    // and by some case db is not connected then it throws errors that's calling in this way.
    console.log("Database connection established.");
    app.listen(3000, () => {
      console.log("Server listing on port 3000");
    });
  })
  .catch((err) => {
    console.error(err, "Connection failed");
  });

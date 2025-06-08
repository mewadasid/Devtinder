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

app.get("/user", async (req, res) => {
  const userEmail = req.query.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.send(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.send(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.send(400).send("Something went wrong.");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.query.userId;
  try {
    const u = await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.send(400).send("Something went wrong.");
  }
});

app.patch("/user", async (req, res) => {
  const userBody = req.body;
  try {
    const u = await User.findByIdAndUpdate(userBody.userId, userBody, {
      runValidators: true,
    });
    res.send("User updated Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong." + err.message);
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

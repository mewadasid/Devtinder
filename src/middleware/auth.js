const userAuth = (req, res, next) => {
  const token = "Sid";
  const isAuthorized = token === "Sid";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized user");
  } else {
    next();
  }
};

module.exports = { userAuth };

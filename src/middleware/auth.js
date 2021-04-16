const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new Error();
    }

    const token = authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = _id;

    next();
  } catch (error) {
    res.status(403).json({ message: "Access Denied" });
  }
};

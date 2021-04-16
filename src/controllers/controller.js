const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../models/users");

const Authenticate = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({ error: "Requires email and password" });
  }

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(409).json({ error: "no user found" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(409).json({ error: "incorrect username or password" });
    }

    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "success", token });
  } catch (error) {
    res.status(500).json({ error: "something went wrong please try again" });
  }
};

const Create = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = userModel({ email, password: hashedPassword });
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await newUser.save();

    res.status(201).json({ message: "User created", token });
  } catch (error) {
    res.status(500).json(error);
  }
};

const Protected = async (req, res) => {
  const id = req.user;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error();
    }

    res.json(user.toObject());
  } catch {
    res.status(403).json({ message: "Unauthorized action" });
  }
};

module.exports = {
  Authenticate,
  Create,
  Protected,
};

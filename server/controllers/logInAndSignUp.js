const JWT = require("jsonwebtoken");
const UserLogin = require("../models/UserSchema");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "Please provide email and password",
      });
    }
    const token = JWT.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    if (!token) {
      return res.status(400).json({
        msg: "Invalid credentials , please try again",
      });
    }
    const User = await UserLogin.findOne({
      email: email,
    });
    if (!User) {
      return res.status(400).json({
        msg: "user not found , check your credentials",
      });
    }
    if (User.password !== password) {
      return res.status(401).json({
        msg: "Invalid credentials , please try again",
      });
    }
    res.status(201).json({
      msg: "User loged successfully",
      userInfo: User,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, confirmPassword, username } = req.body;
    if (!email || !password || !confirmPassword || !username) {
      return res.status(400).json({
        msg: "Please provide email and password",
      });
    }
    if (confirmPassword !== password) {
      return res.status(401).json({
        msg: "Passwords do not match , please try again",
      });
    }
    const token = JWT.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    if (!token) {
      return res.status(400).json({
        msg: "Invalid credentials , please try again",
      });
    }
    const User = await UserLogin.create({
      username: username,
      email: email,
      password: password,
    });
    res.status(201).json({
      msg: "User created successfully",
      userInfo: User,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).json({
      msg: "user logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
};

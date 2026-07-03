import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyRegistered) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      config.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getMe(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token has been logged out",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Get me error:", err);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}


export async function login(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!password || (!username && !email)) {
      return res.status(400).json({
        message: "Username or email, and password are required",
      });
    }

    const user = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      config.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}


export async function logout(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
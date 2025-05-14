import User from "../models/User.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const { sign } = jwt;

export async function register(req, res) {
  const { name, email, password } = req.body;
  // console.log("register",req.body);
  try {
    let user = await User.findOne({ email });
    // console.log("register user",user);
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    // console.log(" user",user);

    const token = sign({ userId: user._id }, process.env.JWT_SECRET);
    // console.log("register token",token);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  // console.log("login",req.body);
  try {
    let user = await User.findOne({ email });
  // console.log("login user",user);

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  // console.log("login isMatch",isMatch);


    const token = sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
}

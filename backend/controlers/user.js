import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { userName, password } = req.body;
  console.log("running");
  let user = await User.findOne({ userName }).lean()
  console.log("user with lean",user)
   user = await User.findOne({ userName }).select("+password");
  console.log("user with select(+password)",user)
   
  
  if (!user) {
    console.log("running 2");
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }
  console.log("running 3");
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("is running in password");
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }
  console.log("running 4");
  delete user.password
  const token = jwt.sign({user:user}, process.env.JWT_SECRET);
  return res.status(200).json({
    role: user.role,
    token,
  });
  // sendCookie(user,res,"Welcome back",200)
};

export const register = async (req, res) => {
  const { userName, email, password, role } = req.body;
  console.log(req.body);
  let user = await User.findOne({ email });
  console.log("this is running");
  if (user) {
    return res.status(404).json({
      success: false,
      message: "User Already Exist",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log("running 2");
  user = await User.create({ userName, email, password: hashPassword, role });
  console.log("running 3");
  // sendCookie(user,res,"Register Successfully",200)
  return res.status(200).json({
    success: true,
    message: "Account Created Successfully",
  });
  // console.log("running 4")
};

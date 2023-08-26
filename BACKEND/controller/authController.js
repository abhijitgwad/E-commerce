import { hashSync } from "bcrypt";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validation

    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }

    //existing user
    const existinguser = await userModel.findOne({ email });

    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "Already register,Login!!",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      answer,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  console.log("asdf");
  try {
    const { email, password } = req.body;
    if (!email) {
      res.send({ message: "Enter email" });
    }
    if (!password) {
      res.send({ message: "Enter password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({ message: "User does not exist!!!" });
    }

    const isLogin = await comparePassword(password, user.password);
    if (!isLogin) {
      return res.status(200).send({ message: "Enter Valid Password!!!" });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).send({
      success: true,
      message: "Login Successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(501).send({
      succuss: false,
      message: "Error in Login",
      error,
    });
  }
};

//forgot-password
export const forgotPassword = async (req, res) => {
  const { email, answer, newPassword } = req.body;
  if (!email) {
    res.send({
      success: false,
      message: "email required",
    });
  }
  if (!answer) {
    res.send({
      success: false,
      message: "anwer required",
    });
  }
  if (!newPassword) {
    res.send({
      success: false,
      message: "newPassword required",
    });
  }

  const user = await userModel.findOne({ email, answer });
  if (!user) {
    res.send({
      success: false,
      message: "enter correct email or password",
    });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
  res.status(200).send({
    success: true,
    message: "password reset successfully!!",
  });
};

//test Controller
export const testController = (req, res) => {
  res.send("protected route");
};

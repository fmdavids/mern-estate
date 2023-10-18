import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorMiddleware.js";
import jwt from "jsonwebtoken";
import config from "../services/config.js";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      next(errorHandler(400, "username, email, password are required"));
      return;
    }
    const userExist = await User.findOne({ email });
    const usernameExist = await User.findOne({ username });

    if (!userExist || !usernameExist) {
      //   next(errorHandler(500, "User with email already exist"));
      //   return;
      const hashPassword = bcryptjs.hashSync(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashPassword,
      });
      res.status(201).json({
        success: true,
        message: "Success",
        data: newUser,
      });
    }
  } catch (error) {
    next(errorHandler(500, "error custum2"));
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  //   if (email === "" || password === "") {
  //     next(errorHandler(400, "email and password can not be empty"));
  //   }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(400, "No user exit with the email");
    }
    // if (email === user.email) {
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return next(401, "wrong credentials");
    }
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET);
    const {password: dbPassword, ...rest} = user._doc
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 15),
      })
      .status(200)
      .json(rest);
    // }
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

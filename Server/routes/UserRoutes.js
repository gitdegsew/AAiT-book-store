import express from "express";
import asyncHandler from "express-async-handler";
import Jwt from "jsonwebtoken";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import MailService from "../utils/emailService.js";
import {
  createMailMessage,
  createVerifyMessage,
} from "../utils/mailMessages.js";

const userRoute = express.Router();
// LOGIN
userRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPasswords(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);
//signup
userRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin, isStaff } = req.body;
    if (!(name && email && password)) {
      throw new Error("please provide all information");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
      name: name,
      email: email,
      password: password,
      isAdmin: isAdmin,
      isStaff: isStaff,
      isVerified: false,
    });
    if (user) {
     
     MailService.sendMail({
        to: user.email,
        from: " AAiT Book Store  <aaitbookstore@aait.edu.et>",
        subject: "Welcome to AAiT Book Store!",
        html: createMailMessage(user.name, generateToken(user._id)),
      }).then((value)=>{
       
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isStaff: user.isStaff,
          isVerified: user.isVerified,
          token: generateToken(user._id),
        });
      }).catch((error)=>{
        console.log("error sending email",error)
      })

      // console.log("Message sent: %s", info.messageId);


     
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

userRoute.get(
  "/verify/:token",
  asyncHandler(async (req, res) => {
    const token = req.params.token;
    console.log("Token", token);
    if (token) {
      const decode = Jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.id);
      if (user) {
        user.isVerified = true;
        await user.save();
        await MailService.sendMail({
          to: user.email,
          from: " AAiT Book Store  <aaitbookstore@aait.edu.et>",
          subject: "Account Verified!",
          html: createVerifyMessage(user.name),
        });
        res.send(
          "<h1>Account has been verified, you can now login to your account</h1>"
        );
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    }
  })
);

userRoute.get(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

userRoute.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff,
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("User  not found");
    }
  })
);

//GET ALL USER ADMIN
userRoute.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

// Get All unverified users
userRoute.get(
  "/unverified",
  protect,
  asyncHandler(async (req, res) => {
    const users = await User.find({ isVerified: false });
    res.json(users);
  })
);

// verify unverified users
userRoute.put(
  "/verify/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    if (userId) {
      const user = await User.findById(req.params.id);
      if (user) {
        user.isVerified = true;
        await user.save();
        await MailService.sendMail({
          to: user.email,
          from: " AAiT Book Store  <aaitbookstore@aait.edu.et>",
          subject: "Account Verified!",
          html: createVerifyMessage(user.name),
        });
        res.json({ message: "User Verified" });
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

export default userRoute;

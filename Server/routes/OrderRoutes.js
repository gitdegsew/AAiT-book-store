import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import Product from "../models/BookModel.js";
import User from "../models/UserModel.js";
import MailService from "../utils/emailService.js";
import {createBookOrderMessage} from "../utils/mailMessages.js";

const orderRouter = express.Router();
// ORDER ROUTES
orderRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const have_order = await Order.findOne({ user: req.user.id });

    if (have_order && have_order.isreturned === false) {
      res.status(400);
      throw new Error("You have aleady ordered");
    } else {
      if (!req.body.orderItems || !Array.isArray(req.body.orderItems)) {
        res.status(400);
        throw new Error("Invalid order items");
      }

      const book = await Product.findById(req.body.orderItems[0].product);
      if (book.countInStock > 0) {
        const { id_no, department, takedate, returndate } = req.body;
        const order = new Order({
          _id: req.user._id,
          user: req.user._id,
          book: req.body.orderItems[0].product,
          id_no: id_no,
          department: department,
          takedate: takedate,
          returndate: returndate,
        });

        book.countInStock = book.countInStock - 1;
        book.save();
        const createOrder = await order.save();
        const user = await User.findById(req.user.id);
        // Send an email about the order
        await MailService.sendMail({
          to: user.email,
          from: " AAiT Book Store  <aaitbookstore@aait.edu.et>",
          subject: "New Book Order",
          html: createBookOrderMessage(user.name, book.title, book.author),
        });

        res.status(201).json(createOrder);
      } else {
        res.status(400);
        throw new Error(" Book is Out of Stock");
      }
    }
  })
);

//ADMIN GET ALL ORDERS

orderRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({})
      .sort({ _id: -1 })
      .populate("user", "name email");
    res.json(orders);
  })
);

// USER LOGIN ORDERS
orderRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(order);
  })
);
export default orderRouter;

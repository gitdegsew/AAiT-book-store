import express from "express";
import User from "./models/UserModel.js";
import asyncHandler from "express-async-handler";
import book from "./models/BookModel.js";
import users from "./data/users.js";
import products from "./data/books.js";

const ImportData = express.Router();

ImportData.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    const usersWithoutCircularRef = users.map((user) => {
      // You can customize this transformation based on your User model
      const { name, email } = user;
      return { name, email };
    });
    res.json({
      userCount: usersWithoutCircularRef.length,
      users: usersWithoutCircularRef,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

ImportData.post(
  "/users",
  asyncHandler(async (req, res) => {
    await User.deleteMany({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.get("/products", async (req, res) => {
  try {
    const products = await book.find({});
    const productssWithoutCircularRef = products.map((product) => {
      // You can customize this transformation based on your User model
      const {
        title,
        author,
        description,
        reviews,
        countInStock,
        bookcode,
        image,
        forstaffonly,
        numsReviews,
        rating,
      } = product;
      return {
        title,
        author,
        description,
        reviews,
        countInStock,
        bookcode,
        image,
        forstaffonly,
        numsReviews,
        rating,
      };
    });
    res.json({
      productCount: productssWithoutCircularRef.length,
      products: productssWithoutCircularRef,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

ImportData.post("/products", async (req, res) => {
  await book.deleteMany({});
  const importProducts = await book.insertMany(products);
  res.send({ importProducts });
});

ImportData.delete("/users", async (req, res) => {
  await User.deleteMany({});
  res.send("uses successfully deleted");
});

ImportData.delete("/products", async (req, res) => {
    await book.deleteMany({});
    res.send("All books successfully deleted");
  });

export default ImportData;

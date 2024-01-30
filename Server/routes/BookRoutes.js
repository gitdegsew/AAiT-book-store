import express from 'express';
import asyncHandler from "express-async-handler";
import Product from '../models/BookModel.js';
import { staff,admin, protect } from "./../Middleware/AuthMiddleware.js";
const productRoute=express.Router();
// GET ALL PRODUCT
productRoute.get(
    "/",
    asyncHandler(async (req,res)=>{
        console.log("key word from get books :",req.query.keyword)
        const pageSize=6
        const page=Number(req.query.pageNumber) || 1 ;
        const keyword = req.query.keyword ? {
            $or: [
              {
                title: {
                  $regex: req.query.keyword,
                  $options: "i",
                },
              },
              {
                author: {
                  $regex: req.query.keyword,
                  $options: "i",
                },
              },
            ],
          }
        :{}
        const count =await Product.countDocuments({ ...keyword });
        const products =await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1)).sort({_id:-1});
        res.json({products , page , pages: Math.ceil(count / pageSize)}); 
    })
);
//ADMIN GET ALL PRODUCT
productRoute.get(
    "/all",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const products = await Product.find({}).sort({ _id: -1 });
      res.json(products);
    })
  );
//GET SINGLE PRODUCT
productRoute.get(
    "/:id",
    asyncHandler(async (req,res)=>{
        const product =await Product.findById(req.params.id);
        if(product){
            res.json(product); 
        }
        else{
            res.status(404);
            throw new Error("Product not Found");
        }
        
    })
);


//PRODUCT REVIEW
productRoute.post(
    "/:id/review",
    protect,
    asyncHandler(async (req,res)=>{
        const {comment,rating}=req.body
        const product =await Product.findById(req.params.id);
        if(product){
            const review={
                name:req.user.name,
                comment,
                rating,
                user:req.user._id,
            };
            product.reviews.push(review);
            await product.save();
            res.json(product);
        }
        else{
            res.status(404);
            throw new Error("Product not Found");
        }
        
    })
);
//Fetch all review
productRoute.get(
    "/:id/review",
    asyncHandler(async (req,res)=>{
        const product =await Product.findById(req.params.id);
        if (product){
                res.json(product.reviews);
        }
        else{
            res.status(404);
            throw new Error("Product not Found")
        }
    }
    )
)
// DELETE SINGLE REVIEW
productRoute.delete(
"/:id/review/:revid",
protect,
asyncHandler(async (req, res) => {
    const product=await Product.findById(req.params.id);
    if (product) {
        const review = await product.reviews.id(
            req.params.revid,
         );
            if(review){
                if(review.user.toString()===req.user._id.toString()){
                    product.reviews.pull(review);
                    await product.save();
                    res.json({ message: "Product deleted" });
                }
                else{
                    res.status(403);
                    throw new Error("not authorized");
                }
            }
            else{
                res.status(404);
                throw new Error("Review not Found");
            }
        }

        else {
    res.status(404);
    throw new Error("Product  not Found");
    }
})
);
  // UPDATE REVIEW
productRoute.put(
    "/:id/review/:revid",
    protect,
    asyncHandler(async (req, res) => {
      const {comment} = req.body;
      const product = await Product.findById(req.params.id);
      if (product) {
        const review = await product.reviews.id(
            req.params.revid,
         );
         if(review){
            if(review.user.toString()===req.user._id.toString()){
                if (req.body.comment){
                    product.reviews.id(req.params.revid).comment=req.body.comment
                    const updatedProduct = await product.save();
                    res.json(updatedProduct.reviews);
                }

            }
            else{
                res.status(403);
                throw new Error("not authorized");
            }
           
          } else {
            
        res.status(404);
        throw new Error("Review not found");
         }

        res.status(404);
        throw new Error("Product not found");
      }
    })
  );


  // DELETE PRODUCT
productRoute.delete(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        await product.remove();
        res.json({ message: "Product deleted" });
      } else {
        res.status(404);
        throw new Error("Product not Found");
      }
    })
  );

  
  // CREATE PRODUCT
productRoute.post(
"/",
protect,
admin,
asyncHandler(async (req, res) => {
    const { title, author, description, bookcode,image, countInStock} = req.body;
    const productExist = await Product.findOne({ title });
    if (productExist) {
    res.status(400);
    throw new Error("Product name already exist");
    } else {
    const product = new Product({
        title,
        author,
        description,
        image,
        countInStock,
        bookcode,
    });
    if (product) {
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
    } else {
        res.status(400);
        throw new Error("Invalid product data");
    }
    }
})
);
  
  // UPDATE PRODUCT
productRoute.put(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const { title, author, description, image, countInStock,bookcode} = req.body;
      const product = await Product.findById(req.params.id);
      if (product) {

        product.title = title || product.title;
        product.author = author || product.author;
        product.description = description || product.description;
        product.image = image || product.image;
        product.countInStock = countInStock || product.countInStock;
        product.bookcode=bookcode || product.bookcode;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    })
  );

export default productRoute;
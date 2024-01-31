import express from 'express';
import asyncHandler from "express-async-handler";
import Category from '../models/CatagoryModel.js';
import { staff,admin, protect } from "./../Middleware/AuthMiddleware.js";





const categoryRoute=express.Router();
// ORDER ROUTES
categoryRoute.post(
    "/",
    protect,
    admin,
    asyncHandler(async (req,res)=>{
        //   const have_order= await Category.findOne({user:req.user.id})

            // if (have_order &&  have_order.isreturned===false ){
            //   res.status(400)
            //   throw new Error("You have aleady ordered")
            // }
            // else{

            //   if (!req.body.orderItems || !Array.isArray(req.body.orderItems)) {
            //     res.status(400)
            //     throw new Error("Invalid order items");
            //    } 
               
              const category = await Category.findOne({name:req.body.name})
                if (category){
                    res.status(400)
                    throw new Error("Category already exist")
                }
                else{
                    const { name} = req.body;
                    const category = new Category({
                    name,
                        })
                    
                    // book.countInStock=book.countInStock-1
                    // book.save()
                    const createCategory = await category.save();
                    res.status(201).json(createCategory);
                }

             
              
            }

           
    )


);



//ADMIN GET ALL CATEGORIES

categoryRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const categories = await Category.find({}).sort({ _id: -1 })
    res.json(categories);
  })
);




// Single Category
// orderRouter.get(
//   "/",
//   protect,
//   asyncHandler(async (req, res) => {
   
//     const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
//     res.json(order);
//   })
// );
export default categoryRoute;
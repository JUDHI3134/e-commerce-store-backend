import express from "express"

import {verifyRazorpay,updateStatus,userOrders,allOrders,placeOrder,placeOrderRazorpay,placeOrderStripe, verifyStripe} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//Admin feature
orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)

//payment feature
orderRouter.post("/place",authUser,placeOrder)
orderRouter.post("/stripe",authUser,placeOrderStripe)
orderRouter.post("/razorpay",authUser,placeOrderRazorpay)

//verify payment
orderRouter.post("/verifyStripe",authUser,verifyStripe)
orderRouter.post("/verifyRazorpay",authUser,verifyRazorpay)

//user feature
orderRouter.post("/userorders",authUser,userOrders)

export default orderRouter;
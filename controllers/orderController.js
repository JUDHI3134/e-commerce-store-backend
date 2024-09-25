import orderModel from "../models/orderModel.js";
import userModel from "../models/UserModel.js";


//placing order using COD
const placeOrder = async (req,res) =>{
    try {
        const {userId, amount, items, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{cartdata: {}})

        res.json({success: true, message: "Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}



//placing order using Stripe method
const placeOrderStripe = async (req,res) =>{

}



//placing order using Razorpay Method
const placeOrderRazorpay = async (req,res) =>{

}



//All Order data from admin panel
const allOrders = async (req,res) =>{
    try {
       const orders = await orderModel.find({})

       res.json({success: true, orders})
    } catch (error) {
        console.log(error);
    res.json({success: false, message: error.message})
    }
}


//User order data for frontend
const userOrders = async (req,res) =>{
   try {
    
    const {userId} = req.body;
    const orders = await orderModel.find({userId})

    res.json({success: true,orders})

   } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
   }
}



//Update order status from Admin
const updateStatus = async (req,res) =>{
    try {
       const {orderId, status} = req.body;
       await orderModel.findByIdAndUpdate(orderId,{ status }) 
       res.json({success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error);
    res.json({success: false, message: error.message})
    }
}

export {updateStatus,userOrders,allOrders,placeOrder,placeOrderRazorpay,placeOrderStripe}
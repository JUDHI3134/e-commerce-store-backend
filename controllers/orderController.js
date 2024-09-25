import orderModel from "../models/orderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from "stripe";

//global variables
const currency = "inr"
const deliveryCharge = 10

//gateway initialized
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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
    try {
        const {userId, amount, items, address} = req.body;
        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();

        const line_items = items.map((item)=>({
            price_data:{
                currency: currency,
                product_data:{
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency: currency,
                product_data:{
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success:true, session_url : session.url})



    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
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
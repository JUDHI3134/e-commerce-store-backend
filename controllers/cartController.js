import userModel from "../models/UserModel.js";


//add product to user cart
const addToCart = async (req,res) =>{
    try {
        const {userId, itemId, size} = req.body;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: "Added To Cart"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}


//add product to user cart
const updateCart = async (req,res) =>{

}


//add product to user cart
const getUserCart = async (req,res) =>{

}

export {addToCart, updateCart, getUserCart}
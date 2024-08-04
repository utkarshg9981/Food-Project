import { instance } from "../server.js"
import crypto from "crypto"
import 'dotenv/config'
import paymentModel from "../models/paymentModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

var newOrderId

export const checkOut = async (req, res) => {
    
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };
    
    try {
        
        const order = await instance.orders.create(options);

        try {
            const newOrder = new orderModel({
                userId: req.body.userId,
                items: req.body.items,
                amount:req.body.amount,
                address: req.body.address
            })
            await newOrder.save()
            newOrderId = newOrder._id
            await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
        } catch (error) {
            console.log(error);
        }
         
        res.status(200).json({
            success: true,
            order,
        
        });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
};

export const paymentVerification = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
        .update(body.toString())
        .digest("hex")

    const isAuthentic = expectedSignature === razorpay_signature



    if (isAuthentic) {
        // database comes here

        // await paymentModel.create({
        //     razorpay_payment_id,
        //     razorpay_order_id,
        //     razorpay_signature
        // })
        try {
            await orderModel.findByIdAndUpdate(newOrderId,{payment: true})
            res.redirect(`http://localhost:5173/paymentsuccess?.reference=${razorpay_payment_id}`)
        } catch (error) {
            console.log(error);
        }
        

        
    } else {
        try {
            await orderModel.findByIdAndDelete(newOrderId)
            res.json({success:false,message:"true"})
        } catch (error) {
            console.log(error);
        }
        res.status(400).json({ success: false })
    }


};

// user orders for frontend
export const userOrders = async(req,res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

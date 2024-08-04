import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    // userId: {
    //     type: String,
    //     required: true
    // },
    // items: {
    //     type: Array,
    //     required: true
    // },
    // amount: {
    //     type: Number,
    //     required: true
    // }
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    }
})

const paymentModel = mongoose.models.payment || mongoose.model("payment", paymentSchema)
export default paymentModel
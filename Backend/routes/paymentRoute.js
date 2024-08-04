import express from 'express'
import { checkOut, paymentVerification, userOrders } from '../controllers/paymentController.js'
import authMiddleware from '../middleware/auth.js'

const paymentRouter = express.Router()

paymentRouter.post("/checkout",authMiddleware,checkOut)
paymentRouter.post("/paymentverification",paymentVerification)
paymentRouter.post("/userorders",authMiddleware,userOrders)

export default paymentRouter
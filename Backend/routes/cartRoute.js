import express from "express"
import {addtoCart, removeFromCart, getCart,getEmail} from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js"

const cartRouter = express.Router()

cartRouter.post("/add",authMiddleware,addtoCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)
cartRouter.post("/userEmail",authMiddleware,getEmail)

export default cartRouter
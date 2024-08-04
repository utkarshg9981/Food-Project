import express from "express"

import { listOrders, updateStatus } from "../controllers/orderController.js"

const orderRouter = express.Router()


orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)

export default orderRouter
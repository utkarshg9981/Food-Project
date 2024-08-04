import http from "http";
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import paymentRouter from './routes/paymentRoute.js'
import Razorpay from "razorpay"
// app config
const app = express()
const port = 4000

//Socket io
import {Server} from "socket.io";
const server = http.createServer(app);

const io = new Server(server,{
  cors:
  {
      origin:"http://localhost:5173",
      methods:["GET","POST"],
      credentials:true
  }
});


io.on("connection", (socket) => {
  console.log("User Connected " +socket.id)
  // socket.emit("wellcome","Welcome to server  " +socket.id); //Sabhi user ho send ho jya ga
  // socket.broadcast.emit("wellcome","Welcome to server  " +socket.id+" this user have join ") //khud ho chore ka baki sabhi ko pauch jya ga 

socket.on("message",(data)=>{
  console.log(data);
  // io.emit("receve-message",data);  //Sabhi user ho send ho jya ga
  // socket.broadcast.emit("receve-message",data); //khud ho chore ka baki sabhi ko pauch jya ga 
  io.to(data.Room).emit("receve-message",data) //for particular perion by its socket id
})

//Room

socket.on("room-name",(data)=>{
  console.log(data);
  socket.join(data)
})

//For disconnected
socket.on("disconnect",()=>{
  console.log("User disconnected "+socket.id)
})

});
// for payment integration
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });




// middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

//db connection
connectDB()

// api endpoint
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/payment",paymentRouter)  // for payment Integration

app.get("/", (req, res) => {
    res.send("API WORKING")
})

server.listen(port,()=> {
    console.log(`Server Started on https://localhost:${port}`) 
})

// mongodb+srv://pratikpatel2123:7057347707@cluster0.otcrrz1.mongodb.net


// to get the api key for the razorpay
app.get("/api/getkey", (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
  );

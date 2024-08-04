import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const PlaceOrder = () => {

  const { getTotalCartAmount, food_list, token, cartItems, url } = useContext(StoreContext)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
      alert("First Login...")
      navigate("/cart")
    } else if(getTotalCartAmount() === 0) {
      navigate("/cart")
    }
  },[token])

  const checkOutHandler = async (event) => {

    event.preventDefault()

    let orderItems = []
    food_list.map((item) => {
      if(cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    console.log(orderItems);

    let orderData = {
      address:formData, 
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    // let response = await axios.post(url+"/api/order/place",orderData)

    try {
      let amount = getTotalCartAmount() + 2
      const { data: { key } = {}} = await axios.get("http://localhost:4000/api/getKey")
      const { data : { order } = {}} = await axios.post("http://localhost:4000/api/payment/checkout",orderData,{headers:{token}})
      console.log(order);

      const options = {
        key: key,
        amount: order?.amount,
        currency: "INR",
        name: "Pratik Patel",
        description: "Test Transaction",
        image: "https://avatars.githubusercontent.com/u/141320778?s=400&u=ea4be5151dfaa5920fd831e836062124f09e90a1&v=4",
        order_id: order?.id,
        callback_url: "http://localhost:4000/api/payment/paymentverification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000"
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#121212"
        }
      };
      const razor = new window.Razorpay(options);
      razor.open();

      
      console.log(formData);


    } catch (error) {
      console.log(error);

    }

  }


  return (
    <form onSubmit={checkOutHandler} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={formData.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={formData.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={formData.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={formData.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={formData.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={formData.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={formData.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={formData.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={formData.phone} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

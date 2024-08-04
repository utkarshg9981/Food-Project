import React, { useState,useContext } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/home'
import Cart from './Pages/Cart/cart'
import Footer from './Components/Footer/Footer'
import LoginPopUp from './Components/LoginPopup/LoginPopUp'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import PaymentSuccess from './PaymentSuccess'
import MyOrders from './Pages/MyOrders/MyOrders'
import Add from '../AdminSRC/Pages/Add/Add';
import Orders from '../AdminSRC/Pages/Orders/Orders'
import List from '../AdminSRC/Pages/List/List'
import { StoreContext } from './context/StoreContext'
import AdminNavbar from '../AdminSRC/Components/Navbar/Navbar';
import Sidebar from '../AdminSRC/Components/Sidebar/Sidebar';
import "../AdminSRC/admin_index.css"
const App = () => {
  const url = "http://localhost:4000"
  const [showLogin, setShowLogin] = useState(false)
   const {useeffectcall,OwnerEmail} = useContext(StoreContext);

  return (
    <>
    {(useeffectcall)?(<>
    {(OwnerEmail)?(<>
      <AdminNavbar/>
      <hr />
      <div className="app-content">
        <Sidebar />

        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>

      </div>
    </>):(<>
  
    {showLogin ? <LoginPopUp setShowLogin = {setShowLogin}/> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder/>} />
          <Route path='/paymentsuccess' element={<PaymentSuccess/>} />
          <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer />
      </>)}
      </>):(<>
      Loading....</>)}
    </>
  )
}

export default App

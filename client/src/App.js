import React, { useContext, useEffect } from 'react'
import { Routes,Route, useNavigate } from "react-router-dom";
import AdminDash from "./Pages/AdminDash";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { LoginContext } from './components/ContextProvider/Context';
import ErrorPage from './Pages/ErrorPage';
import Otp from './Pages/Otp';
import Category from './Pages/Category/Home';
import AddCategory from './Pages/Category/Add';
import EditCategory from "./Pages/Category/Edit"
import Product from "./Pages/Product/Home"
import AddProduct from "./Pages/Product/Add"
import EditProduct from "./Pages/Product/Edit"
import Shop from './Pages/Shop';
import ProductsDetailDefault from './Pages/ProductsDetailDefault';
import ProductCategory from './Pages/ProductCategory';
import Cart from './Pages/Cart';
import Wishlist from './Pages/Wishlist';
import Address from './Pages/Address/Address';
import MyAccount from './Pages/MyAccount';
import EditAdress from './Pages/Address/EditAdress';
import Checkout from './Pages/Checkout';
import Coupan from "./Pages/Coupan/Home"
import EditCoupan from "./Pages/Coupan/Edit"
import AddCoupan from "./Pages/Coupan/Add"
import AllOrders from "./Pages/AllOrders"
import OrderDetailAdmin from "./Pages/OrderDetailAdmin"

import OrderDetail from './Pages/OrderDetails';
import OrderDone from './OrderDone';
import AboutUs from './Pages/AboutUs';
import Reports from './Pages/Reports';

function App() {
  const navigate = useNavigate();
  const {logindata,setLoginData} = useContext(LoginContext);

  const DashboardValid = async() =>{
    let token = localStorage.getItem("usersdatatoken");
    console.log(token);
    const res = await fetch("http://localhost:5000/validuser",{
        method:"GET",
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : token
        }
    });


    const data = await res.json();
    console.log(data);
    if(data.status == 401 || !data){
        console.log("User Not verify");
    }else if (data.status === 201) {
        console.log("admin verify");
        setLoginData(data)    
        navigate("/admin");
    }
    else {
        console.log("user Alredy Login");
        setLoginData(data)
        navigate("/");
    }
}
useEffect(()=>{
  DashboardValid()
},[])

  return (
    <>
     
     <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/admin" element={<AdminDash/>}></Route>
        <Route path="/shop" element={<Shop/>}></Route>
        <Route path="/user/otp" element={<Otp/>}></Route>
        <Route path="/category" element={<Category/>}></Route>
        <Route path="/product" element={<Product/>}></Route>
        <Route path="/coupan" element={<Coupan/>}></Route>
        <Route path="/category/add" element={<AddCategory/>}></Route>
        <Route path="/product/add" element={<AddProduct/>}></Route>
        <Route path="/coupan/add" element={<AddCoupan/>}></Route>
        <Route path="/editcategory/:id" element={<EditCategory/>}></Route>
        <Route path="/editproduct/:id" element={<EditProduct/>}></Route>

        <Route path="/editcoupan/:id" element={<EditCoupan/>}></Route>
        <Route path="/productDetail/:id" element={<ProductsDetailDefault/>}></Route>
        <Route path="/category/:id" element={<ProductCategory/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/report" element={<Reports/>}></Route>
        <Route path="/wishlist" element={<Wishlist/>}></Route>
        <Route path="/myaccount" element={<MyAccount/>}></Route>
        <Route path="/myaccount" element={<MyAccount/>}></Route>
        <Route path="/cart/address" element={<Address/>}></Route>
        <Route exact path="/editaddress/:id" element={< EditAdress/>} />
        <Route exact path="/checkout/:id" element={< Checkout/>} />
        <Route exact path="/order/:id" element={< OrderDetail/>} />
        <Route exact path="/orderi/:id" element={< OrderDetailAdmin/>} />
        <Route exact path="/orderdone" element={< OrderDone/>} />
        <Route exact path="/orders" element={< AllOrders/>} />
        
        {/* <Route exact path="/aboutus" element={< AboutUs/>} /> */}
        
        
        
        
        <Route path="/*" element={<ErrorPage/>}></Route>

       
      </Routes>

    </>
  );
}

export default App;

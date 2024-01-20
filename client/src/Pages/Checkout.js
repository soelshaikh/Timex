import React, { useContext, useEffect, useState } from 'react'
import {useParams,NavLink, useNavigate} from "react-router-dom"
import Header from "../components/Header"
import { toast, ToastContainer } from 'react-toastify'
import { LoginContext } from '../components/ContextProvider/Context';
import SubTotal1 from './SubTotal1'
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from "axios"


const Checkout = () => {
    
    const navigate = useNavigate()
    const location = useLocation();
    console.log(location?.state?.id);
    const [totalAmountlocation,settotalAmountlocation] = useState("00")
   // settotalAmountlocation(location?.state?.id)
   const [wbalance,setWbalance] = useState(0)
   const [coupanName,setcoupanName] = useState("")
   const [coupanDiscount,setcoupanDiscount] = useState(0)
   const [CoupanDiscountPrice,setCoupanDiscountPrice] = useState(0)
  
    
    
    console.log(location);
    const [cartData,setCartData] = useState([])
    const [addressData,setAddressData] = useState("")
    const [pstatus,setStatus] = useState("cod")
    console.log(pstatus);
    const { logindata, setLoginData } = useContext(LoginContext);
  
    const getCartData = async() =>{

        const token = localStorage.getItem("usersdatatoken")

        const res = await fetch("/getcart",{
            method:"GET",
            headers:{
                Accept :"application/json",
                "Content-Type" :"application/jsn",
                "Authorization":token
            },
            credentials :"include"
        })
        //console.log(res);
        const data = await res.json()
        if(res.status!==201){
            alert("no data availble")
        }else{
            setCartData(data)
        }

    }
    const { id } = useParams("");
    const getAddressData = async() =>{
        const token = localStorage.getItem("usersdatatoken")

        const res = await fetch(`/getaddress/${id}`,{
            method :"GET",
            headers : {
                Accept:"application/json",
                "Content-Type" : "application/json",
                "Authorization":token
            },
            credentials :"include"
        })

        const data = await res.json();
        if(res.status !== 201){
            alert("no data availble")
        }else{
            setAddressData(data)
        }
    }
    const addCodOrder = async() =>{
        
        console.log(coupanName);
        const token = localStorage.getItem("usersdatatoken")
        const res = await fetch(`/makeorder/${id}`,{
            method:"POST",
            headers:{
                Accept :"application/json",
                "Content-Type":"application/json",
                "Authorization" : token
            },
            credentials : "include",
            body:JSON.stringify({
                totalAmountlocation,
                pstatus,
                wbalance,
                coupanName:coupanName,
                coupanDiscount,
                CoupanDiscountPrice

            })
        })
        console.log(res);

        const data = await res.json();
        console.log(data);
        if(res.status !== 201){
            alert("no data availble")
        }else{
            setLoginData(data)
            console.log("Order Done");
            toast.success("orderDone")
            setTimeout(()=>{
                navigate("/orderdone")
            },3000)   
        }
}
    const addOnlineOrder = async() =>{
        
        console.log(id);
        const key ="rzp_test_oABnNnQ421QCw1"
        
        const token = localStorage.getItem("usersdatatoken")
        const res = await fetch(`/checkout/${id}`,{
            method:"POST",
            headers:{
                Accept :"application/json",
                "Content-Type":"application/json",
                "Authorization" : token
            },
            credentials : "include",
            body:JSON.stringify({
                totalAmountlocation,
                pstatus,
                wbalance,
                coupanName:coupanName,
                coupanDiscount,
                CoupanDiscountPrice
            })
        })
        console.log(res);
        
        const data = await res.json();
        console.log(data);
        
        const orderid = data?.order?.id
        console.log(orderid);
        console.log(key);
        console.log(addressData);
        console.log(data?.order?.amount);
         const options = {
            key: key, 
            amount: data?.order?.amount, 
            currency: "INR",
            name: "Timex",
            description: "Razorpay Transaction",
            order_id: orderid,

            
            // callback_url: "http://localhost:5000/paymentverification",
            handler: async function (response){
                alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
                 const data = {
                    totalAmountlocation, 
                    pstatus, 
                    wbalance,
                    coupanName,
                    coupanDiscount,
                    CoupanDiscountPrice,
                    orderCreationId: orderid,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                console.log(data);
                const headers = {
                    Accept :"application/json",
                    "Content-Type":"application/json",
                    "Authorization" : token
                }
                const credentials = "include";
                const result = await axios.post(`http://localhost:5000/paymentverification/${id}`, data,{
                    headers:headers,
                    credentials : credentials
                });
                if(result.status !== 201){
            alert("no data availble")
        }else{
            setLoginData(data)
            console.log("Order Done");
            toast.success("orderDone")
            setTimeout(()=>{
                navigate("/orderdone")
            },3000)   
        }

                // alert(result.data.msg);
            },
            prefill: {
                "name": addressData?.fname,
                "email": addressData?.email,
                "contact": addressData?.phone
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#FEF5EF"
            }
        };
        var rzp1 = new window.Razorpay(options);
        console.log(rzp1);
        rzp1.open();

      
    

        
    }
    const orderHandler = () =>{
        if(pstatus === "cod"){
            addCodOrder();
        }else{
            addOnlineOrder();
        }
    }
    
    useEffect(()=>{
        getCartData()
        getAddressData();
        console.log(location?.state?.id);
        settotalAmountlocation(location?.state?.id)
        setWbalance(location?.state?.WalletBalance,location?.state?.coupanName)
        console.log(location?.state?.WalletBalance);
        console.log(coupanName);
        setcoupanName(location?.state?.coupanName)
        setcoupanDiscount(location?.state?.CoupanDiscount)
        setCoupanDiscountPrice(location?.state?.CoupanDiscountPrice)
    
        console.log(totalAmountlocation);
    },[])
    console.log(coupanName);

  return (
    <>
        <Header/>
        <ToastContainer/>
        
        <div class="breadcrumb-section breadcrumb-bg-color--golden">
        <div class="breadcrumb-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h3 class="breadcrumb-title">Checkout</h3>
                        <div class="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                            <nav aria-label="breadcrumb">
                                <ul>
                                    <li><NavLink to={"/"}>Home</NavLink></li>
                                    <li><NavLink to={'/cart'}>Cart</NavLink></li>
                                    <li><NavLink to={'/cart/address'}>Address</NavLink></li>
                                    <li class="active" aria-current="page">Checkout</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="checkout-section">
    <div className="container">
        <div className="row">
            
           
        </div>
        <div className="checkout_form" >
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <form action="#">
                        <h3>Address Details</h3>
                        <div className="row">
                        <div class="" >
                        
                              
                                        <label class="card"  >
                                            

                                            <span class="plan-details">
                                                <span class="plan-type">Home</span>
                                                <span class="plan-cost">{addressData?.fname}<span class="slash"> </span><abbr class="plan-cycle" title="month">{addressData?.lname}</abbr></span>
                                                <span >{addressData?.streetAddress},{addressData?.landmark},{addressData?.city},{addressData?.state},{addressData?.pinocde} <span class="slash"> -</span>{addressData?.pincode}</span>
                                                <span>{addressData?.phone}</span>
                                                <span>{addressData?.email}</span>
                                            </span>
                                        </label>
                                   
                            
                            </div>

                                   <div className="order_button pt-3">
                                
                            </div>                    
                        </div>
                    </form>
                </div>
                <div className="col-lg-6 col-md-6">
                    <form >
                        <h3>Your order</h3>
                        <div className="order_table table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  {
                                    cartData.map((item)=>{
                                      return(
                                        <tr>    
                                        <td><img src={`/uploads/${item.product[0].imgpath}`} style={{width:"4rem" , height:"4rem"}}></img> {item.product[0].product_name}<strong> × {item.quantity}</strong></td>
                                        <td> {item.product[0].selling_price * item.quantity}</td>
                                    </tr>
                                      )
                                    })
                                  }
                                                                      
                                </tbody>
                                {/* <SubTotal1 iteam={cartData}/> */}
                                <tfoot>
                                    <tr>
                                        {
                                            coupanName===""? "":
                                            <>
                                                <th>Coupan Discount<span> ({coupanName})</span></th>
                                        <td><strong>{Math.round(-CoupanDiscountPrice)}</strong></td>
                                            </>
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            wbalance > 0 ?
                                            <>
                                                <th>Balance Discount</th>
                                        <td><strong>{Math.round(-wbalance)}</strong></td>
                                            </>
                                            :
                                            ""
                                        }
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td><strong>+40</strong></td>
                                    </tr>
                                    <tr className="order_total">
                                        <th>Order Total</th>
                                        <td><strong>{Math.round(totalAmountlocation)}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="payment_method">
                            <div className="panel-default">
                                {/* <label className="checkbox-default" for="currencyCod" data-bs-toggle="collapse"
                                    data-bs-target="#methodCod">
                                    <input type="checkbox" id="currencyCod"/>
                                    <span>{totalAmountlocation}</span>
                                    <span>Cash on Delivery</span>
                                </label> */}
                                <Form.Check
                    type={"radio"}
                    label={`Cash on Delivery`}
                    name="paymentmethod"
                    value={"cod"}
                    onChange={(e)=>setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Razorpay Online Payment`}
                    name="paymentmethod"
                    value={"razorpay"}
                    onChange={(e)=>setStatus(e.target.value)}
                  />

                                
                            </div>
                            
                            <div className="order_button pt-3">
                                <NavLink className="btn btn-md btn-black-default-hover"  onClick={orderHandler}>CONTINUE</NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
    </div>
</div>
        
            </>
  )
}

export default Checkout
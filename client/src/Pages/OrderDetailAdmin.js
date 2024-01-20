import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import moment from "moment";
import AdminHeader from './AdminHeader';

const OrderDetailAdmin = () => {

    const [order,setOrder] = useState("")
    const[products,setProducts] = useState([])
    const[address,setAddress] = useState([])
    const [order_status, setOrder_status] = useState("")
    const {id} = useParams("")
    const navigate = useNavigate();

    console.log("jiya",order_status);
    const updateOrder = async(e) =>{
        e.preventDefault()
        const token = localStorage.getItem("usersdatatoken")
        console.log("soel ::",order_status);
        const updateStatus = await fetch(`/updateorderstatus/${id}`,{
            method:"PATCH",
            headers:{
                Accept : "application/json",
                "Content-Type" :"application/json",
                "Authorization": token
            },
            credentials: "include",
            body:JSON.stringify({
                orderStatus : order_status
            })

            
        })
        const res = await updateStatus.json();
        
        if(updateStatus.status === 422 || !res){
                alert("fill the data")
        }else{
            navigate("/orders")
            console.log("data updated");
        }
    
    }
    const orderDetail = async() =>{
        const token = localStorage.getItem("usersdatatoken")
        const res = await fetch(`/order/${id}`,{
            method : "GET",
            headers:{
                Accept :"application/json",
                "Content-Type" :"application/json",
                "Authorization":token
            },
            credentials : "include"
        })

        console.log(res);
        const data = await res.json();
        if(res.status!==201){
            alert("NO data availble")
        }else{
            setOrder(data?.order)
            setProducts(data?.order?.products)
            setAddress(data?.order?.shipping_address)
            setOrder_status(data?.order.orderStatus)
        }
    }

    useEffect(()=>{
        orderDetail();
    },[])
console.log(order);
console.log(products);
console.log(products[0]?.product[0]?.imgpath);
console.log(address);

  return (
    <>

    <AdminHeader/>

   

            <div className="wishlish-table-wrapper" data-aos="fade-up" data-aos-delay="0" style={{marginTop:"2rem"}}>
    <div className="container">
        <div className="row">
            <div className="col-12">
                <div className="table_desc">
                    <div className="table_page table-responsive">
                        <table>
                           
                            <thead>
                                <tr>
                                    <th className="product_remove">Date</th>
                                    <th className="product_thumb">Image</th>
                                    <th className="product_name">Product</th>
                                    <th className="product-price">Price</th>
                                    <th className="product_stock">Status</th>
                                    <th className="product_addcart">Total </th>
                                </tr>
                            </thead> 
                            <tbody>
                                
                           {

                                products.map((item,index)=>{
                                    return(
                                        <>
                                             <tr>
                                                <td class="product_remove"><a href="#">{moment(order.orderDate).format("L")} </a>
                                                </td>
                                            <td class="product_thumb"><a ><img
                                                        src={`/uploads/${item.product[0].imgpath}`}
                                                        alt=""/></a></td>
                                            <td class="product_name"><a href="product-details-default.html">{item.product[0].product_name}</a></td>
                                            <td class="product-price">${item.product[0].selling_price}.00 X {item.quantity}
                                            <del style={{fontSize:"10px"}}>₹{item?.product[0].actual_price}.00</del>
                                            </td>
                                            <td class="product_stock">
                                            <select value={order_status} onChange={(e) => setOrder_status(e.target.value)} name="order_status" selected class="form-control" >

                            <option value="processing">processing</option>
                            <option value="shipped">shipped</option>
                            <option value="deliverd">deliverd</option>
                            <option value="cancel">cancel</option>


                        </select>
                        <button type='submit' class="btn btn-gradient-primary me-2" onClick={updateOrder}>Update</button>
                        </td>
                                            <td class="product_addcart"><a href="#" class="btn btn-md btn-golden"
                                                    data-bs-toggle="modal" data-bs-target="#modalAddcart">{item.product[0].selling_price*item.quantity} </a></td>
                                        </tr>
                                        </>
                                    )
                                })
                           }
                                {/* <tr>
                                            <td class="product_remove">
                                            </td>
                                            <td class="product_thumb"></td>
                                            <td class="product_name"></td>
                                            <td class="product-price"></td>
                                            <td class="product_stock"></td>
                                            <td class="product_addcart">{order.totalPrice}<br></br>+40<br></br>{order.totalAmount}</td>
                                        </tr> */}

                                      
                              
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
            
        </div>

        <div className="coupon_area">
       <div className="container">
           <div className="row">
               <div className="col-lg-6 col-md-6">
                   <div className="coupon_code left" data-aos="fade-up" data-aos-delay="200">
                       <h3>Address </h3>
                       <div className="coupon_inner">
                           {/* <p>Enter your coupon code if you have one.</p>
                           <input className="mb-2" placeholder="Coupon code" type="text"/>
                           <button type="submit" className="btn btn-md btn-golden">Apply coupon</button> */}
                            {
                                address.map((item)=>{
                                    return(
                                        <>
                                            <span class="plan-details">
                                                <span class="plan-type">Home</span>        
                                                <span class="plan-cost">{item.fname}<span class="slash"> </span><abbr class="plan-cycle" title="month">{item.lname}</abbr></span>
                                                <span >{item.streetAddress},{item.landmark},{item.city},{item.state},{item.pinocde} <span class="slash"> -</span>{item.pincode}</span>
                                                <span>{item.phone}</span>
                                                <span>{item.email}</span>
                                            </span>
                                        </>
                                    )
                                })
                            }
                       </div>
                   </div>
               </div>
               {/* <SubTotal iteam={list}/> */}
               <div className="col-lg-6 col-md-6">
                   <div className="coupon_code right" data-aos="fade-up" data-aos-delay="400">
                       <h3>Order Totals</h3>
                       <div className="coupon_inner">
                           <div className="cart_subtotal">
                               <p>Subtotal</p>
                               <p className="cart_amount">₹{order.totalPrice}.00</p>
                           </div>
                           <div className="cart_subtotal ">
                               <p>Shipping</p>
                               <p className="cart_amount"><span>Flat Rate:</span> ₹40.00</p>
                           </div>
                           {/* <a href="#">Calculate shipping</a> */}
   
                           <div className="cart_subtotal">
                               <p>Total</p>
                               <p className="cart_amount">₹{order.totalAmount}.00</p>
                           </div>
                           {/* <div className="checkout_btn">
                               <NavLink to={"/cart/address"} className="btn btn-md btn-golden">Proceed to Checkout</NavLink>
                           </div> */}
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div> 
    </div>
</div> 
    {/* 

       {
        products.map((item)=>{
            return(<>
                {item?.product[0]?.product_name}
            </>)
        })
       }
       {
        address.map((item)=>{
            return(<>
                {item?.lname}
            </>)
        })
    } */}
    <Footer/>
    </>

  )
}

export default OrderDetailAdmin
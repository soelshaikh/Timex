import React, { useEffect, useState ,useContext} from 'react'
import Header from '../components/Header'
import { NavLink, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { toast } from 'react-toastify'
import { LoginContext } from '../components/ContextProvider/Context';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EmptyCart from './EmptyCart'
import SubTotal from './SubTotal'

const Cart = () => {

    const [list,setList] = useState([])
    const [coupanName,setCoupanName] = useState("jiya")
    const [coupanValid,setCoupanValid] = useState("")
    const [valid,setValid] = useState("")
   


    const { logindata, setLoginData } = useContext(LoginContext);

    const getCartData = async() =>{
        
        const token = localStorage.getItem("usersdatatoken")
        const res = await fetch("/getcart",{
            method :"GET",
            headers:{
                Accept : "application/json",
                "Content-Type" :"application/json",
                "Authorization": token
            },
            credentials: "include"
        })

        const data = await res.json();

        if(res.status !==201){
            toast("no Data Available")
        }else{
            setList(data);

        }
    }
    const navigate = useNavigate()
    const homeHandler = async() =>{
        navigate("/shop")
    }
    const removeProduct = async(id) =>{

            const token = localStorage.getItem("usersdatatoken")
            
            const res = await fetch(`/removecartproduct/${id}`,{
                method :"DELETE",
                headers :{
                    Accept :"Application/json",
                    "Content-Type" : "application/json",
                    "Authorization" : token
                },
                credentials : "include"
            })

            const data = await res.json();
            console.log(data);
            console.log(data.validUserOne.carts.length);

            if(res.status !== 201){
                alert("error")
            }else{
                setLoginData(data)
                toast.success("Item Removed Succesfully")
            }
    }
    const increaseQuantity = async(id) =>{

        
        const token = localStorage.getItem("usersdatatoken")
        const res = await fetch(`/addtocart/${id}`,{
            method : "POST",
            headers:{
                Accept :"applicaiton/json",
                "Content-Type" :"application/json",
                Authorization : token
            },
            credentials : "include"
        })

        const data = await res.json();

        if(res.status !== 201){
            alert("no data availble")
        }else{
            console.log(data);
            setLoginData(data)
            toast.success("Product Quantity Updated")
        }
    }
    const decreseQuantity = async(id) =>{

        
        const token = localStorage.getItem("usersdatatoken")
        const res = await fetch(`/decresequantity/${id}`,{
            method : "POST",
            headers:{
                Accept :"applicaiton/json",
                "Content-Type" :"application/json",
                Authorization : token
            },
            credentials : "include"
        })

        const data = await res.json();

        if(res.status !== 201){
            alert("no data availble")
        }else{
            console.log(data);
            setLoginData(data)
            toast.success("Product Quantity Updated")
        }
    }

    useEffect(()=>{
        getCartData();
    },[list])
   
    
  return (
    <>

    <Header/>
   
{
    logindata?.validUserOne?.carts?.length == 0  ? 
    <>
        <div class="empty-cart-section section-fluid">
        <div class="emptycart-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-10 offset-md-1 col-xl-6 offset-xl-3">
                        <div class="emptycart-content text-center">
                            <div class="image">
                                <img class="img-fluid" src="assets/images/emprt-cart/empty-cart.png" alt=""/>
                            </div>
                            <h4 class="title">Your Cart is Empty</h4>
                            <h6 class="sub-title">Sorry Mate... No item Found inside your cart!</h6>
                            <a onClick={homeHandler} class="btn btn-lg btn-golden">Continue Shopping</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</>
    :
    <>
     <div className="breadcrumb-section breadcrumb-bg-color--golden">
    <div className="breadcrumb-wrapper">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3 className="breadcrumb-title">Cart</h3>
                    <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                        <nav aria-label="breadcrumb">
                            <ul>
                                <li><NavLink to={"/"}>Home</NavLink></li>
                               
                                <li className="active" aria-current="page">Cart</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        <div className="cart-section">
   
   <div className="cart-table-wrapper" data-aos="fade-up" data-aos-delay="0">
       <div className="container">
           <div className="row">
               <div className="col-12">
                   <div className="table_desc">
                       <div className="table_page table-responsive">
                           <table>
                              
                               <thead>
                                   <tr>
                                       <th className="product_remove">Delete</th>
                                       <th className="product_thumb">Image</th>
                                       <th className="product_name">Product</th>
                                       <th className="product-price">Price</th>
                                       <th className="product_quantity">Quantity</th>
                                       <th className="product_total">Total</th>
                                   </tr>
                               </thead> 
                               <tbody>
                                  
                                   {
   
                                       list.map((item,index)=>{
                                           return(
                                               <>
                                                   <tr>
                                       <td className="product_remove" onClick={()=>removeProduct(item._id)}><NavLink ><i className="fa fa-trash-o"></i></NavLink>
                                       </td>
                                       <td className="product_thumb"><a href="product-details-default.html"><img
                                                   src={`uploads/${item.product[0].imgpath}`}
                                                  
                                                   alt=""/></a></td>
                                       <td className="product_name"><a href="product-details-default.html">{item.product[0].product_name}</a></td>
                                       <td className="product-price">₹{item.product[0].selling_price}.00</td>
                                       <td className="product_quantity">

                                        
                                        <label>
                                                                               {
                                                                                logindata?.validUserOne?.carts[index]?.quantity == 1 ? 
                                                                                "":<>
                                                                                <RemoveIcon
                                                                                    onClick={
                                                                                        () => {
                                                                                            
                                                                                            decreseQuantity(item.product[0]._id)
                                                                                        }
                                                                                    }
                                                                                style={{cursor:"pointer"}}
                                                                                />
                                                                                
                                                                                </>
                                                                               } 
                                                                               </label>
                                                                               {logindata?.validUserOne?.carts[index]?.quantity}
                                                                               
                                                                               {
                                                                                     logindata?.validUserOne?.carts[index]?.quantity == 5 ? "":<>
                                                                                         <AddIcon onClick={() => increaseQuantity(item.product[0]._id)} style={{cursor:"pointer"}}/>
                                                                                         
                                                                                     </> 
                                                                               }
                                                                              </td>
                                       <td className="product_total">₹{logindata?.validUserOne?.carts[index]?.quantity * item.product[0].selling_price}</td>
                                   </tr> 
                                               </>
                                           )
                                       })
                                   }
                                  
                               </tbody>
                           </table>
                       </div>
                       {/* <div className="cart_submit">
                           <button className="btn btn-md btn-golden" type="submit">update cart</button>
                       </div> */}
                   </div>
               </div>
           </div>
       </div>
   </div> 
               <SubTotal iteam={list}  />
   {/* <div className="coupon_area">
       <div className="container">
           <div className="row">
               <div className="col-lg-6 col-md-6">
                   <div className="coupon_code left" data-aos="fade-up" data-aos-delay="200">
                       <h3>Coupon</h3>
                       <div className="coupon_inner">
                           <p>Enter your coupon code if you have one.</p>
                           <input className="mb-2" placeholder="Coupon code" type="text" value={coupanName} onChange={(e) => setCoupanName(e.target.value)}/>
                           <button type="submit" className="btn btn-md btn-golden" onClick={applyCoupan}>Apply coupon</button>
                           
                           <div color='red'>{coupanValid}</div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>  */}
   </div>
    </>

}
    
    <Footer/>
    </>
  )
}

export default Cart
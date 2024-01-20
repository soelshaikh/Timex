import React, { useEffect, useState ,useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoginContext } from '../components/ContextProvider/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Wishlist = () => {
  const [list,setList] = useState([])
  const { logindata, setLoginData } = useContext(LoginContext);
  
  const getWishlistData = async() =>{
    
    const token = localStorage.getItem("usersdatatoken")
    const res = await fetch("/getwishlist",{
      "method" :"GET",
      headers :{
        Accept:"appliction/json",
        "Content-Type" :"application/json",
        "Authorization" : token
      },
      credentials : "include"
    })
    const data = await res.json()
    if(res.status !==201){
      alert("no Data Available")
  }else{
      setList(data);
  }
}
const navigate = useNavigate()
    const homeHandler = async() =>{
        navigate("/shop")
    }
const AddtoCart = async (id) => {


  let token = localStorage.getItem("usersdatatoken")

  const check = await fetch(`/addtocart/${id}`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": token
      },
      body: JSON.stringify({
          list
      }),
      credentials: "include"
  })

  const data = await check.json();
  if (check.status !== 201) {
      alert("no data available")
  } else {
      console.log(data);
      setLoginData(data)
      toast.success("Product Add to Cart Succesfully")

  }

}
const remove = async(id) =>{
  const token = localStorage.getItem("usersdatatoken")
  const res = await fetch(`/removewishlistproduct/${id}`,{
    method:"DELETE",
    headers:{
      Accept:"application/json",
      "Content-Type" :"application/json",
      "Authorization":token
    },
    credentials : "include"
  })

  const data = await res.json();

  if(res.status !== 201){
    alert("no data availble")
  }else{
    setLoginData(data)
    toast.success("Item Removed")
  }
}
useEffect(()=>{
  getWishlistData();
})
console.log(list);
  return (
    <>
    <Header/>
   {
    logindata?.validUserOne?.wishlists?.length === 0 ?
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
                            <h4 class="title">Your Wishlist is Empty</h4>
                            <h6 class="sub-title">Sorry Mate... No item Found inside your Wishlist!</h6>
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
     <div className="wishlist-section" style={{marginTop:"2rem"}}>

<div className="wishlish-table-wrapper" data-aos="fade-up" data-aos-delay="0">
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
                                    <th className="product_stock">Stock Status</th>
                                    <th className="product_addcart">Add To Cart</th>
                                </tr>
                            </thead> 
                            <tbody>
                                
                              {
                                  list.map((item,index)=>{
                                    return(
                                      <>
                                        <tr>
                                  <td className="product_remove" ><NavLink onClick={() => remove(item._id)}><i className="fa fa-trash-o"></i></NavLink>
                                  </td>
                                  <td className="product_thumb"><a href="product-details-default.html"><img
                                              src={`uploads/${item.product[0].imgpath}`}
                                              alt=""/></a></td>
                                  <td className="product_name"><a href="product-details-default.html">{item.product[0].product_name}</a></td>
                                  <td className="product-price">₹{item.product[0].selling_price}.00</td>
                                  <td className="product_stock">In Stock</td>
                                  <td className="product_addcart"><NavLink onClick={() =>
                                  AddtoCart(item.product[0]._id)
                                  
                                } className="btn btn-md btn-golden"
                                          data-bs-toggle="modal" data-bs-target="#modalAddcart">Add To
                                          Cart</NavLink></td>
                              </tr>
                                      </>
                                    )
                                  })
                              }
                                
                              
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 
</div>
    </>
   }
<Footer/>
    
    
    </>
  )
}

export default Wishlist
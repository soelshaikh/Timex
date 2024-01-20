import React from 'react'
import orderdone from './order.css'
import Header from './components/Header'
import {useParams,NavLink, useNavigate} from "react-router-dom"

const OrderDone = () => {
  return (
    <>
    <Header/>
        <div class="empty-cart-section section-fluid">
    <div class="emptycart-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-10 offset-md-1 col-xl-6 offset-xl-3">
                    <div class="emptycart-content text-center">
                        <div class="image">
                            <img class="img-fluid" src="assets/images/emprt-cart/png.png" alt=""/>
                        </div>
                        <h4 class="title">Your Orde is Placed Succesfully</h4>
                        <h6 class="sub-title">we notify via email</h6>
                      <NavLink to="/">

                        <a  class="btn btn-lg btn-golden">Back to HomePage</a>
                   
                        </NavLink> </div>
                </div>
            </div>
        </div>
    </div>
</div>
      </>

    
  )
}

export default OrderDone
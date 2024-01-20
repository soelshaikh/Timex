import React from 'react'

const EmptyCart = () => {
  return (
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
                            <a href="shop-grid-sidebar-left.html" class="btn btn-lg btn-golden">Continue Shopping</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default EmptyCart
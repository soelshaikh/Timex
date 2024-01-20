import React, { useContext, useEffect, useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate } from 'react-router-dom'
import { LoginContext } from '../components/ContextProvider/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {

    const {logindata,setLoginData} = useContext(LoginContext);
    const notifyLogout = () => toast("Logout Successfull!");
   
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
    
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const Login = () => {
        navigate("/login")
    }
    const [list,setList] = useState([])
    

    const logoutuser = async () => {
        console.log("aya ke ni");
        let token = localStorage.getItem("usersdatatoken");
        console.log("token :",token);

        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        console.log("respms",res );

        const data = await res.json();
        console.log(data);

        if (data.status == 201) {
            console.log("user logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            navigate("/");
        } else {
            console.log("error");
        }
    }
    const DashboardValid = async () => {

        let token = localStorage.getItem("usersdatatoken");
        console.log(token);
        const res = await fetch("http://localhost:5000/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });


        const data = await res.json();
        //console.log(data);
        if (data.status == 401 || !data) {
            console.log("User Not verify");
        } else if (data.status === 201) {
            console.log("admin verify");
            setLoginData(data)
            navigate("/admin");
        }
        else {
            console.log("user verify",data);
            setLoginData(data)
            navigate("/");
        }
    }
    const refreshHandler = (()=>{
        let token = localStorage.getItem("usersdatatoken");

        console.log(token);
        if(token != null){
            DashboardValid()
        }else{
            console.log("Nothing to do ");
        }
    })
    
    useEffect(() => {
        
        console.log("loginData in header ")
        

    }, [])

  return (
    <>
 <ToastContainer />
<header className="header-section d-none d-xl-block">
    <div className="header-wrapper">
        <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-between">
                        
                        <div className="header-logo">
                            <div className="logo">
                                <a href="index.html"><img src="assets/images/logo/logo_white.png" alt=""/></a>
                            </div>
                        </div>
                        
                        <div className="main-menu menu-color--black menu-hover-color--golden">
                            <nav>
                                <ul>
                                    <li className="has-dropdown">
                                        <NavLink className="active main-menu-link" to={"/"} onClick={refreshHandler}>Home </NavLink>
                                       
                                        {/* <ul className="sub-menu">
                                            <li><a href="index.html">Home 1</a></li>
                                            <li><a href="index-2.html">Home 2</a></li>
                                            <li><a href="index-3.html">Home 3</a></li>
                                            <li><a href="index-4.html">Home 4</a></li>
                                        </ul> */}
                                    </li>
                                    <li className="">
                                        <NavLink to={"/shop"}>Shop </NavLink>
                                       
                                        
                                    </li>
                                    <li className="">
                                        <NavLink to={"/myaccount"}>My Account </NavLink>
                                       
                                        {/* <ul className="sub-menu">
                                            <li><NavLink to={"/cart"}>Cart</NavLink></li>
                                            <li><NavLink to={"/wishlist"}>Wishlist</NavLink></li>
                                            <li><NavLink to={"/orders"}>My Orders</NavLink></li>
                                            <li><NavLink to={"/profile"}>My Profile</NavLink></li>
                                            
                                        </ul> */}
                                    </li>
                                    {/* <li className="">
                                        <a href="#">My Orders </a>
                                        
                                        <ul className="sub-menu">
                                            <li><a href="faq.html">Frequently Questions</a></li>
                                            <li><a href="privacy-policy.html">Privacy Policy</a></li>
                                            <li><a href="404.html">404 Page</a></li>
                                        </ul>
                                    </li> */}
                                    <li>
                                        <NavLink to={"/aboutus"}>About Us</NavLink>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/in/soel-shaikh/">Contact Us</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                       
                        <ul className="header-action-link action-color--black action-hover-color--golden">
                            {
                                logindata?.validUserOne ?
                                <>
                                    <li>
                                <NavLink to={"/wishlist"} className="offcanvas-toggle" >
                                    <i className="icon-heart"></i>
                                    <span className="item-count">{logindata?.validUserOne?.wishlists?.length}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/cart"} className="offcanvas-toggle">
                                    <i className="icon-bag"></i>
                                    <span className="item-count">{logindata?.validUserOne?.carts?.length}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/balance'}className="offcanvas-toggle">
                                    <i className='fa fa-inr'></i>
                                    <span className="item-count">{logindata?.validUserOne?.balance}</span>
                                </NavLink>
                            </li>
                                </>
                                :
                               <>
                                 <li>
                                <NavLink to={"/login"} className="offcanvas-toggle" >
                                    <i className="icon-heart"></i>
                                    <span className="item-count">0</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/login"} className="offcanvas-toggle">
                                    <i className="icon-bag"></i>
                                    <span className="item-count">0</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/login"} className="offcanvas-toggle">
                                    <i className='fa fa-inr'></i>
                                    <span className="item-count">0</span>
                                </NavLink>
                            </li>
                               </>

                            }
                            <li>
                                { <a href="#search">
                                    <i className="icon-magnifier"></i>
                                </a> 
                                }
                                {/* <input type="search" class="form-control" id="datatable-search-input"/>
  <label class="form-label" for="datatable-search-input">Search</label> */}
                            </li>
                            <li onClick={handleClick}>
                                            <a class="offcanvas-toggle" >
                                                <i class='fa fa-user' style={{ fontSize: "26px", marginLeft: "0.6rem" }}></i>

                                            </a>
                                </li>
                                <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            {

                                                logindata?.validUserOne ? 
                                                <div>
                                                   <MenuItem onClick={
                                                            () => {
                                                                logoutuser()
                                                                handleClose()
                                                                notifyLogout()
                                                            }}>Logout</MenuItem>
                                                </div>
                                                :
                                                    <div >
                                                        <MenuItem onClick={
                                                            () => {
                                                                Login()
                                                                handleClose()
                                                            }}>Login/Sign up</MenuItem>
                                                        {/* <MenuItem onClick={
                                                            () => {
                                                                Register()
                                                                handleClose()
                                                            }}></MenuItem> */}

                                                    </div>

                                            }


                                        </Menu>
                            <li>
                                <a href="#offcanvas-about" className="offacnvas offside-about offcanvas-toggle">
                                    <i className="icon-menu"></i>
                                </a>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>

<div className="mobile-header mobile-header-bg-color--golden section-fluid d-lg-block d-xl-none">
    <div className="container">
        <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-between">
               
                <div className="mobile-header-left">
                    <ul className="mobile-menu-logo">
                        <li>
                            <a href="index.html">
                                <div className="logo">
                                    <img src="assets/images/logo/logo_black.png" alt=""/>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div className="mobile-right-side">
                    <ul className="header-action-link action-color--black action-hover-color--golden">
                        <li>
                            <a href="#search">
                                <i className="icon-magnifier"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#offcanvas-wishlish" className="offcanvas-toggle">
                                <i className="icon-heart"></i>
                                <span className="item-count">3</span>
                            </a>
                        </li>
                        <li>
                            <NavLink to={"/cart"} className="offcanvas-toggle">
                                <i className="icon-bag"></i>
                                <span className="item-count">6</span>
                            </NavLink>
                        </li>
                        <li>
                            <a href="#mobile-menu-offcanvas" className="offcanvas-toggle offside-menu">
                                <i className="icon-menu"></i>
                            </a>
                        </li>
                    </ul>
                </div>
               
            </div>
        </div>
    </div>
</div>

<div id="mobile-menu-offcanvas" className="offcanvas offcanvas-rightside offcanvas-mobile-menu-section">
    
    <div className="offcanvas-header text-right">
        <button className="offcanvas-close"><i className="ion-android-close"></i></button>
    </div> 
    <div className="offcanvas-mobile-menu-wrapper">
        
        <div className="mobile-menu-bottom">
            
            <div className="offcanvas-menu">
                <ul>
                    <li>
                        <a href="#"><span>Home</span></a>
                        <ul className="mobile-sub-menu">
                            <li><a href="index.html">Home 1</a></li>
                            <li><a href="index-2.html">Home 2</a></li>
                            <li><a href="index-3.html">Home 3</a></li>
                            <li><a href="index-4.html">Home 4</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><span>Shop</span></a>
                        <ul className="mobile-sub-menu">
                            <li>
                                <a href="#">Shop Layout</a>
                                <ul className="mobile-sub-menu">
                                    <li><a href="shop-grid-sidebar-left.html">Grid Left Sidebar</a></li>
                                    <li><a href="shop-grid-sidebar-right.html">Grid Right Sidebar</a></li>
                                    <li><a href="shop-full-width.html">Full Width</a></li>
                                    <li><a href="shop-list-sidebar-left.html">List Left Sidebar</a></li>
                                    <li><a href="shop-list-sidebar-right.html">List Right Sidebar</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="mobile-sub-menu">
                            <li>
                                <a href="#">Shop Pages</a>
                                <ul className="mobile-sub-menu">
                                    <li><a href="cart.html">Cart</a></li>
                                    <li><a href="empty-cart.html">Empty Cart</a></li>
                                    <li><a href="wishlist.html">Wishlist</a></li>
                                    <li><a href="compare.html">Compare</a></li>
                                    <li><a href="checkout.html">Checkout</a></li>
                                    <li><a href="login.html">Login</a></li>
                                    <li><a href="my-account.html">My Account</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="mobile-sub-menu">
                            <li>
                                <a href="#">Product Single</a>
                                <ul className="mobile-sub-menu">
                                    <li><a href="product-details-default.html">Product Default</a></li>
                                    <li><a href="product-details-variable.html">Product Variable</a></li>
                                    <li><a href="product-details-affiliate.html">Product Referral</a></li>
                                    <li><a href="product-details-group.html">Product Group</a></li>
                                    <li><a href="product-details-single-slide.html">Product Slider</a></li>
                                    <li><a href="product-details-tab-left.html">Product Tab Left</a></li>
                                    <li><a href="product-details-tab-right.html">Product Tab Right</a></li>
                                    <li><a href="product-details-gallery-left.html">Product Gallery Left</a></li>
                                    <li><a href="product-details-gallery-right.html">Product Gallery Right</a></li>
                                    <li><a href="product-details-sticky-left.html">Product Sticky Left</a></li>
                                    <li><a href="product-details-sticky-right.html">Product Sticky right</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><span>Blogs</span></a>
                        <ul className="mobile-sub-menu">
                            <li>
                                <a href="#">Blog Grid</a>
                                <ul className="mobile-sub-menu">
                                    <li><a href="blog-grid-sidebar-left.html">Blog Grid Sidebar left</a></li>
                                    <li><a href="blog-grid-sidebar-right.html">Blog Grid Sidebar Right</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="blog-full-width.html">Blog Full Width</a>
                            </li>
                            <li>
                                <a href="#">Blog List</a>
                                <ul className="mobile-sub-menu">
                                    <li><a href="blog-list-sidebar-left.html">Blog List Sidebar left</a></li>
                                    <li><a href="blog-list-sidebar-right.html">Blog List Sidebar Right</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Blog Single</a>
                                <ul className="mobile-sub-menu">
                                    <li><a href="blog-single-sidebar-left.html">Blog Single Sidebar left</a></li>
                                    <li><a href="blog-single-sidebar-right.html">Blog Single Sidebar Right</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><span>Pages</span></a>
                        <ul className="mobile-sub-menu">
                            <li><a href="faq.html">Frequently Questions</a></li>
                            <li><a href="privacy-policy.html">Privacy Policy</a></li>
                            <li><a href="404.html">404 Page</a></li>
                        </ul>
                    </li>
                    <li><a href="about-us.html">About Us</a></li>
                    <li><a href="contact-us.html">Contact Us</a></li>
                </ul>
            </div> 
        </div>

        
        <div className="mobile-contact-info">
            <div className="logo">
                <a href="index.html"><img src="assets/images/logo/logo_white.png" alt=""/></a>
            </div>

            <address className="address">
                <span>Address: Your address goes here.</span>
                <span>Call Us: 0123456789, 0123456789</span>
                <span>Email: demo@example.com</span>
            </address>

            <ul className="social-link">
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
            </ul>

            <ul className="user-link">
                <li><a href="wishlist.html">Wishlist</a></li>
                <li><a href="cart.html">Cart</a></li>
                <li><a href="checkout.html">Checkout</a></li>
            </ul>
        </div>
       

    </div> 
</div>

<div id="offcanvas-about" className="offcanvas offcanvas-rightside offcanvas-mobile-about-section">
    
    <div className="offcanvas-header text-right">
        <button className="offcanvas-close"><i className="ion-android-close"></i></button>
    </div> 
    <div className="mobile-contact-info">
        <div className="logo">
            <a href="index.html"><img src="assets/images/logo/logo_white.png" alt=""/></a>
        </div>

        <address className="address">
            <span>Address: Your address goes here.</span>
            <span>Call Us: 0123456789, 0123456789</span>
            <span>Email: demo@example.com</span>
        </address>

        <ul className="social-link">
            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
            <li><a href="#"><i className="fa fa-instagram"></i></a></li>
            <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
        </ul>

        <ul className="user-link">
            <li><a href="wishlist.html">Wishlist</a></li>
            <li><a href="cart.html">Cart</a></li>
            <li><a href="checkout.html">Checkout</a></li>
        </ul>
    </div>
    
</div>

<div id="offcanvas-add-cart" className="offcanvas offcanvas-rightside offcanvas-add-cart-section">
    
    <div className="offcanvas-header text-right">
        <button className="offcanvas-close"><i className="ion-android-close"></i></button>
    </div> 
    <div className="offcanvas-add-cart-wrapper">
        <h4 className="offcanvas-title">Shopping Cart</h4>
        <ul className="offcanvas-cart">
            <li className="offcanvas-cart-item-single">
                <div className="offcanvas-cart-item-block">
                    <a href="#" className="offcanvas-cart-item-image-link">
                        <img src="assets/images/product/default/home-1/default-1.jpg" alt=""
                            className="offcanvas-cart-image"/>
                    </a>
                    <div className="offcanvas-cart-item-content">
                        <a href="#" className="offcanvas-cart-item-link">Car Wheel</a>
                        <div className="offcanvas-cart-item-details">
                            <span className="offcanvas-cart-item-details-quantity">1 x </span>
                            <span className="offcanvas-cart-item-details-price">$49.00</span>
                        </div>
                    </div>
                </div>
                <div className="offcanvas-cart-item-delete text-right">
                    <a href="#" className="offcanvas-cart-item-delete"><i className="fa fa-trash-o"></i></a>
                </div>
            </li>
            <li className="offcanvas-cart-item-single">
                <div className="offcanvas-cart-item-block">
                    <a href="#" className="offcanvas-cart-item-image-link">
                        <img src="assets/images/product/default/home-2/default-1.jpg" alt=""
                            className="offcanvas-cart-image"/>
                    </a>
                    <div className="offcanvas-cart-item-content">
                        <a href="#" className="offcanvas-cart-item-link">Car Vails</a>
                        <div className="offcanvas-cart-item-details">
                            <span className="offcanvas-cart-item-details-quantity">3 x </span>
                            <span className="offcanvas-cart-item-details-price">$500.00</span>
                        </div>
                    </div>
                </div>
                <div className="offcanvas-cart-item-delete text-right">
                    <a href="#" className="offcanvas-cart-item-delete"><i className="fa fa-trash-o"></i></a>
                </div>
            </li>
            <li className="offcanvas-cart-item-single">
                <div className="offcanvas-cart-item-block">
                    <a href="#" className="offcanvas-cart-item-image-link">
                        <img src="assets/images/product/default/home-3/default-1.jpg" alt=""
                            className="offcanvas-cart-image"/>
                    </a>
                    <div className="offcanvas-cart-item-content">
                        <a href="#" className="offcanvas-cart-item-link">Shock Absorber</a>
                        <div className="offcanvas-cart-item-details">
                            <span className="offcanvas-cart-item-details-quantity">1 x </span>
                            <span className="offcanvas-cart-item-details-price">$350.00</span>
                        </div>
                    </div>
                </div>
                <div className="offcanvas-cart-item-delete text-right">
                    <a href="#" className="offcanvas-cart-item-delete"><i className="fa fa-trash-o"></i></a>
                </div>
            </li>
        </ul>
        <div className="offcanvas-cart-total-price">
            <span className="offcanvas-cart-total-price-text">Subtotal:</span>
            <span className="offcanvas-cart-total-price-value">$170.00</span>
        </div>
        <ul className="offcanvas-cart-action-button">
            <li><a href="cart.html" className="btn btn-block btn-golden">View Cart</a></li>
            <li><a href="compare.html" className=" btn btn-block btn-golden mt-5">Checkout</a></li>
        </ul>
    </div>

</div>

<div id="offcanvas-wishlish" className="offcanvas offcanvas-rightside offcanvas-add-cart-section">
    
    <div className="offcanvas-header text-right">
        <button className="offcanvas-close"><i className="ion-android-close"></i></button>
    </div> 
    <div className="offcanvas-wishlist-wrapper">
        <h4 className="offcanvas-title">Wishlist</h4>
        <ul className="offcanvas-wishlist">
            <li className="offcanvas-wishlist-item-single">
                <div className="offcanvas-wishlist-item-block">
                    <a href="#" className="offcanvas-wishlist-item-image-link">
                        <img src="assets/images/product/default/home-1/default-1.jpg" alt=""
                            className="offcanvas-wishlist-image"/>
                    </a>
                    <div className="offcanvas-wishlist-item-content">
                        <a href="#" className="offcanvas-wishlist-item-link">Car Wheel</a>
                        <div className="offcanvas-wishlist-item-details">
                            <span className="offcanvas-wishlist-item-details-quantity">1 x </span>
                            <span className="offcanvas-wishlist-item-details-price">$49.00</span>
                        </div>
                    </div>
                </div>
                <div className="offcanvas-wishlist-item-delete text-right">
                    <a href="#" className="offcanvas-wishlist-item-delete"><i className="fa fa-trash-o"></i></a>
                </div>
            </li>
            <li className="offcanvas-wishlist-item-single">
                <div className="offcanvas-wishlist-item-block">
                    <a href="#" className="offcanvas-wishlist-item-image-link">
                        <img src="assets/images/product/default/home-2/default-1.jpg" alt=""
                            className="offcanvas-wishlist-image"/>
                    </a>
                    <div className="offcanvas-wishlist-item-content">
                        <a href="#" className="offcanvas-wishlist-item-link">Car Vails</a>
                        <div className="offcanvas-wishlist-item-details">
                            <span className="offcanvas-wishlist-item-details-quantity">3 x </span>
                            <span className="offcanvas-wishlist-item-details-price">$500.00</span>
                        </div>
                    </div>
                </div>
                <div className="offcanvas-wishlist-item-delete text-right">
                    <a href="#" className="offcanvas-wishlist-item-delete"><i className="fa fa-trash-o"></i></a>
                </div>
            </li>
            <li className="offcanvas-wishlist-item-single">
                <div className="offcanvas-wishlist-item-block">
                    <a href="#" className="offcanvas-wishlist-item-image-link">
                        <img src="assets/images/product/default/home-3/default-1.jpg" alt=""
                            className="offcanvas-wishlist-image"/>
                    </a>
                    <div className="offcanvas-wishlist-item-content">
                        <a href="#" className="offcanvas-wishlist-item-link">Shock Absorber</a>
                        <div className="offcanvas-wishlist-item-details">
                            <span className="offcanvas-wishlist-item-details-quantity">1 x </span>
                            <span className="offcanvas-wishlist-item-details-price">$350.00</span>
                        </div>
                    </div>
                </div>
                <div className="offcanvas-wishlist-item-delete text-right">
                    <a href="#" className="offcanvas-wishlist-item-delete"><i className="fa fa-trash-o"></i></a>
                </div>
            </li>
        </ul>
        <ul className="offcanvas-wishlist-action-button">
            <li><a href="#" className="btn btn-block btn-golden">View wishlist</a></li>
        </ul>
    </div> 

</div>
<div id="search" className="search-modal">
    <button type="button" className="close">×</button>
    <form>
        <input type="search" placeholder="type keyword(s) here" />
        <button type="submit" className="btn btn-lg btn-golden">Search</button>
    </form>
</div>

<div className="offcanvas-overlay"></div>

<button className="material-scrolltop" type="button"></button>

<div className="modal fade" id="modalQuickview" tabindex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog  modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col text-right">
                            <button type="button" className="close modal-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true"> <i className="fa fa-times"></i></span>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="product-details-gallery-area mb-7">
                                
                                <div className="product-large-image modal-product-image-large swiper-container">
                                    <div className="swiper-wrapper">
                                        <div className="product-image-large-image swiper-slide img-responsive">
                                            <img src="assets/images/product/default/home-1/default-1.jpg" alt=""/>
                                        </div>
                                        <div className="product-image-large-image swiper-slide img-responsive">
                                            <img src="assets/images/product/default/home-1/default-2.jpg" alt=""/>
                                        </div>
                                        <div className="product-image-large-image swiper-slide img-responsive">
                                            <img src="assets/images/product/default/home-1/default-3.jpg" alt=""/>
                                        </div>
                                        <div className="product-image-large-image swiper-slide img-responsive">
                                            <img src="assets/images/product/default/home-1/default-4.jpg" alt=""/>
                                        </div>
                                        <div className="product-image-large-image swiper-slide img-responsive">
                                            <img src="assets/images/product/default/home-1/default-5.jpg" alt=""/>
                                        </div>
                                        <div className="product-image-large-image swiper-slide img-responsive">
                                            <img src="assets/images/product/default/home-1/default-6.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                               
                                <div
                                    className="product-image-thumb modal-product-image-thumb swiper-container pos-relative mt-5">
                                    <div className="swiper-wrapper">
                                        <div className="product-image-thumb-single swiper-slide">
                                            <img className="img-fluid"
                                                src="assets/images/product/default/home-1/default-1.jpg" alt=""/>
                                        </div>
                                        <div className="product-image-thumb-single swiper-slide">
                                            <img className="img-fluid"
                                                src="assets/images/product/default/home-1/default-2.jpg" alt=""/>
                                        </div>
                                        <div className="product-image-thumb-single swiper-slide">
                                            <img className="img-fluid"
                                                src="assets/images/product/default/home-1/default-3.jpg" alt=""/>
                                        </div>
                                        <div className="product-image-thumb-single swiper-slide">
                                            <img className="img-fluid"
                                                src="assets/images/product/default/home-1/default-4.jpg" alt=""/>
                                        </div>
                                        <div className="product-image-thumb-single swiper-slide">
                                            <img className="img-fluid"
                                                src="assets/images/product/default/home-1/default-5.jpg" alt=""/>
                                        </div>
                                        <div className="product-image-thumb-single swiper-slide">
                                            <img className="img-fluid"
                                                src="assets/images/product/default/home-1/default-6.jpg" alt=""/>
                                        </div>
                                    </div>
                                    
                                    <div className="gallery-thumb-arrow swiper-button-next"></div>
                                    <div className="gallery-thumb-arrow swiper-button-prev"></div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="modal-product-details-content-area">
                                
                                <div className="product-details-text">
                                    <h4 className="title">Nonstick Dishwasher PFOA</h4>
                                    <div className="price"><del>$70.00</del>$80.00</div>
                                </div> 
                                <div className="product-details-variable">
                                   
                                    <div className="variable-single-item">
                                        <span>Color</span>
                                        <div className="product-variable-color">
                                            <label for="modal-product-color-red">
                                                <input name="modal-product-color" id="modal-product-color-red"
                                                    className="color-select" type="radio" checked/>
                                                <span className="product-color-red"></span>
                                            </label>
                                            <label for="modal-product-color-tomato">
                                                <input name="modal-product-color" id="modal-product-color-tomato"
                                                    className="color-select" type="radio"/>
                                                <span className="product-color-tomato"></span>
                                            </label>
                                            <label for="modal-product-color-green">
                                                <input name="modal-product-color" id="modal-product-color-green"
                                                    className="color-select" type="radio"/>
                                                <span className="product-color-green"></span>
                                            </label>
                                            <label for="modal-product-color-light-green">
                                                <input name="modal-product-color"
                                                    id="modal-product-color-light-green" className="color-select"
                                                    type="radio"/>
                                                <span className="product-color-light-green"></span>
                                            </label>
                                            <label for="modal-product-color-blue">
                                                <input name="modal-product-color" id="modal-product-color-blue"
                                                    className="color-select" type="radio"/>
                                                <span className="product-color-blue"></span>
                                            </label>
                                            <label for="modal-product-color-light-blue">
                                                <input name="modal-product-color"
                                                    id="modal-product-color-light-blue" className="color-select"
                                                    type="radio"/>
                                                <span className="product-color-light-blue"></span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex align-items-center flex-wrap">
                                        <div className="variable-single-item ">
                                            <span>Quantity</span>
                                            <div className="product-variable-quantity">
                                                <input min="1" max="100" value="1" type="number"/>
                                            </div>
                                        </div>

                                        <div className="product-add-to-cart-btn">
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#modalAddcart">Add To
                                                Cart</a>
                                        </div>
                                    </div>
                                </div> 
                                <div className="modal-product-about-text">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia iste
                                        laborum ad impedit pariatur esse optio tempora sint ullam autem deleniti nam
                                        in quos qui nemo ipsum numquam, reiciendis maiores quidem aperiam, rerum vel
                                        recusandae</p>
                                </div>
                                
                                <div className="modal-product-details-social">
                                    <span className="title">SHARE THIS PRODUCT</span>
                                    <ul>
                                        <li><a href="#" className="facebook"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#" className="twitter"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#" className="pinterest"><i className="fa fa-pinterest"></i></a></li>
                                        <li><a href="#" className="google-plus"><i className="fa fa-google-plus"></i></a>
                                        </li>
                                        <li><a href="#" className="linkedin"><i className="fa fa-linkedin"></i></a></li>
                                    </ul>

                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default Header
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Dropdown from 'react-bootstrap/Dropdown';

import { LoginContext } from '../components/ContextProvider/Context';
import { toast } from 'react-toastify';

const Shop = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
    const [search,setSearch] = useState("")
    
    const navigate = useNavigate()
    const login = () =>{
        navigate("/login")
    }

    const [list,setList] = useState([])
    console.log(list);
    const getProducts = async() =>{

        const res = await fetch(`/getactiveproduct/?search=${search}`,{
            method :"GET",
            headers : {
                "Content-Type" :"Application/json"
            }
        })

            const data = await res.json();

            if(res.status === 422 || !data){
                console.log("error");
            }else{
                setList(data)
            }
       
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

      const addWishlist = async(id) =>{
        let token = localStorage.getItem("usersdatatoken")
        console.log(token)
        const api_call = await fetch(`/addtowishlist/${id}`,{
            method:"POST",
            headers :{
                Accept : "application/json",
                "Content-Type" :"application/json",
                "Authorization" : token
    
            },
            body:JSON.stringify({
                list
            }),
            credentials : "include"
    
        })
        console.log(api_call);
    
        const res = await api_call.json();
        console.log(res.status);       
        if(api_call.status === 201){
            console.log(res);
            setLoginData(res)
            toast.success("Product Add to Wishlist Succesfully")
        }else if(api_call.status === 202){
            console.log(res);
            toast.error("Product ALready in Wishlist")
        }else{
            toast.error("no data availble")
        }
    }
    useEffect(()=>{
        getProducts();
    },[search])
  return (
    <>
    <Header/>
    <div className="breadcrumb-section breadcrumb-bg-color--golden">
        <div className="breadcrumb-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* <h3 className="breadcrumb-title">Shop - Grid Left Sidebar</h3> */}
                        <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                            <nav aria-label="breadcrumb">
                                <ul>
                                    <li><NavLink to={"/"}>Home</NavLink></li>
                                    <li><NavLink to={"/shop"}>Shop</NavLink></li>
                                    {/* <li className="active" aria-current="page">Shop Grid Left Sidebar</li> */}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    <div className="shop-section">
        <div className="container">
            <div className="row flex-column-reverse flex-lg-row">
                <div className="col-lg-3">
                    
                    <div className="siderbar-section" data-aos="fade-up" data-aos-delay="0">

                        
                        <div className="sidebar-single-widget">
                            <h6 className="sidebar-title">CATEGORIES</h6>
                            <div className="sidebar-content">
                                <ul className="sidebar-menu">
                                    <li>
                                        <ul className="sidebar-menu-collapse">
                                           
                                            <li className="sidebar-menu-collapse-list">
                                                <div className="accordion">
                                                    <a href="#" className="accordion-title collapsed"
                                                        data-bs-toggle="collapse" data-bs-target="#men-fashion"
                                                        aria-expanded="false">Men <i
                                                            className="ion-ios-arrow-right"></i></a>
                                                    <div id="men-fashion" className="collapse">
                                                        <ul className="accordion-category-list">
                                                            <li><a href="#">Dresses</a></li>
                                                            <li><a href="#">Jackets &amp; Coats</a></li>
                                                            <li><a href="#">Sweaters</a></li>
                                                            <li><a href="#">Jeans</a></li>
                                                            <li><a href="#">Blouses &amp; Shirts</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li> 
                                        </ul>
                                    </li>
                                    <li><a href="#">Football</a></li>
                                    <li><a href="#"> Men's</a></li>
                                    <li><a href="#"> Portable Audio</a></li>
                                    <li><a href="#"> Smart Watches</a></li>
                                    <li><a href="#">Tennis</a></li>
                                    <li><a href="#"> Uncategorized</a></li>
                                    <li><a href="#"> Video Games</a></li>
                                    <li><a href="#">Women's</a></li>
                                </ul>
                            </div>
                        </div> 
                        <div className="sidebar-single-widget">
                            <h6 className="sidebar-title">FILTER BY PRICE</h6>
                            <div className="sidebar-content">
                                <div id="slider-range"></div>
                                <div className="filter-type-price">
                                    <label for="amount">Price range:</label>
                                    <input type="text" id="amount"/>
                                </div>
                            </div>
                        </div> 
                        <div className="sidebar-single-widget">
                            <h6 className="sidebar-title">MANUFACTURER</h6>
                            <div className="sidebar-content">
                                <div className="filter-type-select">
                                    <ul>
                                        <li>
                                            <label className="checkbox-default" for="brakeParts">
                                                <input type="checkbox" id="brakeParts"/>
                                                <span>Brake Parts(6)</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="checkbox-default" for="accessories">
                                                <input type="checkbox" id="accessories"/>
                                                <span>Accessories (10)</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="checkbox-default" for="EngineParts">
                                                <input type="checkbox" id="EngineParts"/>
                                                <span>Engine Parts (4)</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="checkbox-default" for="hermes">
                                                <input type="checkbox" id="hermes"/>
                                                <span>hermes (10)</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="checkbox-default" for="tommyHilfiger">
                                                <input type="checkbox" id="tommyHilfiger"/>
                                                <span>Tommy Hilfiger(7)</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div> 
                        <div className="sidebar-single-widget">
                            <h6 className="sidebar-title">SELECT BY COLOR</h6>
                            <div className="sidebar-content">
                                <div className="filter-type-select">
                                    <ul>
                                        <li>
                                            <label className="checkbox-default" for="black">
                                                <input type="checkbox" id="black"/>
                                                <span>Black (6)</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="checkbox-default" for="blue">
                                                <input type="checkbox" id="blue"/>
                                                <span>Blue (8)</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="checkbox-default" for="brown">
                                                <input type="checkbox" id="brown"/>
                                                <span>Brown (10)</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="checkbox-default" for="Green">
                                                <input type="checkbox" id="Green"/>
                                                <span>Green (6)</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="checkbox-default" for="pink">
                                                <input type="checkbox" id="pink"/>
                                                <span>Pink (4)</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div> 
                        <div className="sidebar-single-widget">
                            <h6 className="sidebar-title">Tag products</h6>
                            <div className="sidebar-content">
                                <div className="tag-link">
                                    <a href="#">asian</a>
                                    <a href="#">brown</a>
                                    <a href="#">euro</a>
                                    <a href="#">fashion</a>
                                    <a href="#">hat</a>
                                    <a href="#">t-shirt</a>
                                    <a href="#">teen</a>
                                    <a href="#">travel</a>
                                    <a href="#">white</a>
                                </div>
                            </div>
                        </div> 
                        <div className="sidebar-single-widget">
                            <div className="sidebar-content">
                                <a href="product-details-default.html" className="sidebar-banner img-hover-zoom">
                                    <img className="img-fluid" src="assets/images/banner/side-banner.jpg" alt=""/>
                                </a>
                            </div>
                        </div> 

                    </div> 
                </div>

                <div className="col-lg-9">

                <input type="search" class="form-control" id="datatable-search-input" placeholder='Search for Products' onChange={(e)=>setSearch(e.target.value)} style={{marginBottom:"2rem"}}/>
  {/* <label class="form-label" for="datatable-search-input">Search</label>                     */}
                    <div className="shop-sort-section">
                        <div className="container">
                            <div className="row">
                                
                                <div className="sort-box d-flex justify-content-between align-items-md-center align-items-start flex-md-row flex-column"
                                    data-aos="fade-up" data-aos-delay="0">
                                    
                                    <div className="sort-tablist d-flex align-items-center">
                                        <ul className="tablist nav sort-tab-btn">
                                            <li><a className="nav-link active" data-bs-toggle="tab"
                                                    href="#layout-3-grid"><img src="assets/images/icons/bkg_grid.png"
                                                        alt=""/></a></li>
                                            <li><a className="nav-link" data-bs-toggle="tab" href="#layout-list"><img
                                                        src="assets/images/icons/bkg_list.png" alt=""/></a></li>
                                        </ul>

                                        
                                        <div className="page-amount ml-2">
                                            <span>Showing 1–8 of {list.length} results</span>
                                        </div> 
                                    </div> 

                                    
                                    <div className="sort-select-list d-flex align-items-center">
                                        <label className="mr-2">Sort By:</label>
                                        <form action="#">
                                            <fieldset>
                                                {/* <select name="speed" id="speed">
                                                    
                                                    <option selected="selected">Sort by newness</option>
                                                    <option onClick={() => setSort("lowtohigh")}>Sort by price: low to high</option>
                                                    <option onClick={() => setSort("hightolow")}>Sort by price: high to low</option>
                                                    
                                                </select> */}
                 
                                            </fieldset>
                                        </form>
                                    </div> 


                                </div> 
                            </div>
                        </div>
                    </div> 

                    
                    {
                        list.length === 0 ?
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
                            <h4 class="title">Result is Not Found</h4>
                            <h6 class="sub-title">Sorry Mate... No item Found </h6>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                        </>:
                        <>
                            <div className="sort-product-tab-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="tab-content tab-animate-zoom">
                                        
                                        <div className="tab-pane active show sort-layout-single" id="layout-3-grid">
                                            <div className="row">
                                                {

                                                    list.map((item,index)=>{
                                                        return(
                                                            <div className="col-xl-4 col-sm-6 col-12">
                                                  
                                                    <div className="product-default-single-item product-color--golden"
                                                        data-aos="fade-up" data-aos-delay="0">
                                                        <div className="image-box">
                                                            <NavLink to={`/productDetail/${item._id}`} className="image-link">
                                                                <img src={`/uploads/${item.imgpath}`}
                                                               
                                                                    alt=""/>
                                                                {/* <img src="assets/images/product/default/home-1/default-10.jpg"
                                                                    alt=""/> */}
                                                            </NavLink>
                                                            <div className="action-link">
                                                                {
                                                                    logindata?.validUserOne ? <>
                                                                    <div className="action-link-left">
                                                                    <NavLink onClick={() => AddtoCart(item._id)} data-bs-toggle="modal"
                                                                        data-bs-target="#modalAddcart">Add to Cart</NavLink>
                                                                </div>
                                                                <div className="action-link-right">
                                                                    {/* <a href="#" data-bs-toggle="modal"
                                                                        data-bs-target="#modalQuickview"><i
                                                                            className="icon-magnifier"></i></a> */}
                                                                    <NavLink onClick={() => addWishlist(item._id)} ><i
                                                                            className="icon-heart"></i></NavLink>
                                                                    {/* <a href="compare.html"><i
                                                                            className="icon-shuffle"></i></a> */}
                                                                </div>
                                                                    </> :
                                                                    <>
                                                                    <div className="action-link-left">
                                                                    <NavLink onClick={login} data-bs-toggle="modal"
                                                                        data-bs-target="#modalAddcart">Add to Cart</NavLink>
                                                                </div>
                                                                <div className="action-link-right">
                                                                    {/* <a href="#" data-bs-toggle="modal"
                                                                        data-bs-target="#modalQuickview"><i
                                                                            className="icon-magnifier"></i></a> */}
                                                                    <NavLink to={"/login"}><i
                                                                            className="icon-heart"></i></NavLink>
                                                                    {/* <a href="compare.html"><i
                                                                            className="icon-shuffle"></i></a> */}
                                                                </div>
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="content">
                                                            <div className="content-left">
                                                                <h6 className="title"><NavLink
                                                                       to={`/productDetail/${item._id}`}>{item.product_name}</NavLink></h6>
                                                                <ul className="review-star">
                                                                    <li className="fill"><i className="ion-android-star"></i>
                                                                    </li>
                                                                    <li className="fill"><i className="ion-android-star"></i>
                                                                    </li>
                                                                    <li className="fill"><i className="ion-android-star"></i>
                                                                    </li>
                                                                    <li className="fill"><i className="ion-android-star"></i>
                                                                    </li>
                                                                    <li className="empty"><i className="ion-android-star"></i>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="content-right">
                                                                <span className="price">₹{item.selling_price}.00</span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                                        )
                                                    })
                                                }
                                               
                                                
                                            </div>
                                        </div>
                                        <div className="tab-pane sort-layout-single" id="layout-list">
                                            <div className="row">
                                               {
                                                list.map((item,index)=>{
                                                    return(
                                                        <div className="col-12">
                                                    
                                                        <div className="product-list-single product-color--golden">
                                                            <NavLink to={`/productDetail/${item._id}`}
                                                                className="product-list-img-link">
                                                                <img className="img-fluid"
                                                                    src={`/uploads/${item.imgpath}`}
                                                                    alt=""/>
                                                                {/* <img className="img-fluid"
                                                                    src="assets/images/product/default/home-1/default-2.jpg"
                                                                    alt=""/> */}
                                                            </NavLink>
                                                            <div className="product-list-content">
                                                                <h5 className="product-list-link"><NavLink
                                                                       to={`/productDetail/${item._id}`}>{item.product_name}</NavLink></h5>
                                                                <ul className="review-star">
                                                                    <li className="fill"><i className="ion-android-star"></i></li>
                                                                    <li className="fill"><i className="ion-android-star"></i></li>
                                                                    <li className="fill"><i className="ion-android-star"></i></li>
                                                                    <li className="fill"><i className="ion-android-star"></i></li>
                                                                    <li className="empty"><i className="ion-android-star"></i></li>
                                                                </ul>
                                                                <span className="product-list-price"><del>₹ {item.actual_price}.00 </del>
                                                                ₹ {item.selling_price}.00</span>
                                                                <p>{item.description}</p>
                                                                <div className="product-action-icon-link-list">
                                                                    {

                                                                        logindata?.validUserOne ? <>
                                                                            <a onClick={() => AddtoCart(item._id)} data-bs-toggle="modal"
                                                                        data-bs-target="#modalAddcart"
                                                                        className="btn btn-lg btn-black-default-hover">Add to
                                                                        cart</a>
                                                                    {/* <a href="#" data-bs-toggle="modal"
                                                                        data-bs-target="#modalQuickview"
                                                                        className="btn btn-lg btn-black-default-hover"><i
                                                                            className="icon-magnifier"></i></a> */}
                                                                    <a onClick={() => addWishlist(item._id)}
                                                                        className="btn btn-lg btn-black-default-hover"><i
                                                                            className="icon-heart"></i></a>
                                                                    {/* <a href="compare.html"
                                                                        className="btn btn-lg btn-black-default-hover"><i
                                                                            className="icon-shuffle"></i></a> */}
                                                                        </>
                                                                        :<>
                                                                            <a onClick={login} data-bs-toggle="modal"
                                                                        data-bs-target="#modalAddcart"
                                                                        className="btn btn-lg btn-black-default-hover">Add to
                                                                        cart</a>
                                                                    {/* <a href="#" data-bs-toggle="modal"
                                                                        data-bs-target="#modalQuickview"
                                                                        className="btn btn-lg btn-black-default-hover"><i
                                                                            className="icon-magnifier"></i></a> */}
                                                                    <NavLink to={"/login"}
                                                                        className="btn btn-lg btn-black-default-hover"><i
                                                                            className="icon-heart"></i></NavLink>
                                                                    {/* <a href="compare.html"
                                                                        className="btn btn-lg btn-black-default-hover"><i
                                                                            className="icon-shuffle"></i></a> */}
                                                                        </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    )
                                                })
                                               }
                                               
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="page-pagination text-center" data-aos="fade-up" data-aos-delay="0">
                        <ul>
                            <li><a className="active" href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#"><i className="ion-ios-skipforward"></i></a></li>
                        </ul>
                    </div> 
                        </>
                    }
                </div>
            </div>
        </div>
    </div>

    <Footer/>
    
    </>
  )
}

export default Shop
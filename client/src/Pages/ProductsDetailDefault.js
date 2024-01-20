import React, { useEffect, useState,useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { LoginContext } from '../components/ContextProvider/Context';
const ProductsDetailDefault = () => {

    const { id } = useParams("");
    const [item, setItem] = useState("")
    const [list, setList] = useState([])
    const { logindata, setLoginData } = useContext(LoginContext);
    console.log(list);
    console.log(item);
    console.log(id);
    const getProductDetail = async () => {
        const res = await fetch(`/getproduct/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            }

        })
        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error");
        } else {
            setItem(data)
        }
    }
    const getCategory = async () => {
        const res = await fetch("/getcategory", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            }
        })
        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error");
        } else {
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
                item
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
    const navigate = useNavigate()
    const login = () =>{
        navigate("/login")
    }
    const addWishlist = async (id) => {
        let token = localStorage.getItem("usersdatatoken")
        console.log(token)
        const api_call = await fetch(`/addtowishlist/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": token

            },
            body: JSON.stringify({
                item
            }),
            credentials: "include"

        })
        console.log(api_call);

        const res = await api_call.json();
        console.log(res);
        // if (api_call.status !== 201) {
        //     alert("no data available")
        // } else {
        //     console.log(res);
        //     toast.success("Product Add to Wishlist Succesfully")

        // }
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

    useEffect(() => {
        getProductDetail()
        getCategory()
    }, [])
    return (
        <>
            <Header />
            <div className="breadcrumb-section breadcrumb-bg-color--golden">
                <div className="breadcrumb-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {/* <h3 className="breadcrumb-title">Product Details - Default</h3> */}
                                <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                                    <nav aria-label="breadcrumb">
                                        <ul>
                                            <li><NavLink to={"/"}>Home</NavLink></li>
                                            <li><NavLink to={"/shop"}>Shop</NavLink></li>
                                            <li className="active" aria-current="page">{item.product_name}</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-details-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5 col-lg-6">
                            <div className="product-details-gallery-area" data-aos="fade-up" data-aos-delay="0">

                                <div className="product-large-image product-large-image-horaizontal swiper-container">
                                    <div className="swiper-wrapper">
                                        <div className="product-image-large-image swiper-slide zoom-image-hover img-responsive">
                                            <img src={`/uploads/${item.imgpath}`} alt="ooooo" />
                                        </div>
                                        <div className="product-image-large-image swiper-slide zoom-image-hover img-responsive">
                                            <img src="assets/images/product/default/home-1/default-2.jpg" alt="" />
                                        </div>
                                        <div className="product-image-large-image swiper-slide zoom-image-hover img-responsive">
                                            <img src="assets/images/product/default/home-1/default-3.jpg" alt="" />
                                        </div>
                                        <div className="product-image-large-image swiper-slide zoom-image-hover img-responsive">
                                            <img src="assets/images/product/default/home-1/default-4.jpg" alt="" />
                                        </div>
                                        <div className="product-image-large-image swiper-slide zoom-image-hover img-responsive">
                                            <img src="assets/images/product/default/home-1/default-5.jpg" alt="" />
                                        </div>
                                        <div className="product-image-large-image swiper-slide zoom-image-hover img-responsive">
                                            <img src="assets/images/product/default/home-1/default-6.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="product-image-thumb product-image-thumb-horizontal swiper-container pos-relative mt-5">
                                    <div className="swiper-wrapper">
                                        <div className="product-image-thumb-single swiper-slide">
                                            <img className="img-fluid" src="assets/images/product/default/home-1/default-1.jpg"
                                                alt="" />
                                        </div>
                                        <div className="product-image-thumb-single swiper-slide">
                                            <img className="img-fluid" src="assets/images/product/default/home-1/default-2.jpg"
                                                alt="" />
                                        </div>
                                        <div className="product-image-thumb-single swiper-slide">
                                            <img className="img-fluid" src="assets/images/product/default/home-1/default-3.jpg"
                                                alt="" />
                                        </div>
                                        <div className="product-image-thumb-single swiper-slide">
                                            <img className="img-fluid" src="assets/images/product/default/home-1/default-4.jpg"
                                                alt="" />
                                        </div>
                                        <div className="product-image-thumb-single swiper-slide">
                                            <img className="img-fluid" src="assets/images/product/default/home-1/default-5.jpg"
                                                alt="" />
                                        </div>
                                        <div className="product-image-thumb-single swiper-slide">
                                            <img className="img-fluid" src="assets/images/product/default/home-1/default-6.jpg"
                                                alt="" />
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-6">
                            <div className="product-details-content-area product-details--golden" data-aos="fade-up"
                                data-aos-delay="200">

                                <div className="product-details-text">
                                    <h4 className="title">{item.product_name}</h4>
                                    <div className="d-flex align-items-center">
                                        <ul className="review-star">
                                            <li className="fill"><i className="ion-android-star"></i></li>
                                            <li className="fill"><i className="ion-android-star"></i></li>
                                            <li className="fill"><i className="ion-android-star"></i></li>
                                            <li className="fill"><i className="ion-android-star"></i></li>
                                            <li className="empty"><i className="ion-android-star"></i></li>
                                        </ul>
                                        <a href="#" className="customer-review ml-2">(customer review )</a>
                                    </div>
                                    <div className="price">₹ {item.selling_price}.00</div>
                                    <p>{item.description}.</p>
                                </div>
                                <div className="product-details-variable">
                                    <h4 className="title">Available Options</h4>

                                    <div className="variable-single-item">
                                        <div className="product-stock"> <span className="product-stock-in"><i
                                            className="ion-checkmark-circled"></i></span> {item.countInStock} IN STOCK</div>
                                    </div>

                                    <div className="d-flex align-items-center ">
                                        <div className="variable-single-item ">
                                            <span>Quantity</span>
                                            <div className="product-variable-quantity">
                                                <input min="1" max="100" value="1" type="number" disabled />
                                            </div>
                                        </div>

                                        {

                                            logindata?.validUserOne ? <>
                                                <div className="product-add-to-cart-btn">
                                            {
                                                item.countInStock===0?
                                                <>
                                                <div className="variable-single-item">
                                        <div className="product-stock" style={{color:"red"}}> <span className="product-stock-in"><i
                                            className="ion-checkmark-circled" ></i></span > Currently unavailable. </div>
                                    </div>

                                                                                               
                                                </>:
                                                <>
                                                                                                <a onClick={() => { AddtoCart(item._id) }} className="btn btn-block btn-lg btn-black-default-hover"
                                                data-bs-toggle="modal" data-bs-target="#modalAddcart">+ Add To Cart</a>
                                                </>
                                            }
                                        </div>
                                            </>
                                            :
                                            
                                            <>
                                            <div className="product-add-to-cart-btn">
                                            <NavLink onClick={login} className="btn btn-block btn-lg btn-black-default-hover"
                                                data-bs-toggle="modal" data-bs-target="#modalAddcart">+ Add To Cart</NavLink>
                                        </div>
                                            </>
                                        }
                                    </div>

                                    <div className="product-details-meta mb-20">
                                        {

                                            logindata?.validUserOne ?
                                            <>
                                                <a onClick={() => addWishlist(item._id)} className="icon-space-right" style={{ cursor: "pointer" }}><i className="icon-heart" style={{ cursor: "pointer" }}></i>Add to
                                            wishlist</a>
                                            </>
                                            :
                                            <>
                                                <a onClick={login} className="icon-space-right" style={{ cursor: "pointer" }}><i className="icon-heart" style={{ cursor: "pointer" }}></i>Add to
                                            wishlist</a>
                                            </>
                                        }
                                        {/* <a href="compare.html" className="icon-space-right"><i className="icon-refresh"></i>Compare</a> */}
                                    </div>
                                </div>
                                <div className="product-details-catagory mb-2">
                                    <span className="title">CATEGORIES:</span>
                                    <ul>
                                        {
                                            list.map((item, index) => {
                                                return (
                                                    <li><NavLink to={`/category/${item._id}`}>{item.catName}</NavLink></li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                                <div className="product-details-social">
                                    <span className="title">SHARE THIS PRODUCT:</span>
                                    <ul>
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-pinterest"></i></a></li>
                                        <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductsDetailDefault
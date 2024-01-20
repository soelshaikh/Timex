import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import {   Scrollbar, A11y } from 'swiper';
import { NavLink, useNavigate } from 'react-router-dom';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from "../components/Header"
import Footer from "../components/Footer"
import { LoginContext } from '../components/ContextProvider/Context';
import { toast } from 'react-toastify';
import { Offline, Online } from "react-detect-offline"
const moment = require("moment");
const Home = () => {

    const [list, setList] = useState([])
    console.log(list);
    const { logindata, setLoginData } = useContext(LoginContext);
 
    const navigate = useNavigate();
    //console.log(logindata?.validUserOne?.email);
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
        console.log(data);
        if (data.status == 401 || !data) {
            console.log("User Not verify");
        } else if (data.status === 201) {
            console.log("admin verify");
            setLoginData(data)
            navigate("/admin");
        }
        else {
            console.log("user verify");
            setLoginData(data)
            navigate("/");
        }
    }

    const getfeaturedproduct = async () => {

        const res = await fetch("/getfeaturedproduct", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json();
        if (res.status === 422 || !data) {
            console.log("error");
        } else {
            setList(data)
        }
    }
    const login = () =>{
        navigate("/login")
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

    // if(api_call.status!==201){
    //     alert("no data available")
    // }else{
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
    const AddtoCart = async(id) =>{
    
        let token = localStorage.getItem("usersdatatoken")

        const check = await fetch(`/addtocart/${id}`,{
            method :"POST",
            headers:{
                Accept : "application/json",
                "Content-Type":"application/json",
                "Authorization" : token
            },
            body:JSON.stringify({
                list
            }),
            credentials : "include"
        })

        const data = await check.json();
        if(check.status!==201){
            alert("no data available")
        }else{
            setLoginData(data)
            console.log(data);
            toast.success("Product Add to Cart Succesfully")
            
        }

    }
    useEffect(() => {

        DashboardValid()
        getfeaturedproduct();
        
        
        // setTimeout(() => {
        //     window.location.reload()
        // }, 8640000);
    },[])
    return (
<>
<Offline>You're offline right now. Check your connection.</Offline>
        <Online>
        <>

<Header />
{/* <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]}
spaceBetween={1000}
slidesPerView={1}
navigation
pagination={{ clickable: true }}
scrollbar={{ draggable: true }}
onSwiper={(swiper) => console.log(swiper)}
onSlideChange={() => console.log('slide change')}> */}
<Swiper
spaceBetween={30}
centeredSlides={true}
autoplay={{
delay: 2500,
disableOnInteraction: false,
}}
// pagination={{
//   clickable: true,
// }}
// navigation={true}
modules={[Autoplay]}
className="mySwiper"
// style={{maxHeight:"300px"}}
>
    <SwiperSlide >

        <NavLink to={"/shop"}>
            <img src="https://www.titan.co.in/wps/wcm/connect/titanrt/fb2e8cc7-2df6-4a7b-9d24-58aaef4b82d0/desktop/TD_LatestTrend_160823.jpg?MOD=AJPERES&amp;CACHEID=ROOTWORKSPACE.Z18_90IA1H80OGR2D068O7K5LN3O26-fb2e8cc7-2df6-4a7b-9d24-58aaef4b82d0-desktop-oDZoowY"                 style={{ maxWidth: "100%",
        height: "100%"}} alt="" />
        </NavLink>

    </SwiperSlide>
    <SwiperSlide>
        <NavLink to={"/shop"}>

            <img src="https://www.titan.co.in/wps/wcm/connect/titanrt/9a307d6d-a5cb-4c52-84b0-57b719fd0d1d/desktop/TD_LBSahid_090723.jpg?MOD=AJPERES&amp;CACHEID=ROOTWORKSPACE.Z18_90IA1H80OGR2D068O7K5LN3O26-9a307d6d-a5cb-4c52-84b0-57b719fd0d1d-desktop-oDTZTQy" style={{ maxWidth: "100%",
        height: "100%"}} alt="" />
        </NavLink>
    </SwiperSlide>
    <SwiperSlide>
        <NavLink to={"/shop"}>

            <img src="https://www.titan.co.in/wps/wcm/connect/titanrt/c38c544a-fd29-45d3-973b-29c72001952f/desktop/TD_Bestsellers_210723.jpg?MOD=AJPERES&amp;CACHEID=ROOTWORKSPACE.Z18_90IA1H80OGR2D068O7K5LN3O26-c38c544a-fd29-45d3-973b-29c72001952f-desktop-oBSvx1G" style={{ maxWidth: "100%",
        height: "100%"}} alt="" />
        </NavLink>

    </SwiperSlide>
    {/* <SwiperSlide>
        <NavLink to={"/shop"}>

        <img src="https://cdn.shopify.com/s/files/1/0548/8849/7221/files/MicrosoftTeams-image_28_1500x.png?v=1672315255" alt="" />
        </NavLink>
        </SwiperSlide>
    <SwiperSlide>
        <NavLink to={"/shop"}>

        <img src="https://cdn.shopify.com/s/files/1/0548/8849/7221/files/MicrosoftTeams-image_45_1500x.png?v=1672904392" alt="" />
        </NavLink>
        </SwiperSlide> */}

</Swiper>


<div className="service-promo-section section-top-gap-100">
    <div className="service-wrapper">
        <div className="container">
            <div className="row">

                <div className="col-lg-3 col-sm-6 col-12">
                    <div className="service-promo-single-item" data-aos="fade-up" data-aos-delay="0" >
                        <div className="image">
                            <img src="assets/images/icons/service-promo-1.png" alt="" />
                        </div>
                        <div className="content">
                            <h6 className="title">FREE SHIPPING</h6>
                            <p>Get 10% cash back, free shipping, free returns, and more at 1000+ top retailers!</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                    <div className="service-promo-single-item" data-aos="fade-up" data-aos-delay="200">
                        <div className="image">
                            <img src="assets/images/icons/service-promo-2.png" alt="" />
                        </div>
                        <div className="content">
                            <h6 className="title">30 DAYS MONEY BACK</h6>
                            <p>100% satisfaction guaranteed, or get your money back within 30 days!</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                    <div className="service-promo-single-item" data-aos="fade-up" data-aos-delay="400">
                        <div className="image">
                            <img src="assets/images/icons/service-promo-3.png" alt="" />
                        </div>
                        <div className="content">
                            <h6 className="title">SAFE PAYMENT</h6>
                            <p>Pay with the world’s most popular and secure payment methods.</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                    <div className="service-promo-single-item" data-aos="fade-up" data-aos-delay="600" >
                        <div className="image">
                            <img src="assets/images/icons/service-promo-4.png" alt="" />
                        </div>
                        <div className="content">
                            <h6 className="title">LOYALTY CUSTOMER</h6>
                            <p>Card for the other 30% of their purchases at a rate of 1% cash back.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<div className="banner-section section-top-gap-100 section-fluid">
    <div className="banner-wrapper">
        <div className="container-fluid">
            <div className="row mb-n6">

                <div className="col-lg-6 col-12 mb-6">

                    <div className="banner-single-item banner-style-1 banner-animation img-responsive"
                        data-aos="fade-up" data-aos-delay="0">
                        <div className="image">
                            <img src="https://staticimg.titan.co.in/Titan/Catalog/2652NM01_1.jpg?impolicy=pqmed&imwidth=640" alt="" style={{ height: "500px" }} />
                        </div>
                        <div className="content">
                            {/* <h4 className="title">Mini rechargeable
                    Table Lamp - E216</h4>
                <h5 className="sub-title">We design your home</h5> */}
                            <NavLink to="/category/63fb2a4951915d055dc7446d" 
                                className="btn btn-lg btn-outline-golden icon-space-left"><span
                                    className="d-flex align-items-center">discover now <i
                                        className="ion-ios-arrow-thin-right"></i></span></NavLink>
                        </div>
                    </div>

                </div>

                <div className="col-lg-6 col-12 mb-6">
                    <div className="row mb-n6">

                        <div className="col-lg-6 col-sm-6 mb-6">
                            <div className="banner-single-item banner-style-2 banner-animation img-responsive"
                                data-aos="fade-up" data-aos-delay="0">
                                    
                                <div className="image">
                                    <img src="https://rukminim2.flixcart.com/image/832/832/kxjav0w0/ring/n/a/i/adjustable-1-z61-ring-rspr-original-imag9ypdxgdwheyf.jpeg?q=70" alt="" style={{ height:"250px",borderRadius: "10%" }} />
                                </div>
                                <div className="content">
                                    {/* <h4 className="title">Kitchen <br/>
                            utensils</h4>
                        <a href="product-details-default.html" className="link-text"><span>Shop
                                now</span></a> */}
                                <NavLink to="/category/63fb2ab951915d055dc746aa" 
                                className="btn btn-lg btn-outline-golden icon-space-left"><span
                                    className="d-flex align-items-center">discover now <i
                                        className="ion-ios-arrow-thin-right"></i></span></NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-6 mb-6">
                            <div className="banner-single-item banner-style-2 banner-animation img-responsive"
                                data-aos="fade-up" data-aos-delay="200">
                                <div className="image">
                                    <img src="https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/f/l/l/-original-imagqe28rzj9ymbz.jpeg?q=70" style={{borderRadius:"10%"}} alt="" />
                                </div>
                                <div className="content">
                                    {/* <h4 className="title">Sofas and <br/>
                            Armchairs</h4>
                        <a href="product-details-default.html" className="link-text"><span>Shop
                                now</span></a> */}
                                 <NavLink to="/category/63fb2a7f51915d055dc745da" 
                                className="btn btn-lg btn-outline-golden icon-space-left"><span
                                    className="d-flex align-items-center">discover now <i
                                        className="ion-ios-arrow-thin-right"></i></span></NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-6 mb-6">
                            <div className="banner-single-item banner-style-2 banner-animation img-responsive"
                                data-aos="fade-up" data-aos-delay="0">
                                <div className="image">
                                    <img src="https://rukminim2.flixcart.com/image/832/832/xif0q/wallet-card-wallet/3/w/h/-original-imagqwxn5uyg6s6f.jpeg?q=70" style={{borderRadius:"10%"}} alt="" />
                                </div>
                                <div className="content">
                                    {/* <h4 className="title">Chair & Bar<br/>
                            stools</h4>
                        <a href="product-details-default.html" className="link-text"><span>Shop
                                now</span></a> */}
                                <NavLink to="/category/63fb2a8f51915d055dc74626" 
                                className="btn btn-lg btn-outline-golden icon-space-left"><span
                                    className="d-flex align-items-center">discover now <i
                                        className="ion-ios-arrow-thin-right"></i></span></NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-6 mb-6">
                            <div className="banner-single-item banner-style-2 banner-animation img-responsive"
                                data-aos="fade-up" data-aos-delay="200">
                                <div className="image">
                                    <img src="https://assets.ajio.com/medias/sys_master/root/20230628/mrX2/649b5082eebac147fc0f60ae/-473Wx593H-465601331-black-MODEL.jpg" style={{borderRadius:"10%"}} alt="" />
                                </div>
                                <div className="content">
                                    {/* <h4>Interior <br/>
                            lighting</h4>
                        <a href="product-details-default.html"><span>Shop now</span></a> */}
                         <NavLink to="/category/63fb2a5751915d055dc744a9" 
                                className="btn btn-lg btn-outline-golden icon-space-left"><span
                                    className="d-flex align-items-center">discover now <i
                                        className="ion-ios-arrow-thin-right"></i></span></NavLink>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<div className="product-default-slider-section section-top-gap-100 section-fluid">

    <div className="section-title-wrapper" data-aos="fade-up" data-aos-delay="0">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="section-content-gap">
                        <div className="secton-content">
                            <h3 className="section-title">THE NEW ARRIVALS</h3>
                            <p>Preorder now to receive exclusive deals & gifts</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="" data-aos="fade-up" data-aos-delay="200">
        <div className="">
            <div className="">
                <div className="">
                    <div className="">

                        <div className="">

                            <div className="">

                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={30}
                                    loop={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={true}
                                    modules={[Navigation]}
                                    className="mySwiper"
                                >
                                    {/* <SwiperSlide>

    <div className="product-default-single-item product-color--golden swiper-slide">
                        <div className="image-box">
                            <a href="product-details-default.html" className="image-link">
                                <img src="assets/images/product/default/home-1/default-5.jpg" alt=""/>
                                <img src="assets/images/product/default/home-1/default-6.jpg" alt=""/>
                            </a>
                            <div className="tag">
                                <span>sale</span>
                            </div>
                            <div className="action-link">
                                <div className="action-link-left">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                </div>
                                <div className="action-link-right">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalQuickview"><i
                                            className="icon-magnifier"></i></a>
                                    <a href="wishlist.html"><i className="icon-heart"></i></a>
                                    <a href="compare.html"><i className="icon-shuffle"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <h6 className="title"><a href="product-details-default.html">Cras neque
                                        metus</a></h6>
                                <ul className="review-star">
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="empty"><i className="ion-android-star"></i></li>
                                </ul>
                            </div>
                            <div className="content-right">
                                <span className="price"><del>$70.00</del> $60.00</span>
                            </div>

                        </div>
                    </div>
                  

    </SwiperSlide> */}
                                    {
                                        list.map((item, index) => {
                                            return (

                                                <>
                                                    <SwiperSlide>

                                                        <div className="product-default-single-item product-color--golden swiper-slide">
                                                            <div className="image-box">
                                                                <NavLink to={`/productDetail/${item._id}`} className="image-link">
                                                                    <img src={`uploads/${item.imgpath}`} alt="" />
                                                                    
                                                                    {/* <img src="assets/images/product/default/home-1/default-6.jpg" alt="" /> */}
                                                                </NavLink>
                                                                <div className="tag">
                                                                    <span>sale</span>
                                                                </div>
{
item.countInStock == 0 ?
""
:
<div className="action-link">
<div className="action-link-left">
{
logindata?.validUserOne ?
<>
    <a onClick={() => AddtoCart(item._id)} data-bs-toggle="modal"
data-bs-target="#modalAddcart" style={{cursor:"pointer"}}>Add to Cart</a>
</>
:
<>
<a onClick={login} data-bs-toggle="modal"
data-bs-target="#modalAddcart" style={{cursor:"pointer"}}>Add to Cart</a>
</>

}
</div>
<div className="action-link-right">
{/* <a href="#" data-bs-toggle="modal"
data-bs-target="#modalQuickview"><i
    className="icon-magnifier"></i></a> */}
{
logindata?.validUserOne ? 
<>
<NavLink onClick={() => addWishlist(item._id)}><i className="icon-heart"></i></NavLink>
</>
:
<>
<NavLink to={"/login"}><i className="icon-heart"></i></NavLink>
</>
}
{/* <a href="compare.html"><i className="icon-shuffle"></i></a> */}
</div>
</div>  
}
                                                            </div>
                                                            <div className="content">
                                                                <div className="content-left">
                                                                    <h6 className="title"><a href="product-details-default.html">{item.product_name}</a></h6>
                                                                    <ul className="review-star">
                                                                        <li className="fill"><i className="ion-android-star"></i></li>
                                                                        <li className="fill"><i className="ion-android-star"></i></li>
                                                                        <li className="fill"><i className="ion-android-star"></i></li>
                                                                        <li className="fill"><i className="ion-android-star"></i></li>
                                                                        <li className="empty"><i className="ion-android-star"></i></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="content-right">
                                                                    <span className="price"><del>₹{item.actual_price}.00</del> ₹{item.selling_price}.00</span>
                                                                </div>

                                                            </div>
                                                        </div>


                                                    </SwiperSlide>
                                                </>
                                            )
                                        })
                                    }




                                </Swiper>

                                {/* <div className="product-default-single-item product-color--golden swiper-slide">
                        <div className="image-box">
                            <a href="product-details-default.html" className="image-link">
                                <img src="assets/images/product/default/home-1/default-1.jpg" alt=""/>
                                <img src="assets/images/product/default/home-1/default-2.jpg" alt=""/>
                            </a>
                            <div className="tag">
                                <span>sale</span>
                            </div>
                            <div className="action-link">
                                <div className="action-link-left">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                </div>
                                <div className="action-link-right">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalQuickview"><i
                                            className="icon-magnifier"></i></a>
                                    <a href="wishlist.html"><i className="icon-heart"></i></a>
                                    <a href="compare.html"><i className="icon-shuffle"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <h6 className="title"><a href="product-details-default.html">Aliquam
                                        lobortis</a></h6>
                                <ul className="review-star">
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="empty"><i className="ion-android-star"></i></li>
                                </ul>
                            </div>
                            <div className="content-right">
                                <span className="price">$75.00 - $85.00</span>
                            </div>

                        </div>
                    </div> */}

                                {/* <div className="product-default-single-item product-color--golden swiper-slide">
                        <div className="image-box">
                            <a href="product-details-default.html" className="image-link">
                                <img src="assets/images/product/default/home-1/default-3.jpg" alt=""/>
                                <img src="assets/images/product/default/home-1/default-4.jpg" alt=""/>
                            </a>
                            <div className="tag">
                                <span>sale</span>
                            </div>
                            <div className="action-link">
                                <div className="action-link-left">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                </div>
                                <div className="action-link-right">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalQuickview"><i
                                            className="icon-magnifier"></i></a>
                                    <a href="wishlist.html"><i className="icon-heart"></i></a>
                                    <a href="compare.html"><i className="icon-shuffle"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <h6 className="title"><a href="product-details-default.html">Condimentum
                                        posuere</a></h6>
                                <ul className="review-star">
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="empty"><i className="ion-android-star"></i></li>
                                </ul>
                            </div>
                            <div className="content-right">
                                <span className="price"><del>$89.00</del> $80.00</span>
                            </div>

                        </div>
                    </div>
                   
                    <div className="product-default-single-item product-color--golden swiper-slide">
                        <div className="image-box">
                            <a href="product-details-default.html" className="image-link">
                                <img src="assets/images/product/default/home-1/default-5.jpg" alt=""/>
                                <img src="assets/images/product/default/home-1/default-6.jpg" alt=""/>
                            </a>
                            <div className="tag">
                                <span>sale</span>
                            </div>
                            <div className="action-link">
                                <div className="action-link-left">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                </div>
                                <div className="action-link-right">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalQuickview"><i
                                            className="icon-magnifier"></i></a>
                                    <a href="wishlist.html"><i className="icon-heart"></i></a>
                                    <a href="compare.html"><i className="icon-shuffle"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <h6 className="title"><a href="product-details-default.html">Cras neque
                                        metus</a></h6>
                                <ul className="review-star">
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="empty"><i className="ion-android-star"></i></li>
                                </ul>
                            </div>
                            <div className="content-right">
                                <span className="price"><del>$70.00</del> $60.00</span>
                            </div>

                        </div>
                    </div>
                    
                    <div className="product-default-single-item product-color--golden swiper-slide">
                        <div className="image-box">
                            <a href="product-details-default.html" className="image-link">
                                <img src="assets/images/product/default/home-1/default-7.jpg" alt=""/>
                                <img src="assets/images/product/default/home-1/default-8.jpg" alt=""/>
                            </a>
                            <div className="action-link">
                                <div className="action-link-left">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                </div>
                                <div className="action-link-right">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalQuickview"><i
                                            className="icon-magnifier"></i></a>
                                    <a href="wishlist.html"><i className="icon-heart"></i></a>
                                    <a href="compare.html"><i className="icon-shuffle"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <h6 className="title"><a href="product-details-default.html">Donec eu libero
                                        ac</a></h6>
                                <ul className="review-star">
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="empty"><i className="ion-android-star"></i></li>
                                </ul>
                            </div>
                            <div className="content-right">
                                <span className="price">$74</span>
                            </div>

                        </div>
                    </div>
                    
                    <div className="product-default-single-item product-color--golden swiper-slide">
                        <div className="image-box">
                            <a href="product-details-default.html" className="image-link">
                                <img src="assets/images/product/default/home-1/default-9.jpg" alt=""/>
                                <img src="assets/images/product/default/home-1/default-10.jpg" alt=""/>
                            </a>
                            <div className="action-link">
                                <div className="action-link-left">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                </div>
                                <div className="action-link-right">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalQuickview"><i
                                            className="icon-magnifier"></i></a>
                                    <a href="wishlist.html"><i className="icon-heart"></i></a>
                                    <a href="compare.html"><i className="icon-shuffle"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <h6 className="title"><a href="product-details-default.html">Epicuri per
                                        lobortis</a></h6>
                                <ul className="review-star">
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="empty"><i className="ion-android-star"></i></li>
                                </ul>
                            </div>
                            <div className="content-right">
                                <span className="price">$68</span>
                            </div>

                        </div>
                    </div>
                    
                    <div className="product-default-single-item product-color--golden swiper-slide">
                        <div className="image-box">
                            <a href="product-details-default.html" className="image-link">
                                <img src="assets/images/product/default/home-1/default-11.jpg" alt=""/>
                                <img src="assets/images/product/default/home-1/default-3.jpg" alt=""/>
                            </a>
                            <div className="action-link">
                                <div className="action-link-left">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                </div>
                                <div className="action-link-right">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalQuickview"><i
                                            className="icon-magnifier"></i></a>
                                    <a href="wishlist.html"><i className="icon-heart"></i></a>
                                    <a href="compare.html"><i className="icon-shuffle"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <h6 className="title"><a href="product-details-default.html">Kaoreet
                                        lobortis sagit</a></h6>
                                <ul className="review-star">
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="empty"><i className="ion-android-star"></i></li>
                                </ul>
                            </div>
                            <div className="content-right">
                                <span className="price">$95.00</span>
                            </div>

                        </div>
                    </div>
                    
                    <div className="product-default-single-item product-color--golden swiper-slide">
                        <div className="image-box">
                            <a href="product-details-default.html" className="image-link">
                                <img src="assets/images/product/default/home-1/default-5.jpg" alt=""/>
                                <img src="assets/images/product/default/home-1/default-7.jpg" alt=""/>
                            </a>
                            <div className="action-link">
                                <div className="action-link-left">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                </div>
                                <div className="action-link-right">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalQuickview"><i
                                            className="icon-magnifier"></i></a>
                                    <a href="wishlist.html"><i className="icon-heart"></i></a>
                                    <a href="compare.html"><i className="icon-shuffle"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <h6 className="title"><a href="product-details-default.html">Condimentum
                                        posuere</a></h6>
                                <ul className="review-star">
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="empty"><i className="ion-android-star"></i></li>
                                </ul>
                            </div>
                            <div className="content-right">
                                <span className="price">$115.00</span>
                            </div>

                        </div>
                    </div>
                    
                    <div className="product-default-single-item product-color--golden swiper-slide">
                        <div className="image-box">
                            <a href="product-details-default.html" className="image-link">
                                <img src="assets/images/product/default/home-1/default-6.jpg" alt=""/>
                                <img src="assets/images/product/default/home-1/default-9.jpg" alt=""/>
                            </a>
                            <div className="action-link">
                                <div className="action-link-left">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                </div>
                                <div className="action-link-right">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalQuickview"><i
                                            className="icon-magnifier"></i></a>
                                    <a href="wishlist.html"><i className="icon-heart"></i></a>
                                    <a href="compare.html"><i className="icon-shuffle"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <h6 className="title"><a href="product-details-default.html">Convallis quam
                                        sit</a></h6>
                                <ul className="review-star">
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="empty"><i className="ion-android-star"></i></li>
                                </ul>
                            </div>
                            <div className="content-right">
                                <span className="price">$75.00 - $85.00</span>
                            </div>

                        </div>
                    </div>
                    
                    <div className="product-default-single-item product-color--golden swiper-slide">
                        <div className="image-box">
                            <a href="product-details-default.html" className="image-link">
                                <img src="assets/images/product/default/home-1/default-3.jpg" alt=""/>
                                <img src="assets/images/product/default/home-1/default-5.jpg" alt=""/>
                            </a>
                            <div className="action-link">
                                <div className="action-link-left">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                </div>
                                <div className="action-link-right">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalQuickview"><i
                                            className="icon-magnifier"></i></a>
                                    <a href="wishlist.html"><i className="icon-heart"></i></a>
                                    <a href="compare.html"><i className="icon-shuffle"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <h6 className="title"><a href="product-details-default.html">Dolorum fuga
                                        eget</a></h6>
                                <ul className="review-star">
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="empty"><i className="ion-android-star"></i></li>
                                </ul>
                            </div>
                            <div className="content-right">
                                <span className="price">$71.00</span>
                            </div>

                        </div>
                    </div>
                   
                    <div className="product-default-single-item product-color--golden swiper-slide">
                        <div className="image-box">
                            <a href="product-details-default.html" className="image-link">
                                <img src="assets/images/product/default/home-1/default-4.jpg" alt=""/>
                                <img src="assets/images/product/default/home-1/default-7.jpg" alt=""/>
                            </a>
                            <div className="tag">
                                <span>sale</span>
                            </div>
                            <div className="action-link">
                                <div className="action-link-left">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                </div>
                                <div className="action-link-right">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalQuickview"><i
                                            className="icon-magnifier"></i></a>
                                    <a href="wishlist.html"><i className="icon-heart"></i></a>
                                    <a href="compare.html"><i className="icon-shuffle"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <h6 className="title"><a href="product-details-default.html">Duis pulvinar
                                        obortis</a></h6>
                                <ul className="review-star">
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="empty"><i className="ion-android-star"></i></li>
                                </ul>
                            </div>
                            <div className="content-right">
                                <span className="price"><del>$84.00</del> $75.00</span>
                            </div>

                        </div>
                    </div>
                    
                    <div className="product-default-single-item product-color--golden swiper-slide">
                        <div className="image-box">
                            <a href="product-details-default.html" className="image-link">
                                <img src="assets/images/product/default/home-1/default-5.jpg" alt=""/>
                                <img src="assets/images/product/default/home-1/default-8.jpg" alt=""/>
                            </a>
                            <div className="action-link">
                                <div className="action-link-left">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                </div>
                                <div className="action-link-right">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalQuickview"><i
                                            className="icon-magnifier"></i></a>
                                    <a href="wishlist.html"><i className="icon-heart"></i></a>
                                    <a href="compare.html"><i className="icon-shuffle"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <h6 className="title"><a href="product-details-default.html">Dolorum fuga
                                        eget</a></h6>
                                <ul className="review-star">
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="empty"><i className="ion-android-star"></i></li>
                                </ul>
                            </div>
                            <div className="content-right">
                                <span className="price">$90</span>
                            </div>

                        </div>
                    </div>
                    
                    <div className="product-default-single-item product-color--golden swiper-slide">
                        <div className="image-box">
                            <a href="product-details-default.html" className="image-link">
                                <img src="assets/images/product/default/home-1/default-10.jpg" alt=""/>
                                <img src="assets/images/product/default/home-1/default-6.jpg" alt=""/>
                            </a>
                            <div className="action-link">
                                <div className="action-link-left">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalAddcart">Add to Cart</a>
                                </div>
                                <div className="action-link-right">
                                    <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#modalQuickview"><i
                                            className="icon-magnifier"></i></a>
                                    <a href="wishlist.html"><i className="icon-heart"></i></a>
                                    <a href="compare.html"><i className="icon-shuffle"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <h6 className="title"><a href="product-details-default.html">Duis pulvinar
                                        obortis</a></h6>
                                <ul className="review-star">
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="fill"><i className="ion-android-star"></i></li>
                                    <li className="empty"><i className="ion-android-star"></i></li>
                                </ul>
                            </div>
                            <div className="content-right">
                                <span className="price">$86.00</span>
                            </div>

                        </div>
                    </div> */}

                            </div>
                        </div>

                        {/* <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


{/* <div className="banner-section" style={{marginTop:"100px"}}>
    <div className="banner-wrapper clearfix">

        <div className="banner-single-item banner-style-4 banner-animation banner-color--golden float-left img-responsive"
            data-aos="fade-up" data-aos-delay="0">
            <div className="image">
                <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/0356/9850/7909/products/zeb-yoga-10-pic1_1024x1024.jpg?v=1668168321" alt="" />
            </div>
            <a href="product-details-default.html" className="content">
                <div className="inner">
                    <h4 className="title">Bar Stool</h4>
                    <h6 className="sub-title">20 products</h6>
                </div>
                <span className="round-btn"><i className="ion-ios-arrow-thin-right"></i></span>
            </a>
        </div>

        <div className="banner-single-item banner-style-4 banner-animation banner-color--golden float-left img-responsive"
            data-aos="fade-up" data-aos-delay="200">
            <div className="image">
                <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/0356/9850/7909/products/Zeb-SoundBombS101-pic1_1024x1024.jpg?v=1644993292" alt="" />
            </div>
            <a href="product-details-default.html" className="content">
                <div className="inner">
                    <h4 className="title">Armchairs</h4>
                    <h6 className="sub-title">20 products</h6>
                </div>
                <span className="round-btn"><i className="ion-ios-arrow-thin-right"></i></span>
            </a>
        </div>

        <div className="banner-single-item banner-style-4 banner-animation banner-color--golden float-left img-responsive"
            data-aos="fade-up" data-aos-delay="400">
            <div className="image">
                <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/0356/9850/7909/products/zeb-storm-pic1_1024x1024.jpg?v=1622614372" alt="" />
            </div>
            <a href="product-details-default.html" className="content">
                <div className="inner">
                    <h4 className="title">lighting</h4>
                    <h6 className="sub-title">20 products</h6>
                </div>
                <span className="round-btn"><i className="ion-ios-arrow-thin-right"></i></span>
            </a>
        </div>

        <div className="banner-single-item banner-style-4 banner-animation banner-color--golden float-left img-responsive"
            data-aos="fade-up" data-aos-delay="600">
            <div className="image">
                <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/0548/8849/7221/files/MicrosoftTeams-image_3_a5a0783a-4326-489c-8927-72cceb6e2f69_533x.png?v=1675317992" alt="" />
            </div>
            <a href="product-details-default.html" className="content">
                <div className="inner">
                    <h4 className="title">Easy chairs</h4>
                    <h6 className="sub-title">20 products</h6>
                </div>
                <span className="round-btn"><i className="ion-ios-arrow-thin-right"></i></span>
            </a>
        </div>

    </div>
</div> */}

{/* <div className="banner-section section-top-gap-100">
    <div className="banner-wrapper clearfix">
        <NavLink to={"/shop"}>
            <div className="banner-single-item banner-style-7 banner-animation banner-color--green float-left"
            >
                <div className="image">
                    <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/0356/9850/7909/products/zeb-yoga-10-pic1_1024x1024.jpg?v=1668168321" alt="" />
                </div>
            </div>
        </NavLink>
        <NavLink to={"/shop"}>
            <div className="banner-single-item banner-style-7 banner-animation banner-color--green float-left"
            >
                <div className="image">
                    <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/0356/9850/7909/products/Zeb-SoundBombS101-pic1_1024x1024.jpg?v=1644993292" alt="" />
                </div>
            </div>
        </NavLink>
        <NavLink to={"/shop"}>
            <div className="banner-single-item banner-style-7 banner-animation banner-color--green float-left"
            >
                <div className="image">
                    <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/0356/9850/7909/products/zeb-storm-pic1_1024x1024.jpg?v=1622614372" alt="" />
                </div>
            </div>
        </NavLink>
    </div>
</div> */}

<Footer />

</>
        </Online>

</>

    )
}
AOS.init();
export default Home
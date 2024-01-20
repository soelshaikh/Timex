import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { LoginContext } from '../components/ContextProvider/Context';

const SubTotal = (iteam) => {

    
    const [price, setPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [coupanValid, setCoupanValid] = useState("")
    const [coupanName, setCoupanName] = useState("")
    const [coupanDiscount, setCoupanDiscount] = useState("")
    const [beforeDisocunt, setBeforeDiscount] = useState("")
    const [input, setInput] = useState(true)
    const [color, setColor] = useState("")
    const [balance, setBalance] = useState("")
    const [wbalance, setWbalance] = useState(0)
    const [ApplyBalance, setApplyBalance] = useState(false)
    const [balanceDiscount, setBalanceDiscount] = useState(0)
    const [coupanDiscountPrice, setcoupanDiscountPrice] = useState("")
    const [AFTERCoupanDiscount, setAFTERCoupanDiscount] = useState(0)
    const [AFTERCoupanDiscountPrice,setAFTERCoupanDiscountPrice] = useState(0)
    const [valid, setValid] = useState("")


    // console.log(iteam);
    const { logindata, setLoginData } = useContext(LoginContext);



    const applyCoupan = async (e) => {
        e.preventDefault();
        console.log(coupanName);
        console.log("jiyaaa");
        const token = localStorage.getItem("usersdatatoken")
        const res = await fetch("/applycoupan", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                coupanName
            })
        })

        const data = await res.json();
        console.log(data);

        if (data.status == 422 || !res) {
            console.log("error");
            setColor("red")
            setCoupanValid("Coupan is not valid")

        } else {
            //setValid(data.coupanid)
            console.log("success");
            setCoupanDiscount(data.coupanValid.coupanDiscount)
            setInput(false)
            setColor("green")
            setCoupanValid("Coupan Applied Succesfully")
            removeBalance();
            //    applyBalance();

        }
    }

    const applyBalance = async (e) => {
        
        if((beforeDisocunt - coupanDiscountPrice) > balance){
            setBalanceDiscount(balance)
        }else{
            setBalanceDiscount(AFTERCoupanDiscount)
        }

        // if (balance > AFTERCoupanDiscount) {
        //     console.log("1");
        //     setBalanceDiscount(AFTERCoupanDiscount)
        // } else {
        //     console.log("2");
        //     setBalanceDiscount(balance)
        // }

        console.log(balanceDiscount);
        setApplyBalance(true)

    }
    const removeCoupan = async (e) => {
        setCoupanName("")
        setCoupanValid("")
        setInput(true)
        setCoupanDiscount(0)
    }
    const removeBalance = async (e) => {
        setBalanceDiscount(0)
        setApplyBalance(false)
    }
    const totalAmount = () => {
        let price = 0;
        let afteCoupanDisocunt = 0;
        let afterBalanceDsicount = 0;
        let intafterDiscount = 0;
        let beforeDisocunt = 0;
        // console.log(iteam);
        //afterdiscount = totalAmount - (totalAmount * coupanValid.coupanDiscount / 100);
        iteam.iteam.map((item) => {
            price += item.product[0].selling_price * item.quantity
            
        })
        
        if (price >= 2000) {
            setValid("True")
            beforeDisocunt = price
            setBeforeDiscount(beforeDisocunt)
            afteCoupanDisocunt = price - (price * coupanDiscount / 100);
            setAFTERCoupanDiscount(afteCoupanDisocunt)
            setcoupanDiscountPrice(price - afteCoupanDisocunt)
           // console.log(afteCoupanDisocunt);
            //console.log(balance);

            console.log(ApplyBalance);
            if(ApplyBalance == true){
                if((beforeDisocunt - coupanDiscountPrice) > balance){
                    setBalanceDiscount((balance))
                   afterBalanceDsicount = afteCoupanDisocunt - balanceDiscount;
                    console.log("true");
                    console.log(afterBalanceDsicount);
                intafterDiscount = Math.round(afterBalanceDsicount)
                //console.log("afteDisocunt", intafterDiscount);
                setPrice(beforeDisocunt)
                setTotalPrice(afterBalanceDsicount + 40)
                setWbalance(balanceDiscount)
    
                }else if((beforeDisocunt - coupanDiscountPrice) < balance){
                    if(coupanDiscountPrice>0){
                        console.log("if me");
                        setBalanceDiscount((beforeDisocunt-coupanDiscountPrice))
                    }else{
                        console.log("else me");
                        console.log(beforeDisocunt);
                        setBalanceDiscount(beforeDisocunt)
                    }
                    console.log(balanceDiscount,"so");
                    afterBalanceDsicount = afteCoupanDisocunt -  balanceDiscount;
                    console.log("false",afterBalanceDsicount);
                    console.log(afterBalanceDsicount);
                intafterDiscount = Math.round(afterBalanceDsicount)
                //console.log("afteDisocunt", intafterDiscount);
                setPrice(beforeDisocunt)
                setTotalPrice(afterBalanceDsicount + 40)
                setWbalance(balanceDiscount)
    
                }else{
                    console.log("same");
                    afterBalanceDsicount = afteCoupanDisocunt - balanceDiscount;
                    console.log(afterBalanceDsicount);
                intafterDiscount = Math.round(afterBalanceDsicount)
                //console.log("afteDisocunt", intafterDiscount);
                setPrice(beforeDisocunt)
                setTotalPrice(afterBalanceDsicount + 40)
                setWbalance(balanceDiscount)
    
                }
                
            }else{
                intafterDiscount = Math.round(afteCoupanDisocunt)
                //console.log("afteDisocunt", intafterDiscount);
                setPrice(beforeDisocunt)
                setTotalPrice(afteCoupanDisocunt + 40)
                setWbalance(balanceDiscount)
            }




            // if(afterBalanceDsicount > 0 ){
            //     setPrice(beforeDisocunt)
            //     setTotalPrice(afterBalanceDsicount+40)
            //     setWbalance(balanceDiscount)
            // }else{
            //     setPrice(price)
            //     setTotalPrice(price+40)
            // }
        } else {
            removeBalance()
            removeCoupan()
            setValid("False")
            if (afterBalanceDsicount > 0) {
                setPrice(beforeDisocunt)
                setTotalPrice(afterBalanceDsicount + 40)
            } else {
                setPrice(price)
                setTotalPrice(price + 40)
            }
        }

        // setPrice(price)
        // setTotalPrice(price+40)

    }
    useEffect(() => {
    
        setBalance(logindata?.validUserOne?.balance)
        totalAmount();
        // applyBalance();
        //removeBalance()
        console.log("useEffect");
    }, [iteam])



    return (
        // <>
        // <div className="col-lg-6 col-md-6">
        //                <div className="coupon_code right" data-aos="fade-up" data-aos-delay="400">
        //                    <h3>Cart Totals</h3>
        //                    <div className="coupon_inner">
        //                        <div className="cart_subtotal">
        //                            <p>Subtotal</p>
        //                            <p className="cart_amount">₹{price}.00</p>
        //                        </div>
        //                        <div className="cart_subtotal ">
        //                            <p>Shipping</p>
        //                            <p className="cart_amount"><span>Flat Rate:</span> ₹40.00</p>
        //                        </div>
        //                        {/* <a href="#">Calculate shipping</a> */}

        //                        <div className="cart_subtotal">
        //                            <p>Total</p>
        //                            <p className="cart_amount">₹{totalPrice}.00</p>
        //                        </div>
        //                        <div className="checkout_btn">
        //                            <NavLink to={"/cart/address"} state={{id:totalPrice}} className="btn btn-md btn-golden">Proceed to Checkout</NavLink>
        //                        </div>
        //                    </div>
        //                </div>
        //            </div>


        // </>
        <>
            <div className="coupon_area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="coupon_code left" data-aos="fade-up" data-aos-delay="200">
                                <h3>Coupon</h3>
                                <div className="coupon_inner">
                                    <p>Enter your coupon code if you have one. Min txn value Rs.2000 required</p>
                                    {
                                        input === true ?
                                            <input className="mb-2" placeholder="Coupon code" type="text" value={coupanName} onChange={(e) => setCoupanName(e.target.value)} />
                                            :
                                            <input className="mb-2" placeholder="Coupon code" type="text" value={coupanName} onChange={(e) => setCoupanName(e.target.value)} disabled />
                                    }
                                    {
                                        input === true ?
                                            <>
                                                {
                                                    valid == "True" ?
                                                        <>
                                                            <button type="submit" className="btn btn-md btn-golden" onClick={applyCoupan} >Apply coupon</button>
                                                        </>
                                                        :
                                                        <>
                                                            <button type="submit" className="btn btn-md btn-golden" onClick={applyCoupan} disabled>Apply coupon</button>
                                                        </>
                                                }
                                            </>

                                            :
                                            <button type="submit" className="btn btn-md btn-golden" onClick={removeCoupan}>Remove Coupan</button>
                                    }

                                    {
                                        color == "green" ?
                                            <div style={{ color: "green" }}>{coupanValid}</div>
                                            :
                                            <div style={{ color: "red" }}>{coupanValid}</div>
                                    }
                                    {
                                        balance > 0 ?

                                            <>
                                                <input className="mb-2   " placeholder="Balance" type="text" value={balance} disabled />
                                                {
                                                    ApplyBalance === true ? <>
                                                        <button type="submit" className="btn btn-md btn-golden" onClick={removeBalance}>Remove Balance</button>
                                                        <p style={{ color: "green" }}>Balance Applied Succesfully</p>
                                                    </> : <>
                                                        {

                                                            valid === "True" ?
                                                                <button type="submit" className="btn btn-md btn-golden" onClick={applyBalance}>Apply Balance</button>
                                                                :
                                                                <button type="submit" className="btn btn-md btn-golden" onClick={applyBalance} disabled>Apply Balance</button>

                                                        }
                                                    </>

                                                }
                                            </>

                                            : ""

                                    }


                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="coupon_code right" data-aos="fade-up" data-aos-delay="400">
                                <h3>Cart Totals</h3>
                                <div className="coupon_inner">
                                    <div className="cart_subtotal">
                                        <p>Subtotal</p>
                                        <p className="cart_amount">₹{Math.round(price)}</p>


                                    </div>
                                    {/* <div className='cart_subtotal'>{
                                input === false ? <>
                               <del>
                               <p className="cart_amount" style={{marginLeft:"30rem",fontSize:"0.9rem",marginTop:"-2rem"}}>₹{Math.round(beforeDisocunt)}</p>
                               
                                </del> 
                                </> :""
                            }</div>
                         */}

                                    <div className="cart_subtotal ">
                                        {
                                            input == false ? <>
                                                <p>Coupan Discount </p>
                                                <p className="cart_amount"><span></span> - {Math.round(coupanDiscountPrice)}</p>
                                            </> : ""
                                        }
                                    </div>
                                    <div className="cart_subtotal ">
                                        {
                                            ApplyBalance == true ? <>
                                                <p>Balance Discount </p>
                                                <p className="cart_amount"><span></span> - ₹{balanceDiscount}</p>
                                            </> : ""
                                        }
                                    </div>
                                    <div className="cart_subtotal ">
                                        <p>Shipping</p>
                                        <p className="cart_amount"><span>Flat Rate:</span> ₹40</p>
                                    </div>
                                    <a href="#">Calculate shipping</a>

                                    <div className="cart_subtotal">
                                        <p>Total</p>
                                        <p className="cart_amount">₹{Math.round(totalPrice)}</p>
                                    </div>
                                    <div className="checkout_btn">
                                        <NavLink to={"/cart/address"} state={{ id: totalPrice, WalletBalance: wbalance, coupanName: coupanName, CoupanDiscount: coupanDiscount, CoupanDiscountPrice: coupanDiscountPrice }} className="btn btn-md btn-golden">Proceed to Checkout</NavLink>
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

export default SubTotal
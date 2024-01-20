require("dotenv").config()
const express = require("express")
const router = new express.Router();
const userdb = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const { roles } = require("../middleware/constraints")
const authenticate = require("../middleware/authenticate");
const userotpdb = require("../models/userOtp");
const nodemailer = require("nodemailer")
const categorydb = require("../models/categorySchema");
const productdb = require("../models/productSchema");
const multer = require("multer");
const addressdb = require("../models/addressSchema");
const orderdb = require("../models/orderSchema");
const moment = require("moment");
const coupandb = require("../models/coupanSchema");
const crypto = require("crypto");

//key id  : rzp_test_cmtxfoTsk6vF56
//key secrett : tfcH4NtGEoR6TkqrOZ7WRV35
const Razorpay = require('razorpay');
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});




//img config 

const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads")
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}. ${file.originalname}`)
    }
})
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(new Error("only Image is Allowed"))
    }
}
const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
})
// email config
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


router.post("/register", async (req, res) => {
    const { fname, email1, password1, cPassword } = req.body;

    console.log(fname, email1, password1, cPassword);
    if (!fname || !email1 || !password1 || !cPassword) {
        res.status(422).json({ error: "fill the details" })
    }

    try {
        const preuser = await userdb.findOne({ email: email1 });
        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
            console.log("Email Already Exist");
        } else if (password1 !== cPassword) {
            res.status(422).json({ error: "Password and Confirm Password does not match" });
        } else {

            const finalUser = await userdb({
                fname: fname,
                email: email1,
                password: password1,
                cpassword: cPassword,
                balance: 200,
                balanceHistory: {
                    Type: "Credited",
                    Amount: 200
                }
            });
            console.log("Registration Succesfully");
            const data = await finalUser.save();
            res.status(201).json({ status: 201, data });

        }

    } catch (error) {
        res.status(422).json(error)
        console.log("catch error :", error);
    }



})
router.post("/adddob", authenticate, async (req, res) => {



    try {
        // const validUserOne1 = await userdb.findOne({_id : req.userId})
        const validUserOne = await userdb.findByIdAndUpdate(req.userId, req.body, {
            new: true
        })
        res.status(201).json({ status: 201, validUserOne })
    } catch (error) {
        res.status(422).json(error)
    }


})
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
        const userValid = await userdb.findOne({ email: email })
        if (userValid) {

            const isMatch = await bcrypt.compare(password, userValid.password)

            if (!isMatch) {
                res.status(422).json({ error: "Invalid details" })
            } else {

                //token genrate 
                const token = await userValid.generateAuthtoken()

                console.log(token);
                //cookie Genrate
                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: false
                })

                const result = {
                    userValid,
                    token
                }
                // console.log(userValid.role)
                //console.log(roles.admin);

                if (userValid.role === roles.admin) {

                    res.status(201).json({ status: 201, result })
                }
                else {
                    res.status(202).json({ status: 202, result })
                }
            }
        } else {
            res.status(422).json({ error: "User does not Exist!" })
        }

    } catch (error) {
        res.status(422).json(error)
        console.log("catch block");
    }
});
router.get("/validuser", authenticate, async (req, res) => {
    try {
        const validUserOne = await userdb.findOne({ _id: req.userId });
        // res.status(201).json({status:201,validUserOne});
        if (validUserOne.role === roles.admin) {
            //201 means admin side transfer
            res.status(201).json({ status: 201, validUserOne })
        } else {
            //202 means client side transfer
            res.status(202).json({ status: 202, validUserOne })
        }
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
})
router.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.tokens !== req.token
        })

        res.clearCookie("usercookie", { path: "/" });
        req.rootUser.save();
        console.log("USer Logout");
        res.status(201).json({ status: 201 })



    } catch (error) {
        console.log("Error");
        res.status(401).json({ status: 401, error });
    }
})
router.post("/sendotp", async (req, res) => {

    const { email } = req.body;
    console.log("email", email);
    if (!email) {
        res.status(400).json({ error: "fill the email " })
    }

    try {

        const preuser = await userdb.findOne({ email: email });
        console.log("preuser", preuser);
        if (preuser) {

            const OTP = Math.floor(100000 + Math.random() * 900000);
            console.log(OTP);

            const existEmail = await userotpdb.findOne({ email: email })

            if (existEmail) {

                const updateData = await userotpdb.findByIdAndUpdate({ _id: existEmail._id }, {
                    otp: OTP
                }, { new: true }
                );

                await updateData.save();


                const mailOptions = {
                    form: process.env.EMAIL,
                    to: email,
                    subject: "Sending Email for Otp Validation",
                    text: `OTP :- ${OTP}`
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ status: 400, error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ status: 200, message: "Email sent Successfully" })
                    }
                })
            } else {

                const saveOtpData = new userotpdb({
                    email: email, otp: OTP
                });

                await saveOtpData.save();

                const mailOptions = {
                    form: process.env.EMAIL,
                    to: email,
                    subject: "Sending Email for Otp Validation",
                    text: `OTP :- ${OTP}`
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ status: 400, error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ status: 200, message: "Email sent Successfully" })
                    }
                })

            }

        } else {
            res.status(400).json({ status: 400, error: "This User Not Exist In our Db" })
        }
    } catch (error) {
        res.status(400).json(error)
        console.log("catch error :", error);
    }

});
router.post("/verifyOtp", async (req, res) => {
    const { otp, email } = req.body
    if (!otp || !email) {
        res.status(400).json({ error: "Please Enter Your OTP and email" })
    }

    try {
        const otpverification = await userotpdb.findOne({ email: email })
        console.log("otpverification", otpverification);
        console.log("otp", otp);
        if (otpverification.otp == otp) {

            console.log("matched");
            const userValid = await userdb.findOne({ email: email });
            console.log("userValid", userValid);
            //token genrate 
            const token = await userValid.generateAuthtoken()

            console.log(token);
            //cookie Genrate
            res.cookie("usercookie", token, {
                expires: new Date(Date.now() + 9000000),
                httpOnly: false
            })

            const result = {
                userValid,
                token
            }
            // console.log(userValid.role)
            //console.log(roles.admin);
            console.log("Login succcwaaa");

            if (userValid.role === roles.admin) {

                res.status(201).json({ status: 201, result })
            }
            else {
                res.status(202).json({ status: 202, result })
            }


        } else {
            res.status(400).json({ status: 400, error: "Invalid Otp" })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: "Invalid Details", error })
    }
})
router.post("/addcategory", upload.single("photo"), async (req, res) => {
    const { filename } = req.file;

    const { catName } = req.body
    console.log("000", req.file);
    console.log(catName);

    if (!catName) {
        res.status(422).json("Plz Fill Category name")
    }

    try {
        const addCategory = new categorydb({
            catName: catName,
            imgpath: filename
        })

        const finaldata = await addCategory.save();
        res.status(201).json({ status: 201, finaldata });
        console.log("Category Added Successfully");
    } catch (error) {
        res.status(422).json(error)
    }
})
router.post("/addproduct", upload.single("photo"), async (req, res) => {
    const { product_name, selling_price, actual_price, discount, description, product_category, countInStock, isFeatured, isActive } = req.body;
    const { filename } = req.file;


    if (!product_name, !selling_price, !selling_price, !discount, !description, !product_category, !countInStock, !isFeatured, !isActive, !filename) {
        res.status(422).json({ error: "Please fill all the data" });
    } try {
        const addProduct = new productdb({
            imgpath: filename,
            product_name: product_name,
            selling_price: selling_price,
            actual_price: actual_price,
            discount: discount,
            description: description,
            product_category: product_category,
            countInStock: countInStock,
            isFeatured: isFeatured,
            isActive: isActive
        })
        const finaldata = await addProduct.save();
        res.status(201).json({ status: 201, finaldata });
        console.log("Product Added Successfully");

    } catch (error) {
        res.status(422).json(error);
    }
})
router.get("/getcategory", async (req, res) => {
    const search = req.query.search || ""

    const query = {
        catName: { $regex: search, $options: "i" }
    }
    try {
        const category = await categorydb.find(query);
        res.status(201).json(category)
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/getbalancehistory", authenticate, async (req, res) => {

    try {
        const validUserOne = await userdb.findOne({ _id: req.userId })
        console.log(validUserOne);
        const balnceHistory = await userdb.find({ user: validUserOne._id })
        console.log("405", balnceHistory);
        res.status(201).json(balnceHistory)
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/getproduct", async (req, res) => {
    const search = req.query.search || ""
    const isactive = req.query.isactive || ""
    const isfeatured = req.query.isfeatured || ""

    // console.log("isactive :",isactive);
    // console.log("isfeatured :",isfeatured);
    const query = {
        product_name: { $regex: search, $options: "i" }
    }
    if (isactive !== "All") {
        query.isActive = isactive
    }
    if (isfeatured !== "All") {
        query.isFeatured = isfeatured
    }
    try {
        const products = await productdb.find(query).populate('product_category');
        res.status(201).json(products);
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/category/:id", async (req, res) => {
    const { id } = req.params
    try {
        const products = await productdb.find({ product_category: id }).populate('product_category')
        res.status(201).json(products)
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/getactiveproduct", async (req, res) => {

    const search = req.query.search || ""




    try {

        const products = await productdb.find({ isActive: true, product_name: { $regex: search, $options: "i" } }).populate('product_category');


        res.status(201).json(products);



    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/getfeaturedproduct", async (req, res) => {
    try {
        const products = await productdb.find({ isActive: true, isFeatured: true }).populate('product_category');

        res.status(201).json(products);
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/getcategory/:id", async (req, res) => {

    try {
        // console.log(req.params)
        const { id } = req.params

        const categoryindivisual = await categorydb.findById({ _id: id })
        // console.log(categoryindivisual);

        res.status(201).json(categoryindivisual)
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/getproduct/:id", async (req, res) => {
    try {
        console.log("so");
        const { id } = req.params
        console.log(id);
        const product = await productdb.findById({ _id: id })
        console.log("product", product);
        res.status(201).json(product)

    } catch (error) {
        res.status(422).json(error)
    }
})
router.delete("/deletecategoty/:id", async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const deletecategoty = await categorydb.findByIdAndDelete({ _id: id });
        console.log(deletecategoty);
        res.status(201).json(deletecategoty);
    } catch (error) {
        res.status(422).json(error);
    }
})
router.delete("/deleteproduct/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteProduct = await productdb.findByIdAndDelete({ _id: id })
        res.status(201).json(deleteProduct);
    } catch (error) {
        res.status(422).json(error);
    }
})
router.patch("/updatecategory/:id", async (req, res) => {
    try {
        const { id } = req.params

        const updatecategory = await categorydb.findByIdAndUpdate(id, req.body, {
            new: true
        })
        console.log("check :", updatecategory);
        res.status(201).json(updatecategory)
    } catch (error) {
        res.status(422).json(error)
    }
})
router.patch("/updateproduct/:id", async (req, res) => {
    try {
        const { id } = req.params

        const updateproduct = await productdb.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(201).json(updateproduct)
    } catch (error) {
        res.status(422).json(422)
    }
})
router.post("/addtocart/:id", authenticate, async (req, res) => {
    try {


        const { id } = req.params;
        const product = await productdb.findOne({ _id: id })

        const validUserOne = await userdb.findOne({ _id: req.userId })

        if (validUserOne) {
            const cartData = await validUserOne.addcartdata(product);

            await validUserOne.save();
            res.status(201).json({ status: 201, validUserOne })
            console.log(product.product_name + " Add to cart Succesfully");
        }
    } catch (error) {
        console.log(error);
        res.status(422).json({ status: 422, error })
    }

})
router.post("/addtowishlist/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productdb.findOne({ _id: id })
        console.log("product", product);
        const validUserOne = await userdb.findOne({ _id: req.userId })

        if (validUserOne) {
            const wishlistData = await validUserOne.addwishlistdata(product);
            // console.log("wishlistData",wishlistData);
            if (wishlistData == 1) {
                res.status(202).json({ status: 202 })
                console.log(product.product_name + "Product Alredy in Wishlist");
            }
            else {
                await validUserOne.save();
                res.status(201).json({ status: 201, validUserOne })
                console.log(product.product_name + "Add to wishlist Succesfully");
            }
        }
    } catch (error) {
        console.log("error");
        res.status(422).json({ status: 422, error })
    }
})
router.get("/getcart", authenticate, async (req, res) => {

    try {
        const CARTDATA = await userdb.findOne({ _id: req.userId })
        res.status(201).json(CARTDATA.carts)
    } catch (error) {
        console.log("catch error =>", error);
    }
})
router.get("/getwishlist", authenticate, async (req, res) => {
    try {
        const WISHLISTDATA = await userdb.findOne({ _id: req.userId })
        res.status(201).json(WISHLISTDATA.wishlists)
    } catch (error) {
        console.log("catch error =>", error);
    }
})
router.delete("/removecartproduct/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params

        console.log("1", req.rootUser.carts.length);
        req.rootUser.carts = req.rootUser.carts.filter((curel) => {
            return curel._id != id
        })
        console.log("2", req.rootUser.carts.length);
        req.rootUser.save();

        console.log("3", req.rootUser.carts.length);
        const validUserOne = req.rootUser
        res.status(201).json({ status: 201, validUserOne })
        console.log("4", req.rootUser);
        console.log("Item Removed");
    } catch (error) {
        console.log(error + "catch block")
        res.status(400).json(error)
    }
})
router.delete("/removewishlistproduct/:id", authenticate, async (req, res) => {

    try {
        const { id } = req.params

        req.rootUser.wishlists = req.rootUser.wishlists.filter((curel) => {
            return curel._id != id
        })
        req.rootUser.save();
        const validUserOne = req.rootUser
        res.status(201).json({ status: 201, validUserOne })
    } catch (error) {
        res.status(422).json(error);
        console.log("Catch Bloack Error");
    }
})
router.post("/decresequantity/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params
        const product = await productdb.findOne({ _id: id });
        const validUserOne = await userdb.findOne({ _id: req.userId })

        if (validUserOne) {

            const cartData = await validUserOne.decreseQuantity(product);

            await validUserOne.save();

            res.status(201).json({ status: 201, validUserOne })
        }

    } catch (error) {
        res.status(422).json({ error })
    }
})
router.post("/addaddress", authenticate, async (req, res) => {
    const validUserOne = await userdb.findOne({ _id: req.userId });
    const { fname, lname, streetAddress, landmark, city, state, pincode, phone, email } = req.body;

    try {
        const addAddress = await addressdb({
            user: validUserOne._id,
            fname: fname,
            lname: lname,
            streetAddress: streetAddress,
            landmark: landmark,
            pincode: pincode,
            city: city,
            state: state,
            phone: phone,
            email: email
        })
        await addAddress.save();
        res.status(201).json(addAddress)
    } catch (error) {
        res.status(422).json("catch error :", error)
    }

})

router.get("/getalladdress", authenticate, async (req, res) => {
    try {
        const validUserOne = await userdb.findOne({ _id: req.userId })
        const address = await addressdb.find({ user: validUserOne._id }).populate('user')
        res.status(201).json(address)

    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/getallorders", async (req, res) => {

    const status = req.query.status || ""
    console.log(status);

    const query = {

    }
    if (status !== "All") {
        query.orderStatus = status
    }

    try {


        const orders = await orderdb.find(query)
        res.status(201).json(orders)

    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/getaddress/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const address = await addressdb.findById({ _id: id })
        res.status(201).json(address)
    } catch (error) {
        res.status(422).json(error)
    }
})

router.delete("/deleteaddress/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteaddress = await addressdb.findByIdAndDelete({ _id: id })
        res.status(201).json(deleteaddress)
    } catch (error) {
        res.status(422).json(error)
    }
})

router.patch("/updateaddress/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params

        const updateaddress = await addressdb.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(201).json(updateaddress)
    } catch (error) {
        res.status(422).json(error)
    }
})

router.patch("/updatename", authenticate, async (req, res) => {
    try {
        // const validUserOne1 = await userdb.findOne({_id : req.userId})

        const validUserOne = await userdb.findByIdAndUpdate(req.userId, req.body, {
            new: true
        })
        res.status(201).json({ status: 201, validUserOne })
    } catch (error) {
        res.status(422).json(error)
    }
})

router.post("/makeorder/:id", authenticate, async (req, res) => {
    console.log("734 =>", req.body.coupanName, req.body.coupanDiscount);
    const { id } = req.params
    const { totalAmountlocation, pstatus, wbalance,
        coupanName,
        coupanDiscount,
        CoupanDiscountPrice } = req.body
    console.log("status :-", pstatus);
    try {
        const address = await addressdb.findOne({ _id: id })
        const user = await userdb.findOne({ _id: req.userId })
        let totalPrice = 0;
        for (var i = 0; i < user.carts.length; i++) {
            totalPrice += user.carts[i].product[0].selling_price * user.carts[i].quantity
        }

        const orderdate = moment(new Date()).format("YYYY/MM/DD")
        console.log(orderdate);
        if (user.carts.length > 0) {
            const addOrder = await orderdb({
                user: user,
                products: user.carts,
                orderDate: orderdate,
                totalPrice: totalPrice,
                totalPriceAfterDiscounts: totalAmountlocation,
                shipping_address: address,
                PaymentStatus: "not paid",
                WalletBalance: wbalance,

                CoupanName: coupanName,
                CoupanDiscount: coupanDiscount,
                CoupanDiscountPrice: CoupanDiscountPrice

            })
            // console.log("addOrder", addOrder)
            for (let index = 0; index < user.carts.length; index++) {
                console.log();
                    console.log(index,": ",user.carts[index].product[0]._id);
                    console.log(index," : ",user.carts[index].quantity);

                    productdb.findByIdAndUpdate(user.carts[index].product[0]._id, { countInStock:user.carts[index].product[0].countInStock - user.carts[index].quantity },
                        function (err, docs) {
                            if (err) {
                                console.log(err)
                            }
                            else { 
                                console.log("Updated product quantity: ",docs);
                            }
                        });

                        

                        
                        
                    
            }
            await addOrder.save();


            console.log("req.rootUser.carts before", req.rootUser.carts.length);
            req.rootUser.carts = req.rootUser.carts.filter((curel) => {
                return curel._id != curel._id
            })
            req.rootUser.save();
            // req.rootUser.save();
            // req.rootUser.balance = req.rootUser.balance.filter((curel)=>{
            //     return balance-WalletBalance
            // }) 

            const validUserOne = await userdb.findOne({ _id: req.userId })
            if (validUserOne) {

                if (wbalance > 0) {
                    const BalanceData = await validUserOne.minusBalance(wbalance);
                    userdb.findByIdAndUpdate(
                        validUserOne._id,
                        { $push: { "balanceHistory": { Type: "Debited", Amount: wbalance } } },
                        { safe: true, upsert: true, new: true },

                        function (err, docs) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log("Updated User balance: ", docs);
                            }
                        }
                    );

                    await validUserOne.save();
                }

            }
            // if(validUserOne){

            //     if(wbalance > 0){
            //         const BalanceData = await validUserOne.BalanceHistory(wbalance);
            //         await validUserOne.save();
            //     }

            // }
            // if(wbalance > 0){


            // userdb.findByIdAndUpdate(
            //     validUserOne._id,
            //     {$push: {"balanceHistory": {Type: "Credited",Amount : 500}}},
            //     {safe: true, upsert: true, new : true},
            //     function(err, model) {
            //         console.log(err);
            //     }
            // );
            // await validUserOne.save();
            // }


            console.log("req.rootUser.carts after", req.rootUser.carts.length);



        } else {
            console.log("Cart is Empty ");

        }
        const validUserOne = await userdb.findOne({ _id: req.userId })
        // console.log("validUserOne", validUserOne);
        res.status(201).json({ status: 201, validUserOne })
    } catch (error) {
        res.status(422).json(error)
    }


})
router.post("/checkout/:id", authenticate, async (req, res) => {

    const { totalAmountlocation } = req.body
    let amnt = parseInt(String(totalAmountlocation))
    console.log("786+" + amnt);

    try {

        const options = {
            amount: Number(amnt * 100),  // amount in the smallest currency unit
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        console.log("order =>", order);
        res.status(200).json({ msg: "success", order })
    } catch (error) {

        res.status(422).json(error)
    }

})

router.post("/paymentverification/:id", authenticate, async (req, res) => {
    const { id } = req.params
    const { totalAmountlocation, pstatus, wbalance,
        coupanName,
        coupanDiscount,
        CoupanDiscountPrice } = req.body
    console.log("shp", id);
    console.log(pstatus);
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;
        console.log(orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature);

        const body = razorpayOrderId + "|" + razorpayPaymentId;


        var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest('hex');
        console.log("sig received ", razorpaySignature);
        console.log("sig generated ", expectedSignature);

        const isAuthentic = razorpaySignature === expectedSignature

        if (isAuthentic) {
            const address = await addressdb.findOne({ _id: id })
            const user = await userdb.findOne({ _id: req.userId })
            // console.log(address);
            // console.log(user);
            let totalPrice = 0;
            for (var i = 0; i < user.carts.length; i++) {
                totalPrice += user.carts[i].product[0].selling_price * user.carts[i].quantity
            }

            const orderdate = moment(new Date()).format("YYYY-MM-DD")

            if (user.carts.length > 0) {
                const addOrder = await orderdb({
                    user: user,
                    products: user.carts,
                    orderDate: orderdate,
                    totalPrice: totalPrice,
                    totalAmount: totalPrice + 40,
                    totalPriceAfterDiscounts: totalAmountlocation,
                    shipping_address: address,
                    PaymentStatus: "paid",
                    WalletBalance: wbalance,
                    CoupanName: coupanName,
                    CoupanDiscount: coupanDiscount,
                    CoupanDiscountPrice: CoupanDiscountPrice,
                    orderCreationId: orderCreationId,
                    razorpayPaymentId: razorpayPaymentId,
                    razorpayOrderId: razorpayOrderId,
                    razorpaySignature: razorpaySignature

                })
                // console.log("addOrder", addOrder)
                

                await addOrder.save()


                console.log("req.rootUser.carts before", req.rootUser.carts.length);
                req.rootUser.carts = req.rootUser.carts.filter((curel) => {
                    return curel._id != curel._id
                })
                const validUserOne = await userdb.findOne({ _id: req.userId })
            if (validUserOne) {

                if (wbalance > 0) {
                    const BalanceData = await validUserOne.minusBalance(wbalance);
                    userdb.findByIdAndUpdate(
                        validUserOne._id,
                        { $push: { "balanceHistory": { Type: "Debited", Amount: wbalance } } },
                        { safe: true, upsert: true, new: true },

                        function (err, docs) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log("Updated User balance: ", docs);
                            }
                        }
                    );

                    await validUserOne.save();
                }

            }

             
                console.log("req.rootUser.carts after", req.rootUser.carts.length);
                req.rootUser.save();


            } else {
                console.log("Cart is Empty ");

            }
            const validUserOne = await userdb.findOne({ _id: req.userId })
            console.log("validUserOne", validUserOne);

            res.status(201).json({ status: 201, validUserOne })
        } else {
            res.status(400).json({
                success: false
            })
        }

    } catch (error) {
        res.status(500).send(error);
    }

})


router.get("/getallorders", async (req, res) => {
    try {
        const Orders = await orderdb.find();
        res.status(201).json({ status: 201, Orders })
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/gettodaysorders", async (req, res) => {
    try {

        var nowDate = new Date();
        var date = nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate();
        console.log(date);
        const Orders = await orderdb.find({ orderDate: date });
        console.log(Orders);
        
        if(Orders!=''){
        let flag = 0;
        var Name_array = [];
        var coupan_array = [];
        var orderStatus_array = []
        var PaymentStatus_array = []
        var Date_array = []
        //Total sell Identify
        var TotalsellAfterDiscounts = 0;
        const Totalsell = await orderdb.find({ orderDate: date });
        // console.log(Totalsell);
        console.log(Totalsell[0].totalPriceAfterDiscounts);
        for (let index = 0; index < Totalsell.length; index++) {
            
            TotalsellAfterDiscounts = TotalsellAfterDiscounts + Totalsell[index].totalPriceAfterDiscounts
        }
        console.log(TotalsellAfterDiscounts);

        var TotalsellBeforeDiscounts = 0;
        const Totalsellb = await orderdb.find({ orderDate: date });
        // console.log(Totalsell);
        console.log(Totalsellb[0].totalPrice);
        for (let index = 0; index < Totalsellb.length; index++) {
            
            TotalsellBeforeDiscounts = TotalsellBeforeDiscounts + Totalsellb[index].totalPrice
        }
        console.log(TotalsellBeforeDiscounts);


        for (let index = 0; index < Orders.length; index++) {
            coupan_array.push(Orders[index].CoupanName);
            orderStatus_array.push(Orders[index].orderStatus);
            PaymentStatus_array.push(Orders[index].PaymentStatus);
            Date_array.push(Orders[index].orderDate);
            for (let j = 0; j < Orders[index].products.length; j++) {
                flag++;
                Name_array.push(Orders[index].products[j].product[0].product_name);

            }
        }
        console.log(flag);
       // console.log(array);

        const ProductCount = {};
        Name_array.forEach(function (x) { ProductCount[x] = (ProductCount[x] || 0) + 1; });
        console.log(ProductCount)

        const CoupanCount = {};
        coupan_array.forEach(function (x) { CoupanCount[x] = (CoupanCount[x] || 0) + 1; });
        console.log(CoupanCount)

        const order_statusCount = {};
        orderStatus_array.forEach(function (x) { order_statusCount[x] = (order_statusCount[x] || 0) + 1; });
        console.log(order_statusCount)
        
        const PaymentStatus_count = {};
        PaymentStatus_array.forEach(function (x) { PaymentStatus_count[x] = (PaymentStatus_count[x] || 0) + 1; });
        console.log(PaymentStatus_count)

        const orderDate_count = {};
        Date_array.forEach(function (x) { orderDate_count[x] = (orderDate_count[x] || 0) + 1; });
        console.log(orderDate_count)

        res.status(201).json({ status: 201 ,Orders:Orders,TotalsellBeforeDiscounts:TotalsellBeforeDiscounts,TotalsellAfterDiscounts:TotalsellAfterDiscounts,ProductCount:ProductCount,CoupanCount:CoupanCount,order_statusCount:order_statusCount,PaymentStatus_count:PaymentStatus_count,orderDate_count:orderDate_count })
        }else{
            res.status(201).json({ status: 201 ,Orders:Orders})
        }
        
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/getweeksorders", async (req, res) => {
    try {
        console.log("soel");
        var ourDate = new Date();
        var pastDate = ourDate.getDate() - 8;
        ourDate.setDate(pastDate);
        var weekago = ourDate.getFullYear() + '/' + (ourDate.getMonth() + 1) + '/' + ourDate.getDate();

        var ourDate1 = new Date();
        var pastDate1 = ourDate1.getDate() + 1;
        ourDate1.setDate(pastDate1);
        var TodaysDate = ourDate1.getFullYear() + '/' + (ourDate1.getMonth() + 1) + '/' + ourDate1.getDate();


        console.log(weekago, TodaysDate);
        const Orders = await orderdb.find({ orderDate: { $gt: weekago, $lt: TodaysDate } });
        console.log(Orders.length);
        
        if(Orders!=''){
            let flag = 0;
        var Name_array = [];
        var coupan_array = [];
        var orderStatus_array = []
        var PaymentStatus_array = []
        var Date_array = []
        //Total sell Identify
        var TotalsellAfterDiscounts = 0;
        const Totalsell = await orderdb.find({ orderDate: { $gt: weekago, $lt: TodaysDate } });
        // console.log(Totalsell);
        console.log(Totalsell[0].totalPriceAfterDiscounts);
        for (let index = 0; index < Totalsell.length; index++) {
            
            TotalsellAfterDiscounts = TotalsellAfterDiscounts + Totalsell[index].totalPriceAfterDiscounts
        }
        console.log(TotalsellAfterDiscounts);

        var TotalsellBeforeDiscounts = 0;
        const Totalsellb = await orderdb.find({ orderDate: { $gt: weekago, $lt: TodaysDate } });
        // console.log(Totalsell);
        console.log(Totalsellb[0].totalPrice);
        for (let index = 0; index < Totalsellb.length; index++) {
            
            TotalsellBeforeDiscounts = TotalsellBeforeDiscounts + Totalsellb[index].totalPrice
        }
        console.log(TotalsellBeforeDiscounts);


        for (let index = 0; index < Orders.length; index++) {
            coupan_array.push(Orders[index].CoupanName);
            orderStatus_array.push(Orders[index].orderStatus);
            PaymentStatus_array.push(Orders[index].PaymentStatus);
            Date_array.push(Orders[index].orderDate);
            for (let j = 0; j < Orders[index].products.length; j++) {
                flag++;
                Name_array.push(Orders[index].products[j].product[0].product_name);

            }
        }
        console.log(flag);
       // console.log(array);

        const ProductCount = {};
        Name_array.forEach(function (x) { ProductCount[x] = (ProductCount[x] || 0) + 1; });
        console.log(ProductCount)

        const CoupanCount = {};
        coupan_array.forEach(function (x) { CoupanCount[x] = (CoupanCount[x] || 0) + 1; });
        console.log(CoupanCount)

        const order_statusCount = {};
        orderStatus_array.forEach(function (x) { order_statusCount[x] = (order_statusCount[x] || 0) + 1; });
        console.log(order_statusCount)
        
        const PaymentStatus_count = {};
        PaymentStatus_array.forEach(function (x) { PaymentStatus_count[x] = (PaymentStatus_count[x] || 0) + 1; });
        console.log(PaymentStatus_count)

        const orderDate_count = {};
        Date_array.forEach(function (x) { orderDate_count[x] = (orderDate_count[x] || 0) + 1; });
        console.log(orderDate_count)

        res.status(201).json({ status: 201 ,Orders:Orders,TotalsellBeforeDiscounts:TotalsellBeforeDiscounts,TotalsellAfterDiscounts:TotalsellAfterDiscounts,ProductCount:ProductCount,CoupanCount:CoupanCount,order_statusCount:order_statusCount,PaymentStatus_count:PaymentStatus_count,orderDate_count:orderDate_count })
        }
        else{
            res.status(201).json({status : 201 , Orders})
        }
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/getmonthlyorders", async (req, res) => {

    try {
        console.log("soel");
        var ourDate = new Date();
        var pastDate = ourDate.getDate() - 31;
        ourDate.setDate(pastDate);
        var mago = ourDate.getFullYear() + '/' + (ourDate.getMonth() + 1) + '/' + ourDate.getDate();

        var ourDate1 = new Date();
        var pastDate1 = ourDate1.getDate() + 1;
        ourDate1.setDate(pastDate1);
        var TodaysDate = ourDate1.getFullYear() + '/' + (ourDate1.getMonth() + 1) + '/' + ourDate1.getDate();


        console.log(mago, TodaysDate);
        const Orders = await orderdb.find({ orderDate: { $gt: mago, $lt: TodaysDate } });
        console.log(Orders.length);
        if(Orders!=''){
            let flag = 0;
        var Name_array = [];
        var coupan_array = [];
        var orderStatus_array = []
        var PaymentStatus_array = []
        var Date_array = []
        //Total sell Identify
        var TotalsellAfterDiscounts = 0;
        const Totalsell = await orderdb.find({ orderDate: { $gt: mago, $lt: TodaysDate } });
        // console.log(Totalsell);
        console.log(Totalsell[0].totalPriceAfterDiscounts);
        for (let index = 0; index < Totalsell.length; index++) {
            
            TotalsellAfterDiscounts = TotalsellAfterDiscounts + Totalsell[index].totalPriceAfterDiscounts
        }
        console.log(TotalsellAfterDiscounts);

        var TotalsellBeforeDiscounts = 0;
        const Totalsellb = await orderdb.find({ orderDate: { $gt: mago, $lt: TodaysDate } });
        // console.log(Totalsell);
        console.log(Totalsellb[0].totalPrice);
        for (let index = 0; index < Totalsellb.length; index++) {
            
            TotalsellBeforeDiscounts = TotalsellBeforeDiscounts + Totalsellb[index].totalPrice
        }
        console.log(TotalsellBeforeDiscounts);


        for (let index = 0; index < Orders.length; index++) {
            coupan_array.push(Orders[index].CoupanName);
            orderStatus_array.push(Orders[index].orderStatus);
            PaymentStatus_array.push(Orders[index].PaymentStatus);
            Date_array.push(Orders[index].orderDate);
            for (let j = 0; j < Orders[index].products.length; j++) {
                flag++;
                Name_array.push(Orders[index].products[j].product[0].product_name);

            }
        }
        console.log(flag);
       // console.log(array);

        const ProductCount = {};
        Name_array.forEach(function (x) { ProductCount[x] = (ProductCount[x] || 0) + 1; });
        console.log(ProductCount)

        const CoupanCount = {};
        coupan_array.forEach(function (x) { CoupanCount[x] = (CoupanCount[x] || 0) + 1; });
        console.log(CoupanCount)

        const order_statusCount = {};
        orderStatus_array.forEach(function (x) { order_statusCount[x] = (order_statusCount[x] || 0) + 1; });
        console.log(order_statusCount)
        
        const PaymentStatus_count = {};
        PaymentStatus_array.forEach(function (x) { PaymentStatus_count[x] = (PaymentStatus_count[x] || 0) + 1; });
        console.log(PaymentStatus_count)

        const orderDate_count = {};
        Date_array.forEach(function (x) { orderDate_count[x] = (orderDate_count[x] || 0) + 1; });
        console.log(orderDate_count)

        res.status(201).json({ status: 201 ,Orders:Orders,TotalsellBeforeDiscounts:TotalsellBeforeDiscounts,TotalsellAfterDiscounts:TotalsellAfterDiscounts,ProductCount:ProductCount,CoupanCount:CoupanCount,order_statusCount:order_statusCount,PaymentStatus_count:PaymentStatus_count,orderDate_count:orderDate_count })
        }
        else{
            res.status(201).json({status: 201 ,Orders})
        }
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/getspecificdatesorder", async (req, res) => {
    try {
        const dates = req.query.dates || ""
        const datesArray = dates.split(",");
        console.log(datesArray);
        sda = datesArray[0]
        eda = datesArray[1]
        console.log(sda, eda);
        const Orders = await orderdb.find({ orderDate: { $gte: sda, $lte: eda } });
        console.log(Orders.length);
        
        if(Orders!=''){
            console.log("sopel");
            let flag = 0;
        var Name_array = [];
        var coupan_array = [];
        var orderStatus_array = []
        var PaymentStatus_array = []
        var Date_array = []
        //Total sell Identify
        var TotalsellAfterDiscounts = 0;
        const Totalsell = await orderdb.find({ orderDate: { $gte: sda, $lte: eda } },{totalPriceAfterDiscounts : 1,_id:0});
        // console.log(Totalsell);
        console.log(Totalsell[0].totalPriceAfterDiscounts);
        for (let index = 0; index < Totalsell.length; index++) {
            
            TotalsellAfterDiscounts = TotalsellAfterDiscounts + Totalsell[index].totalPriceAfterDiscounts
        }
        console.log(TotalsellAfterDiscounts);

        var TotalsellBeforeDiscounts = 0;
        const Totalsellb = await orderdb.find({ orderDate: { $gte: sda, $lte: eda } },{totalPrice : 1,_id:0});
        // console.log(Totalsell);
        console.log(Totalsellb[0].totalPrice);
        for (let index = 0; index < Totalsellb.length; index++) {
            
            TotalsellBeforeDiscounts = TotalsellBeforeDiscounts + Totalsellb[index].totalPrice
        }
        console.log(TotalsellBeforeDiscounts);


        for (let index = 0; index < Orders.length; index++) {
            coupan_array.push(Orders[index].CoupanName);
            orderStatus_array.push(Orders[index].orderStatus);
            PaymentStatus_array.push(Orders[index].PaymentStatus);
            Date_array.push(Orders[index].orderDate);
            for (let j = 0; j < Orders[index].products.length; j++) {
                flag++;
                Name_array.push(Orders[index].products[j].product[0].product_name);

            }
        }
        console.log(flag);
       // console.log(array);

        const ProductCount = {};
        Name_array.forEach(function (x) { ProductCount[x] = (ProductCount[x] || 0) + 1; });
        console.log(ProductCount)

        const CoupanCount = {};
        coupan_array.forEach(function (x) { CoupanCount[x] = (CoupanCount[x] || 0) + 1; });
        console.log(CoupanCount)

        const order_statusCount = {};
        orderStatus_array.forEach(function (x) { order_statusCount[x] = (order_statusCount[x] || 0) + 1; });
        console.log(order_statusCount)
        
        const PaymentStatus_count = {};
        PaymentStatus_array.forEach(function (x) { PaymentStatus_count[x] = (PaymentStatus_count[x] || 0) + 1; });
        console.log(PaymentStatus_count)

        const orderDate_count = {};
        Date_array.forEach(function (x) { orderDate_count[x] = (orderDate_count[x] || 0) + 1; });
        console.log(orderDate_count)

        res.status(201).json({ status: 201 ,Orders:Orders,TotalsellBeforeDiscounts:TotalsellBeforeDiscounts,TotalsellAfterDiscounts:TotalsellAfterDiscounts,ProductCount:ProductCount,CoupanCount:CoupanCount,order_statusCount:order_statusCount,PaymentStatus_count:PaymentStatus_count,orderDate_count:orderDate_count })
        }else{
            console.log("else");
            res.status(201).json({status: 201 ,Orders})   
        }
    } catch (error) {
        res.status(422).json(error)
    }
})

router.get("/getorders", authenticate, async (req, res) => {
    try {
        console.log("hiii");
        const validUserOne = await userdb.findOne({ _id: req.userId })
        console.log(validUserOne);
        const orders = await orderdb.find({ user: validUserOne._id }).populate('user')
        // console.log("ssiii");
        // console.log(orders);
        res.status(201).json({ status: 201, orders })
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/order/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params
        const order = await orderdb.findById({ _id: id })
        res.status(201).json({ status: 201, order })
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/orderi/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params
        const order = await orderdb.findById({ _id: id })
        res.status(201).json({ status: 201, order })
    } catch (error) {
        res.status(422).json(error)
    }
})

router.patch("/updateorderstatus/:id", authenticate, async (req, res) => {

    console.log("soel");

    const { id } = req.params

    const { orderStatus } = req.body;
    console.log("order_status", orderStatus);
    console.log("776 =>", id);

    try {
        const order = await orderdb.findById({ _id: id })
        console.log("782", order);
        const email = order.shipping_address[0].email
        console.log(email);
        console.log("783", order.orderStatus);
        //console.log("784",order_status);
        const updateOrder = await orderdb.findByIdAndUpdate(id, req.body, {
            new: true
        })


        res.status(201).json(updateOrder)
        console.log("done");


        const mailOptions = {
            form: process.env.EMAIL,
            to: email,
            subject: "Your Order Status is Updated",

            text: `Status : ${orderStatus} `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error", error);
                res.status(400).json({ status: 400, error: "email not send" })
            } else {
                console.log("Email sent", info.response);
                res.status(200).json({ status: 200, message: "Email sent Successfully" })
            }
        })



    } catch (error) {
        res.status(422).json(error)
    }
})
router.post("/addcoupan", async (req, res) => {
    console.log(req.body);
    const { coupanName, coupanDiscount } = req.body
    console.log("heloo");
    if (!coupanName || !coupanDiscount) {
        res.status(422).json({ error: "fill the details" })
    }
    try {
        const precoupan = await coupandb.findOne({ coupanName: coupanName })
        console.log(precoupan);
        if (precoupan) {
            res.status(424).json({ status: 424, error: "This Coupan name is Already Exist !" })
        } else {
            const newCoupan = await coupandb({
                coupanName: coupanName,
                coupanDiscount: coupanDiscount
            })
            await newCoupan.save();
            res.status(201).json({ status: 201, message: "DOne" })
        }
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/getcoupans", async (req, res) => {
    const search = req.query.search || ""

    const query = {
        coupanName: { $regex: search, $options: "i" }
    }
    try {
        const coupans = await coupandb.find(query);
        res.status(201).json(coupans)
    } catch (error) {
        res.status(422).json(error)
    }
})
router.get("/getcoupan/:id", async (req, res) => {
    try {
        const { id } = req.params
        const coupan = await coupandb.findById({ _id: id })
        res.status(201).json({ status: 201, coupan })
    } catch (error) {

        res.status(422).json(error)
    }
})
router.patch("/updatecoupan/:id", async (req, res) => {
    try {
        const { id } = req.params

        console.log(id);
        const updatecoupan = await coupandb.findByIdAndUpdate(id, req.body, {
            new: true
        })
        console.log(updatecoupan);
        res.status(201).json({ status: 201, updatecoupan })
    } catch (error) {
        res.status(422).json(error)
    }
})
router.delete("/deletecoupan/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deletecoupan = await coupandb.findByIdAndDelete({ _id: id })
        res.status(201).json(deletecoupan)
    } catch (error) {
        res.status(422).json(error)
    }
})

router.post("/applycoupan", authenticate, async (req, res) => {
    const { coupanName } = req.body;
    // const totalAmount = 32000;
    try {
        const coupanValid = await coupandb.findOne({ coupanName: coupanName })

        if (coupanValid) {

            res.status(201).json({ status: 201, coupanValid })
        } else {
            res.status(422).json({ status: 422, error: "coupan not valid" })

        }
    } catch (error) {
        res.status(422).json(error)
    }
    // let afterdiscount = 0
    // if(coupanValid){
    //     afterdiscount = totalAmount - (totalAmount * coupanValid.coupanDiscount / 100);
    //     console.log(afterdiscount);
    // }else{
    //     console.log("coupan not valid");
    // }
})

router.post("/coupandiscount/:id", authenticate, async (req, res) => {
    const { id } = req.params
    console.log("coupanid", id);
    try {
        const coupanValid = await coupandb.findOne({ _id: id })
        console.log("coupanValid", coupanValid);
        res.status(201).json({ status: 201, coupanValid })
    } catch (error) {

        res.status(422).json({ status: 422, error })
    }
})
module.exports = router
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { roles } = require("../middleware/constraints")
const { json } = require("express")
const Skey = "soelshaikhshaikhsoelshaikhsoelab"
const admin_email = 'admin@gmail.com'


const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not Valid Email")
            }
        }
    },
    dateOfBirth: {
        type: Date,
        trim: true
    },
    role: {
        type: String,
        enum: [roles.admin, roles.client],
        default: roles.client
    },
    password: {
        type: String,
        required: true,
        minlength: 6

    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    balance: {
        type: Intl,
        required: true,
        default : 0
    },
    balanceHistory : [{
        Type : String,
        Amount : Number,
        DateAndTime: {
            type: Date,
            trim: true,
            default: Date.now
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    carts: [{
        product: Array,
        quantity: {
            type: Number,
            default: 1
        }
    }],
    wishlists: [{
        product: Array
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("save", async function (next) {

    if (this.email === admin_email) {

        this.role = roles.admin
    }
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next();
})

userSchema.methods.generateAuthtoken = async function () {

    try {
        let token1 = jwt.sign({ _id: this._id }, Skey, {
            expiresIn: "1d"
        })

        this.tokens = this.tokens.concat({ token: token1 })
        await this.save()
        return token1
    } catch (error) {
        res.status(422).json(error)
    }
}


userSchema.methods.addcartdata = async function (product) {
    let submit = true;

    console.log("101", product);

    try {
        console.log(this.carts.length);
        for (var i = 0; i < this.carts.length; i++) {

            if (JSON.stringify(this.carts[i].product[0]._id) == JSON.stringify(product._id)) {
                submit = false
                if (this.carts[i].quantity == 5) {
                    this.carts.quantity
                } else {
                    this.carts[i].quantity = this.carts[i].quantity + 1;

                }
            }
        }
        if (submit == true) {
            this.carts = this.carts.concat({ product: product })
            await this.save();
            return this.carts;
        } else {
            return this.carts;
        }
    } catch (error) {
        console.log("cart add time error");
    }
}

userSchema.methods.addwishlistdata = async function (product) {
    let submit = true;
    console.log("Schema ",product);
    try {
        for (var i = 0; i < this.wishlists.length; i++) {
            if (JSON.stringify(this.wishlists[i].product[0]._id) == JSON.stringify(product._id)) {
                console.log("Product ALredady in wishlist");
                submit = false
                return 1
            }
        }
        if (submit == true) {
            this.wishlists = this.wishlists.concat({product:product});
            await this.save();
            return this.wishlists
        }
    } catch (error) {
        console.log("Catch block wishlist", error);
    }
}

userSchema.methods.decreseQuantity = async function(product){
    let submit = true

    console.log(product);
    try {
        console.log("cart length",this.carts.length);
        for(var i=0;i<this.carts.length;i++){
            if(JSON.stringify(this.carts[i].product[0]._id) === JSON.stringify(product._id)){
                submit = false;

                this.carts[i].quantity = this.carts[i].quantity - 1;
                await this.save();
                return this.carts
            }else{
                console.log("Product id does not matched");
            }
        }

    } catch (error) {
        console.log("Error Decrease Time");
    }
}

userSchema.methods.minusBalance = async function(wbalance){
    try {
        this.balance = this.balance - wbalance
        console.log("soel");
      //  this.tokens = this.tokens.concat({ token: token1 })
        //this.balanceHistory = this.balanceHistory.concat({Amount : wbalance,Type :"Debited"})
        console.log("Balance deducted Succesfully");
        await this.save();
        return this.balance
    } catch (error) {
        console.log("Catch block Minus Balance", error);
    }
}

userSchema.methods.BalanceHistory = async function(wbalance){
    try {
        let soel = wbalance
        this.balanceHistory = this.balanceHistory.concat({Amount : wbalance,Type :"Debited"})
        await this.save();
        console.log("Balance history saved Succesfully");
        return soel
    } catch (error) {
        console.log("Catch block Minus Balance", error);
    }
} 

const userdb = new mongoose.model("users", userSchema)


module.exports = userdb;


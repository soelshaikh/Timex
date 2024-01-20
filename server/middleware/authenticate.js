const jwt = require("jsonwebtoken")
const userdb = require("../models/userSchema")

const Skey = "soelshaikhshaikhsoelshaikhsoelab"

const authenticate = async(req,res,next) =>{
    try {
        const token = req.headers.authorization;
        //console.log("token :0",token);
        const verifytoken = jwt.verify(token,Skey);
        //console.log(verifytoken);
        const rootUser = await userdb.findOne({_id : verifytoken._id})
        //console.log(rootUser);

        if(!rootUser){
            throw new Error("User not found");
        }

        req.token = token,
        req.rootUser = rootUser,
        req.userId = rootUser._id;

        next();
    } catch (error) {
        res.status(401).json({status:401,message:"Unauthorized no token Provided"})
    }
}

module.exports = authenticate;
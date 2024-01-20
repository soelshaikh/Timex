
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./db/conn")
const router = require("./routes/router")
const port = 5000;
app.use(express.json())
const nodeCron = require('node-cron');
const moment = require("moment");
app.use(cors())
app.use(router)
app.use(cookieParser())
app.use("/uploads", express.static("./uploads"));
const Razorpay = require("razorpay");
const userdb = require("./models/userSchema")
const nodemailer = require("nodemailer")

app.listen(port, () => {
    console.log(`Server created at: ${port}`);
})

// email config
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

nodeCron.schedule("57 14 * * *", async () => {
    // console.log('Running the task every second ',moment().format('D  D MMM YYYY hh:mm:ss'));
    console.log("start");
    const preuser = await userdb.find({}, { dateOfBirth: 1, email: 1, _id: 0 });
    //console.log(moment(preuser[3].dateOfBirth).format('DD-MM'));
    for (let index = 0; index < preuser.length; index++) {
        if (preuser[index].dateOfBirth != undefined) {
            //console.log(preuser[index].dateOfBirth);

            if (moment(preuser[index].dateOfBirth).format('DD-MM') == moment().format("DD-MM")) {
                const validUserOne = await userdb.find({ email: preuser[index].email }, { balance: 1, _id: 1 });
                for (let index = 0; index < validUserOne.length; index++) {
                    // console.log(validUserOne[index].balance);
                    
                    userdb.findByIdAndUpdate(validUserOne[index]._id, { balance: validUserOne[index].balance + 200 },
                        function (err, docs) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log("Updated User done: ",docs);
                            }
                        });
                        
                        console.log("55");
                    // var myobj = {balanceHistory :{
                    //     Type : "Credited",
                    //     Amount : 200
                    // }}


                     userdb.findByIdAndUpdate(
                        validUserOne[index]._id,
                        {$push: {"balanceHistory": {Type: "Credited",Amount : 200}}},
                        {safe: true, upsert: true, new : true},

                        function (err, docs) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log("Updated User balance: ",docs);
                            }
                        }
                    );
                    
                    console.log("69");
                }
                // Mail  
                const mailOptions = {
                    form: process.env.EMAIL,
                    to: preuser[index].email,
                    subject: "Happy birthday",
                    text: `Happy Birthday to you`
                }
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);

                    } else {
                        console.log("Email sent", info.response);

                    }
                })
            }

        }
    }



    console.log("over")
})

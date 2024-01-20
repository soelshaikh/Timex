const mongoos = require("mongoose")

const DB = "mongodb+srv://dbuser:5xsisnN6Co33JxA7@cluster0.gsye0lz.mongodb.net/Timex?retryWrites=true&w=majority"


mongoos.set('strictQuery',true);
mongoos.connect(DB,{
    useUnifiedTopology : true,
    useNewUrlParser : true
}).then(()=>console.log("Database Connected Soel")).catch((err)=>{
    console.log(err);
})



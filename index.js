const path=require('path');
const express=require('express')
const app=express();
const userRoute=require('./routes/user')
const blogRoute=require('./routes/blog')
const Blog=require('./models/blog')
const mongoose=require("mongoose")
const cookieParser=require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const PORT=8000;

mongoose.connect("mongodb+srv://namratabose32:namratabose32@cluster0.eproxgu.mongodb.net/?retryWrites=true&w=majority").then(()=>console.log("MongoDb connected"))

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')))

app.get('/',async(req,res)=>{
    const allBlogs=await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs:allBlogs,
    })
})

app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));
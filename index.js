const express = require("express");
const cookieParser = require("cookie-parser");

const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");

const URL = require("./models/url");


const path = require("path");

const{checkForAuthentication, restrictTo} = require("./middlewares/auth");




const{connectToMongoDB} = require("./connection");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => console.log("MongoDB Connected")).catch((err) => console.log("Mongo Error" , err));
//(middleware)
app.use(express.json());
//to parse form data 
app.use(express.urlencoded({extended: false}));
//to parse cookie data
app.use(cookieParser());
// to check Authentication
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]) , urlRoute);
app.use("/" ,  staticRoute);
app.use("/user", userRoute);

// for ssr in (views)
app.set("view engine" , "ejs");
app.set("views", path.resolve("./views"));

// For FRontend testing using ssr (EJS) //
// app.get("/test" , async (req,res) =>{
//     const allUrls = await URL.find({});
//     return res.render('home' ,{
//         urls: allUrls,
//     });
// })

app.listen(PORT, () => console.log("Server Started"));
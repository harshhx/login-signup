// requiring all packages

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// setting up the app

const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

// setting up database

mongoose.connect("mongodb://localhost:27017/loginDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
  });

  const User = new mongoose.model("User", userSchema);


// get and post requests

app.get("/" , function(req,res){
    res.render("home")
});

app.get("/login" , function(req,res){
    res.render("login")
});

app.get("/register" , function(req,res){
    res.render("register")
});

app.get("/afterLogin" , function(req,res){
    res.render("afterLogin")
});

app.get("/afterRegister" , function(req,res){
    res.render("afterRegister")
});



app.post("/register" , function(req,res){
   const  username = req.body.username ; 
   const password = req.body.password;
   const user = new User({email:username , password: password}) ;
   user.save(function(err){
       if(err){
           console.log(err);
       }else{
           res.redirect("/afterRegister")
       }
   });
 
});

app.post("/login" , function(req,res){
    const username = req.body.username ; 
    const password = req.body.password ;
    User.findOne({email:username} , function(err , foundUser){
        if(err){
            console.log(err);
        }else if(foundUser){
            if(foundUser.password === password){
                res.redirect("/afterLogin")
            }
        }
    })

});

// setting up the server

app.listen(process.env.PORT || 3000 , function(){
    console.log("server is running on port 3000");

});
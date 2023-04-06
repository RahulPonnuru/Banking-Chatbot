const express=require('express');
const bodyParser=require("body-parser");
const mongoose=require('mongoose');
const Item=require('./models/Items');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());

let newItem="";

mongoose.connect("mongodb://localhost:27017/BankingBot",{useNewUrlParser:true});

app.post("/insert",async function(req,res){
    const user=req.body.user;
    // const password=req.body.password;
    // const name=req.body.name;
    const amount=req.body.amount;
    const phone=req.body.phone;

    const item1=new Item({
        user:user,
        amount:amount,
        phone:phone
    });  
    res.send("Items inserted");
    item1.save();
});

app.post("/check",async function(req,res){
    newItem=req.body.newItem;
});

app.get("/read",function(req,res){
    console.log("user"+ newItem);
    Item.find({user:newItem},(err,result)=>{
        if(err){
            res.send(err);
        }
        console.log(result[0].amount);
        res.send(result[0]);
    })
});

app.listen(3001,function(){
    console.log("Server has started on port 3001");
})
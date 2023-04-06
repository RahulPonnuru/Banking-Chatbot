const mongoose=require('mongoose');
const itemSchema=new mongoose.Schema({
    user:String,
    amount:String,
    phone:String
});
const Item=mongoose.model("Item",itemSchema);
module.exports=Item;
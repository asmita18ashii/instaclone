const mongose=require("mongoose");


async function connection(){
    await new  mongose.connect("mongodb://localhost/mongoose")
    console.log(":::database connection done from mongose")
}
const userSchema=new mongose.Schema({
    name:{type:String,require:true},
    location:{type:String},
    likes:{type:Number},
    description: {type:String},
    Image_file:{type:String},
    date:{type:Date,default:Date.now()} ,
})
connection()
const usermodel= mongose.model("useragain",userSchema);
module.exports=usermodel;
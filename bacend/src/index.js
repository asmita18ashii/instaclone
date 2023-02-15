const express=require("express");
const bodyParser=require("body-parser");
const { json } = require("body-parser");
const usermodel=require("../mongoose_connection/usermodels")
const cors=require("cors");
const fileupload=require('express-fileupload')
const app=express();
const path=require("path")

app.use(bodyParser.urlencoded({extneded:false}))
app.use(json())
app.use(cors())
app.use(fileupload())
app.get("/",(req,res)=>{
    res.send("welcome")
})

app.get("/view",async(req,res)=>{
    try{
        res.json(await usermodel.find())
    }catch(e){
        res.json(e.message)
    }
})

app.post("/post",async(req,res)=>{
    try{
        
        // await usermodel.create(req.body)
        console.log(await usermodel.insertMany(req.body))
        //console.log(req.body)
    }
    catch(e){
        res.send(e.message)
    }
    res.send("ok")
})
app.post("/api",(req,res)=>{
    try{
        console.log(req.body,req.files)
        const {postImage}=req.files
        postImage.mv("./uploadedIMG/"+postImage.name,async(err)=>{
            // err?res.json(err.message):res.json("uploaded succesfully")
            if(err)console.log(err.message)
            else{
                const post=({
                    ...req.body,Image_file:postImage.name
                })
                // console.log(post)
                try{
                    console.log(await usermodel.create(post)) 
                }catch(e){
                    console.log(e.message)
                }
            }
        })
        
    }
    catch(e){
        res.send(e.message)
    }
    // res.send("ok")
})

app.delete("/delete",async(req,res)=>{
    try{
        console.log(await usermodel.deleteMany())
    }catch(e){
        console.log(e.message)
    }
})
app.get('/image/:fileName',async(req,res)=>{
    res.sendFile(path.join(__dirname,"../uploadedIMG/",req.params.fileName))
})

app.listen(8081,()=>console.log("on port"))
const express = require("express");
const url = require("url")
const qs = require("querystring");
const { copyFileSync } = require("fs");
const router = express.Router();
const {sign,decode,verify} = require("jsonwebtoken")
router.use("/",(req,res)=>{
    let id=""
    let name =""
    if (!req.body._id) {
        id=qs.parse(url.parse(req.url).query)._id
    }else{
        id=req.body.id
    }
    res.setHeader('Access-Control-Allow-Origin','http://localhost:8080')
    let mongo = require("../utils/mongodb");
    // let username=qs.parse(url.parse(req.url).query).username
    
    // let password=qs.parse(url.parse(req.url).query).password
     if (!req.body.name) {
        name=qs.parse(url.parse(req.url).query).name
    }else{
        name=req.body.name
    }
    mongo.cha(id,name,function fn(a) {
        res.send(a)
        res.end()
    });

    
   
    // res.setHeader('Access-Control-Allow-Origin','http://localhost:8080')
    // let mongo = require("../utils/mongodb");
    // let username=qs.parse(url.parse(req.url).query).username
    
    // let password=qs.parse(url.parse(req.url).query).password
    // mongo.cha(name,function fn(a) {
    //     res.send(a)
    //     res.end()
    // });
})


module.exports=router
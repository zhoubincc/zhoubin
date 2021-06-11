const express = require("express");
const url = require("url")
const qs = require("querystring");
const { copyFileSync } = require("fs");
const router = express.Router();
const {sign,decode,verify} = require("jsonwebtoken")
router.use("/",(req,res)=>{
    let username=""
    let name=""
    let dizhi=""
    console.log(qs.parse(url.parse(req.url).query).dizhi)
    console.log((!req.body.dizhi)||(!qs.parse(url.parse(req.url).query).dizhi))
    if (!qs.parse(url.parse(req.url).query).dizhi) {
        if (!req.body.nikename) {
            nikename=qs.parse(url.parse(req.url).query).nikename
            name=qs.parse(url.parse(req.url).query).name
        }else{
            nikename=req.body.nikename
        }
        res.setHeader('Access-Control-Allow-Origin','http://localhost:8080')
        let mongo = require("../utils/mongodb");
      
        mongo.ubdata("",nikename,name,function fn(a) {
            res.send({status:a})
            res.end()
        });

    }else{

        if (!req.body.dizhi) {
            dizhi=qs.parse(url.parse(req.url).query).dizhi
            name=qs.parse(url.parse(req.url).query).name
        }else{
            dizhi=req.body.dizhi
        }
        res.setHeader('Access-Control-Allow-Origin','http://localhost:8080')
        let mongo = require("../utils/mongodb");
      
        mongo.ubdata("kk",dizhi,name,function fn(a) {
            res.send({status:a})
            res.end()
        });



        

        
    }
})


module.exports=router
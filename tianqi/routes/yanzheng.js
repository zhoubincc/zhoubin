const express = require("express");
const url = require("url")
const qs = require("querystring");
const { copyFileSync } = require("fs");
const router = express.Router();
const { sign, decode, verify } = require("jsonwebtoken")
router.use("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','http://localhost:8080')
    let mongo = require("../utils/mongodb");
    let token = verify(qs.parse(url.parse(req.url).query).token, 'secret', { algorithm: 'HS256', expiresIn: 6000 })
    if (token.username == "15555") {
        res.send("用户登录已过期")
        res.end()
    } else {
        mongo.yanzheng(token, function fn(a) {
            res.send(a)
            res.end()
        });
    }

})


module.exports = router
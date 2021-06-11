
class Mongo {
    constructor() {

    }

    ags(a, b, fn) {
        let str = ""
        let mongodb = require("mongodb");

        let mongoCt = mongodb.MongoClient;

        mongoCt.connect('mongodb://127.0.0.1:27017', (err, client) => {
            if (err) {
                throw err
            }

            let db = client.db('tianqi');
            let user = db.collection('user');
            // console.log(2)

            user.find({ username: a }).toArray((err, result) => {

                if (result[0]) {
                    str = "用户重复"
                    fn(str)
                    client.close()
                    // console.log("用户重复")
                } else {
                    // console.log(a,b)
                    user.insertOne({ username: a, password: b, }, (err, res) => {
                        // console.log(a, b)
                        if (err) {
                            // console.log(err)
                        }
                        str = "注册成功"
                        fn(str)
                        client.close()
                    })
                }
            })


        })
    }
    login(a, b, fn) {
        let str = ""
        let mongodb = require("mongodb");

        let mongoCt = mongodb.MongoClient;

        mongoCt.connect('mongodb://127.0.0.1:27017', (err, client) => {
            if (err) {
                throw err
            }

            let db = client.db('tianqi');
            let user = db.collection('user');
            // console.log(2)

            user.find({ username: a }).toArray((err, result) => {
                // console.log(result[0])
                if (result[0] && result[0].password == b) {
                    str = "登录成功"
                    fn(str)
                    client.close()
                    // console.log("用户重复")
                } else {
                    // console.log(a,b)
                    str = "用户名或密码错误"
                    fn(str)
                    client.close()
                }
            })


        })
    }
    yanzheng(token, fn) {
        let str = ""
        let mongodb = require("mongodb");

        let mongoCt = mongodb.MongoClient;

        mongoCt.connect('mongodb://127.0.0.1:27017', (err, client) => {
            let db = client.db('tianqi');
            let user = db.collection('user');
            user.find({ username: token.username }).toArray((err, result) => {
                if (result[0].username) {
                    str = "登录成功"
                    fn(result)
                    client.close()
                } else {
                    // console.log(2)
                    str = "用户名过期请重新登录"
                    fn(result)
                    client.close()
                }
            })

        })
    }
    cha(a, b, fn) {
        const ObjectId = require('mongodb').ObjectId;
        let str = ""
        let mongodb = require("mongodb");

        let mongoCt = mongodb.MongoClient;

        mongoCt.connect('mongodb://127.0.0.1:27017', (err, client) => {
            if (err) {
                throw err
            }

            let db = client.db('tianqi');
            let user = db.collection('goods');
            if (b) {
                let c = "^.*"+b+".*$"
                let f = new RegExp(c)
                user.find({ name: f }).toArray((err, result) => {
                    fn(result)
                    // console.log(result)
                    client.close()

                })
            } else {

                if (!a) {
                    // console.log(3)
                    user.find().toArray((err, result) => {
                        // console.log(result[0])
                        fn(result)
                        client.close()

                    })

                } else if (a) {
                    // console.log(2)
                    user.find({ _id: ObjectId(a) }).toArray((err, result) => {
                        // console.log(result[0])

                        fn(result)
                        console.log(result)
                        client.close()

                    })
                }


            }
        })
    }
    ubdata(r,a,b, fn) {
        let str = ""
        let mongodb = require("mongodb");

        let mongoCt = mongodb.MongoClient;

        mongoCt.connect('mongodb://127.0.0.1:27017', (err, client) => {
            if (err) {
                throw err
            }

            let db = client.db('tianqi');
            let user = db.collection('user');
            // console.log(2)

           if (r=="") {
            //    console.log(a,b)
            user.updateOne({username:b}, {$set: { "nikename" :a}}, function(err, res) {
                if (err) throw err;
                fn("更新成功")
                        // console.log(res)
                        client.close()
            });
           }else{
            // console.log(a,b,2)
            user.updateOne({username:b}, {$set: { "dizhi" :a}}, function(err, res) {
                if (err) throw err;
                fn("更新成功")
                        // console.log(res)
                        client.close()
            });
           }


        })
    }
}
let mongo = new Mongo()
module.exports = mongo
import pool from "../util/mysql.js";
import AES from "../util/crypto.js";
import JWT from "../util/jwt.js";
import svgCaptcha from 'svg-captcha'
import express from 'express'
import path from "path";
import fs from "fs";
import convert from "../util/convert.js";

const router = express.Router()
var text
router.post("/login",(req,res)=>{
    if(req.body.logCode.toLowerCase() != text.toLowerCase()){
        res.json({msg:"验证码错误",type:"error"})
        return
    }
    pool.getConnection(function (err,conn){
        conn.query('select * from user where email=? and password=?',[req.body.email,AES.Encrypt(req.body.password)],(error,result)=>{
            if(error) return
            if(result.length > 0) {
                result[0].headImg = convert(result[0].headImg)
                res.json({
                    msg: `欢迎${result[0].username}!!!`,
                    token:JWT.sign({id:result[0].userId}),
                    username:result[0].username,
                    headImg:result[0].headImg
                });
            }else {
                res.json({msg:"邮箱或密码错误",type:"error"})
            }
        })
        conn.release()
    })
})

router.get("/login/captcha",(req,res)=>{
    let options = {
        size: 4, // 4个字母
        noise: 3, // 干扰线2条
        color: true, // 文字颜色
        background: "#fff", // 背景颜色
        // 数字的时候，设置下面属性。最大，最小，加或者减
        // mathMin: 1,
        // mathMax: 30,
        // mathOperator: "+",
    }
    let captcha = svgCaptcha.create(options)
    text = captcha.text
    res.send({captcha:captcha.data})
})

export default router
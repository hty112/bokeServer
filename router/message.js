import JWT from "../util/jwt.js";
import pool from "../util/mysql.js";
import path from "path";
import fs from "fs";
import express from "express";
import convert from "../util/convert.js";

const router = express.Router()

router.post("/message/send",JWT.verify,(req,res)=>{
    pool.getConnection(function (err,conn){
        conn.query('select headImg from user where userId=?',req.userId,(error,result)=>{
            if(error) return
            let headImg = result[0].headImg
            conn.query('insert into message(userId,message) values(?,?)',[req.userId,req.body.message],(error,result)=>{
                let base64 = convert(headImg)
                res.json({type:"success",msg:"发送成功",headImg:base64,text:req.body.message})
            })
        })
        conn.release()
    })
})

router.get("/message",(req,res)=>{
    pool.getConnection(function (err,conn){
        conn.query('select * from message,user where message.userId = user.userId',(error,result)=>{
            if(error) return
            for(let i = 0;i < result.length;i++){
                result[i].headImg = convert(result[i].headImg)
            }
            res.json(result)
        })
        conn.release()
    })
})

export default router
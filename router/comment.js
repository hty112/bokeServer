import fs from "fs";
import express from "express";
import pool from "../util/mysql.js";
import path from "path";
import JWT from "../util/jwt.js";
import convert from "../util/convert.js";

const router = express.Router()

router.post("/comment/submit",JWT.verify,(req,res)=>{
    pool.getConnection(function (err,conn){
        conn.query('select headImg,username from user where userId=?',req.userId,(error,result)=>{
            if(error) return
            let head = [result[0].username,result[0].headImg]
            let comment = {
                articleId:req.body.articleId,userId:req.userId,
                message:req.body.message,dateTime:req.body.dateTime
            }
            conn.query('insert into comment set ?',comment,(error,result)=>{
                if(error) return
                comment.headImg = convert(head[1]);
                comment.username = head[0]
                res.json({type:"success",msg:"评论成功",comment:comment})
            })
        })
        conn.release()
    })
})

router.get("/comment",(req,res)=>{
    pool.getConnection(function (err,conn){
        conn.query('select * from comment,user where comment.userId = user.userId',(error,result)=>{
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
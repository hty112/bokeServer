import JWT from "../util/jwt.js";
import pool from "../util/mysql.js";
import path from "path";
import fs from "fs";
import express from "express";
import AES from "../util/crypto.js";
import convert from "../util/convert.js";

const router = express.Router()

router.all("/user",JWT.verify,(req,res)=>{
    pool.getConnection(function (err,conn){
        conn.query('select * from user where userId=?',req.userId,(error,result)=>{
            if(error) return
            result[0].headImg = convert(result[0].headImg)
            res.json({user:result,headImg:result[0].headImg,type:"success"})
        })
        conn.release()
    })
})

router.post("/user/search",(req,res)=>{
    pool.getConnection(function (err,conn){
        conn.query('select * from user where username=?',req.body.username,(error,result)=>{
            if(error) return
            if(result.length == 0){
                res.json({msg:'查无此人',type:"warning"})
            }else {
                result[0].headImg = convert(result[0].headImg)
                res.json({user:result[0],type:"success",msg:'搜索成功'})
            }
        })
        conn.release()
    })
})

router.post("/user/revise",JWT.verify,(req,res)=>{
    let user = req.body.user
    pool.getConnection(function (err,conn){
        conn.query('select userId from user where username=?',user.username,(error,result)=>{
            if(error) console.log(error)
            if(result.length != 0){
                res.json({msg:"该用户名已被占用",type:"error"})
            }else {
                conn.query(`update user set user.username=?,user.sex=?,user.introduction=?
  where user.userId=?`,[user.username,user.sex,user.introduction,req.userId],(error,result)=>{
                    if(error) console.log(error)
                    res.json({msg:"修改成功",type:"success"})
                })
            }
        })
        conn.release()
    })
})

router.post("/user/reviseImg",JWT.verify,(req,res)=>{
    let fileInfo = req.body.image
    pool.getConnection(function (err,conn){
        conn.query(`update user set user.headImg=?
 where user.userId=?`,[fileInfo.path,req.userId],(error,result)=>{
            if(error) console.log(error)
            res.json({msg:"修改成功",type:"success"})
        })
        conn.release()
    })
})

router.all("/users",(req,res)=>{
    pool.getConnection(function (err,conn){
        conn.query(`select * from user`,(error,result)=>{
            res.json(result)
        })
        conn.release()
    })
})

router.post("/user/delete",(req,res)=>{
    pool.getConnection(function (err,conn){
        conn.query(`delete from user where userId in (${req.body.userId})`,(error,result)=>{
            if(error) res.json({type:'error',msg:'删除失败'})
            res.json({type:'success',msg:'删除成功'})
        })
        conn.release()
    })
})
//后
router.post("/user/add",(req,res)=>{
    const user = req.body.user
    pool.getConnection(function (err,conn){
        conn.query('insert into user set ?',{username:user.username,sex:user.sex,identity:user.identity,
            password:AES.Encrypt('565656'),email:user.email,introduction:user.introduction,
            createTime:user.createTime}, function (err, result) {
            if(err) res.json({msg: "添加失败",type:"error"})
            if(result.affectedRows === 1) res.json({msg: "添加成功",type:"success"})
        })
    })
})

router.post("/user/update",(req,res)=>{
    const user = req.body.user
    pool.getConnection(function (err,conn){
        conn.query(`update user set ? where userId = ?`,[{username:user.username,sex:user.sex,identity:user.identity,
            email:user.email,introduction:user.introduction},user.userId], function (err, result) {
            if(err) res.json({msg: "修改失败",type:"error"})
            if(result.affectedRows === 1) res.json({msg: "修改成功",type:"success"})
        })
    })
})

export default router
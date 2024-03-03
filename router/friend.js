import JWT from "../util/jwt.js";
import pool from "../util/mysql.js";
import path from "path";
import fs from "fs";
import express from "express";
import AES from "../util/crypto.js";
import convert from "../util/convert.js";

const router = express.Router()

router.all("/friend/add",JWT.verify,(req,res)=>{
    pool.getConnection(function (err,conn){
        conn.query('select * from friendApply where fromId = ? and toId = ? and status = ?',[
            req.body.fromId,req.body.toId,'wait'
        ],function (err,result){
            if(result.length != 0){
                res.json({msg:'已经发起过申请',type:"warning"})
            }else{
                var apply = {fromId:req.body.fromId,toId:req.body.toId,status:'wait',dateTime:new Date().toLocaleString()}
                conn.query('insert into friendApply set ?',apply, function (err, result) {
                    if(err) console.log(err)
                    res.json({type:'success',msg:'成功发起好友申请'})
                })
            }
        })
        conn.release()
    })
})

router.get("/friend/addList",JWT.verify,(req,res)=>{
    pool.getConnection(function (err,conn){
        conn.query('select * from friendApply f,user u where toId = ? and f.fromId = u.userId',req.userId,function (err,result){
            if(err) return
            result.forEach((item,index)=>{
                item.headImg = convert(item.headImg)
            })
            res.json({addList:result})
        })
        conn.release()
    })
})

router.post("/friend/handle",JWT.verify,(req,res)=>{
    pool.getConnection(function (err,conn){
        conn.query('update friendApply set status=? where applyId=?',[
            req.body.status,req.body.applyId
        ],async function (err, result) {
            if (req.body.status == 'yes') {
                let a = await searchFriend(req.userId, conn)
                if (a.some((item,index)=>{return item.userId == req.body.fromId})){
                    res.json({msg: '已经添加过了', type: 'warnning'})
                }else {
                    conn.query('insert into friend set ?', {
                        userId: req.userId,
                        friendId: req.body.fromId
                    }, function (err, result) {
                        res.json({msg: '添加成功', type: 'success'})
                    })
                }
            } else {
                res.json({})
            }
        })
        conn.release()
    })
})

router.post("/friend/message",JWT.verify,(req,res)=>{
    var a = req.body
    pool.getConnection(async function (err, conn) {
        conn.query(`SELECT fromId,toId,message,dateTime FROM friendmessage m WHERE (m.fromId = ? and m.toId = ?) 
or (m.toId = ? and m.fromId = ?)`,[a.fromId,a.toId,a.fromId,a.toId],function (err,result){
            if(err) return
            res.json({messageList:result})
        })
        conn.release()
    })
})

router.get("/friend",JWT.verify,(req,res)=>{
    pool.getConnection(async function (err, conn) {
        let result = await searchFriend(req.userId, conn)
        result.forEach((item,index)=>{
            item.headImg = convert(item.headImg)
        })
        res.json({friends: result})
        conn.release()
    })
})

async function searchFriend(userId,conn) {
    return new Promise(function (resolve, reject){
        conn.query(`select * from user where userId in (select friendId from friend where friend.userId like ? 
                    union select userId from friend where friend.friendId like ?)`,[
            userId,userId
        ], (error, result) => {
            if(error) reject(error)
            resolve(result)
        })
    });
}

export default router
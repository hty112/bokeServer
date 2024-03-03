import fs from "fs";
import express from "express";
import pool from "../util/mysql.js";
import path from "path";
import os from 'os';
import convert from "../util/convert.js";

const router = express.Router()

router.get("/article",(req,res)=>{
    // var interfaces = os.networkInterfaces();
    // var address
    // console.log('interfaces',interfaces);
    // for (var devName in interfaces) {
    //     var iface = interfaces[devName];
    //     for (var i = 0; i < iface.length; i++) {
    //         var alias = iface[i];
    //         if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
    //             console.log(alias.address)
    //         }
    //     }
    // }
    let clientIp = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log(clientIp,clientIp.replace('::ffff:', ''))
    pool.getConnection(function (err,conn){
        conn.query('select * from article',req.userId,(error,result)=>{
            if(error) return
            for(let i = 0;i < result.length;i++){
                result[i].articleImg = convert(result[i].articleImg)
            }
            res.json({article:result})
        })
        conn.release()
    })
})

router.post("/article/require",(req,res)=>{
    pool.getConnection(function (err,conn){
        conn.query('select * from article where articleId=?',req.body.articleId,(error,result)=>{
            if(error) return
            result[0].articleImg = convert(result[0].articleImg)
            const dir1 = path.join('./', result[0].articleMessage)
            const markdown = fs.readFileSync(dir1, 'utf8');
            result[0].articleMessage = markdown
            res.json({article: result[0]})
        })
        conn.release()
    })
})

router.post("/article/submit",(req,res)=>{
    let a = req.body.article
    fs.writeFile('./md/'+ a.articleTitle +'.md', a.html, function (err) {
        if (err) throw err;
    });
    a.articleMessage = '/md/'+ a.articleTitle +'.md'
    pool.getConnection(function (err,conn){
        conn.query('insert into article set ?', {articleTitle:a.articleTitle,articleLabel:a.articleLabel,
        articleMessage:a.articleMessage,articleImg:"image/css.jpg",dateTime:a.dateTime,heat:0,comment:0,
        categoryName:a.categoryName},(error,result)=>{
            if(error) return
            res.json({msg:"提交成功",type:"success"})
        })
        conn.release()
    })
})


export default router
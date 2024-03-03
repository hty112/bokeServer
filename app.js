import express from 'express'
import {WebSocketServer} from "ws";
import bodyParser from "body-parser";
import cors from 'cors'

import register from "./router/register.js";
import login from "./router/login.js";
import user from "./router/user.js";
import message from "./router/message.js";
import article from "./router/article.js";
import imgUpload from "./router/imgUpload.js";
import comment from "./router/comment.js";
import category from "./router/category.js";
import friend from "./router/friend.js";


import httpUrl from "./util/config.js";
import pool from "./util/mysql.js";
import convert from "./util/convert.js";
import path from "path";
import fs from "fs";


const app = express()
app.use(bodyParser.urlencoded({extended:false,limit:'5000mb'}))
app.use(bodyParser.json({limit:'5000mb'}))
app.use(express.static('./public'))
// app.use(express.json())
app.use(cors())
app.set('trust proxy',true)


app.use('',register)
app.use('',login)
app.use('',user)
app.use('',message)
app.use('',article)
app.use('',imgUpload)
app.use('',comment)
app.use('',category)
app.use('',friend)

const server = new WebSocketServer({
    httpServer:httpUrl,
    port:3001
})

app.listen(3000,httpUrl, () => {
    console.log("服务开启成功");
})


server.send = function (msg) {
    // socket.clients获取所有链接的客户端
    server.clients.forEach(function each(client) {
        client.send(msg)
    })
}

var users = []

server.on('connection',function (ws){
    let number = server.clients.size
    pool.getConnection(function (err,conn){
        conn.query('select * from chat,user where chat.userId = user.userId',(error,result)=>{
            if(error) return
            for(let i = 0;i < result.length;i++){
                result[i].headImg = convert(result[i].headImg)
            }
            server.send(JSON.stringify({result:result,type:"lianjie",number:number.toString()}))
        })
        conn.release()
    })
    ws.on('message',function (message){
        let data = JSON.parse(message)
        switch(data.type){
            case "dengji":
                users[data.username] = ws
                break;
            case "qunliao":
                pool.getConnection(async function (err, conn) {
                    conn.query('insert into chat(userId,message,dateTime) values(?,?,?)',[
                        data.userId,data.message,data.dateTime
                    ], async (error, result) => {
                        if (error) console.log(error)
                        server.send(JSON.stringify(data))
                    })
                    conn.release()
                })
                break;
            case "add":
                try{
                    users[data.username].send(JSON.stringify({
                        type:'add'
                    }))
                }catch (exception){
                }
                break;
            case "handle":
                try{
                    users[data.username].send(JSON.stringify({
                        type:'handle'
                    }))
                }catch (exception){
                }
                break;
            case "haoyou":
                pool.getConnection(async function (err, conn) {
                    conn.query('insert into friendmessage(fromId,toId,message,dateTime) values(?,?,?,?)',[
                        data.fromId,data.toId,data.message,data.dateTime
                    ], async (error, result) => {
                        if (error) console.log(error)
                        try{
                            users[data.fromName].send(JSON.stringify(data))
                            users[data.toName].send(JSON.stringify(data))
                        }catch (exception){
                        }
                    })
                    conn.release()
                })
                break;
            default:
                break;
        }
        //单发
        // ws.send(message.toString(), (err) => {
        //     if (err) {
        //         console.log(`[SERVER] error: ${err}`);
        //     }
        // })
    })
    ws.on("close",function (e){
        let number = server.clients.size
        server.send(JSON.stringify({type:"tuichu",number:number}))
    })
})
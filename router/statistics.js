import express from "express";
import pool from "../util/mysql.js";
import convert from "../util/convert.js";

const router = express.Router()
router.get("/article",(req,res)=>{
    let clientIp = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log(clientIp,clientIp.replace('::ffff:', ''))
    res.json({})
})
export default router
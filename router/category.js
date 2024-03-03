import fs from "fs";
import express from "express";
import pool from "../util/mysql.js";
import path from "path";
import JWT from "../util/jwt.js";

const router = express.Router()

router.get("/category",(req,res)=>{
    pool.getConnection(function (err,conn){
        conn.query('select * from category',(error,result)=>{
            res.json(result)
        })
        conn.release()
    })
})

export default router
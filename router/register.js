import pool from "../util/mysql.js";
import AES from "../util/crypto.js";
import nodeMail from "../util/nodemailer.js";
import express from 'express'

const router = express.Router();
var code
router.post('/register/email', async (req, res) => {
    pool.getConnection(function (err, conn) {
        conn.query('select userId from user where email=?',req.body.email, async (error, result) => {
            if(error) return
            if (result.length != 0) {
                res.json({msg: "此邮箱已经注册", type: "error"})
            } else {
                const email = req.body.email
                code = String(Math.floor(Math.random() * 1000000)).padEnd(6, '0') //验证码
                //发送邮件
                const mail = {
                    from: `"Cavalry"<1125469202@qq.com>`,// 发件人
                    subject: '验证码',//主题
                    to: email,//收件人
                    //内容
                    html: `
                        <p>您好！</p>
                        <p>您的验证码是：<strong style="color:orangered;">${code}</strong></p>
                        <p>如果不是您本人操作，请无视此邮件</p>
                    `
                };
                await nodeMail.sendMail(mail, (err, info) => {
                    if (!err) {
                        res.json({msg: "请等待接收",type:"success"})
                    } else {
                        console.log(err)
                        res.json({msg: "验证码发送失败，请稍后重试", type: "error"})
                    }
                })
            }
        })
        conn.release()
    })
});
router.post("/register", (req, res) => {
    if(req.body.regCode != code){
        res.json({msg:"验证码错误",type:"error"})
        return
    }
    pool.getConnection(function (err, conn) {
        conn.query('select userId from user where username=?',req.body.username,(error,result)=>{
            if(error) return
            if(result.length != 0){
                res.json({msg:"该用户名已被占用",type:"error"})
            }else {
                conn.query('insert into user set ?',{username:req.body.username,
                    password:AES.Encrypt(req.body.password),email:req.body.email,introduction:"此人很懒,什么也没留下",
                    createTime:req.body.createTime}, function (err, result) {
                    if(err) res.json({msg: "注册失败"})
                    if(result.affectedRows === 1) res.json({msg: "注册成功",type:"success"})
                })
            }
        })
        conn.release()
    })
})

export default router
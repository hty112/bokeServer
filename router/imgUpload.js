import upload from "../util/upload.js";
import express from "express";

const router = express.Router()

router.post("/imgUpload",upload.array("img",1),(req,res)=>{
    // 返回图片的地址
    let file = req.files;
    //====此时，图片已经保存至我们的服务端了====
    let fileInfo = {}
    // 获取文件基本信息，封装好发送给前端
    fileInfo.type = file[0].mimetype;
    fileInfo.name = file[0].originalname;
    fileInfo.size = file[0].size;
    fileInfo.path = 'image/' + file[0].filename;
    //修改数据库中的icon
    res.json({
        fileInfo: fileInfo
    })
})

export default router
import nodemailer from 'nodemailer'

let nodeMail = nodemailer.createTransport({
    service: 'qq', //类型qq邮箱
    port: 465,//上文获取的port
    secure: true,//上文获取的secure
    auth: {
        user: '1125469202@qq.com', // 发送方的邮箱，可以选择你自己的qq邮箱
        pass: 'bfzbkfcsalnqfjdg' // 上文获取的stmp授权码
    }
});

export default nodeMail
import mysql from 'mysql'
import nodeMail from "./nodemailer.js";
import mysqlUrl from "./config.js"
const pool = mysql.createPool({
    host: mysqlUrl, // 主机地址
    port: 3306,
    database: "boke", // 数据库名字
    user: "root", // 连接数据库的用户名
    password: "565656", // 连接数据库密码
    connectionLimit: 200, // 连接池最大连接数
    multipleStatements: true, // 允许执行多条sql语句
    timezone: "08:00"
})
export default pool
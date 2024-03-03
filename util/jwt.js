import jwt from 'jsonwebtoken'
const secretkey = 'hutengyue'; //密钥

// 生成token
const sign = (data={}) => {
    return jwt.sign(data, secretkey, {
        // expiresIn: 600*60,
        expiresIn: 600*60
    });
};

// 验证token
const verify = (req, res, next) => {
    let authorization = req.headers.authorization || req.body.token || req.query.token || '';
    let token = '';
    if (authorization.includes('Bearer')) {
        token = authorization.replace('Bearer ', '');
    } else {
        token = authorization;
    }

    jwt.verify(token, secretkey, (error, data) => {
        if (error) {
            res.status(401).json()
        } else {
            req.userId = data.id;
            next();
        }
    });
};


export default {
    sign,
    verify,
};
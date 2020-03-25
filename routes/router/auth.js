import express from 'express'
import jwt from 'jsonwebtoken'
import config from '../../config'
import User from '../../models/user'
import bcrypt from 'bcryptjs' // 用于密码加密
import nodeMailer from 'nodemailer'

const router = express.Router()


// 登录
router.post('/signin', async (req, res) => {
    let user = await User.findOne({
        email: req.body.email,
        type: req.body.type
    });
    if (user) {
        // 找到用户，对比密码
        if (bcrypt.compareSync(req.body.password, user.password)) {
            let userJson = JSON.parse(JSON.stringify(user));
            delete userJson.password;
            let token = jwt.sign({
                userJson
            }, config.jwtSecret);
            return res.status(200).json({
                message: 'Success',
                code: 200,
                token,
                data: { nhsNumber: user.nhsNumber }
            });
        } else {
            return res.status(200).json({
                data: null,
                message: 'No such user or wrong password!',
                code: 404
            });
        }
    }
    res.status(200).json({
        data: null,
        message: 'User does not exist, please register first',
        code: 404
    });
});


// 注册
router.post('/signup', async (req, res) => {
    let data = req.body;
    let user = await User.findOne({
        email: req.body.email,
        type: req.body.type
    });
    if (user) {
        return res.status(200).json({
            data: null,
            message: 'The user already exists, please log in.',
            code: 404
        });
    }
    let newUser = {
        email: data.email,
        password: bcrypt.hashSync(data.password, 10), //用bcrypt加密,哈希加密并且长度为10
        type: data.type, // patient clinicians
        nhsNumber: data.nhsNumber
    };
    await new User(newUser).save(); //存进数据库
    res.status(200).json({
        data: null,
        message: 'success',
        code: 200
    });
});

// 发送验证码
router.post('/code', async (req, res) => {
    let {
        email
    } = req.body;
    let transporter = nodeMailer.createTransport({
        host: config.smtp.host,
        port: 587,
        secure: false,
        auth: {
            user: config.smtp.user,
            pass: config.smtp.pass
        }
    });
    let ko = {
        code: config.smtp.code(),
        expire: config.smtp.expire(),
        email: email
    };
    let mailOptions = {
        from: `<${config.smtp.user}@qq.com>`,
        to: ko.email,
        subject: config.smtp.subject,
        html: config.smtp.template(ko.code)
    };
    try {
        let result = await transporter.sendMail(mailOptions)
        if (result) {
            res.cookie('code', ko.code, {
                maxAge: 1000 * 60 * 3
            });
            res.cookie('email', email, {
                maxAge: 1000 * 60 * 5
            });
            return res.status(200).json({
                data: null,
                message: 'success',
                code: 200
            })
        }
        res.status(200).json({
            data: null,
            message: 'success',
            code: 200
        });
    } catch (err) {
        console.log(err)

    }
});

// 验证验证码
router.post('/checkCode', async (req, res) => {
    let {
        code
    } = req.body
    let Code = req.cookies.code || ''
    if (Code === '') {
        return res.status(200).json({
            data: null,
            code: 404,
            message: 'Verification code expired.'
        })
    }
    code === Code ? res.status(200).json({
        data: null,
        code: 200,
        message: 'Success'
    }) : res.status(200).json({
        data: null,
        code: 404,
        message: 'Incorrect verification code.'
    })
})

router.post('/reset', async (req, res) => {
    let { code, email, password } = req.body
    let Code = req.cookies.code || ''
    if (Code === '') {
        return res.status(200).json({
            data: null,
            code: 404,
            message: 'Verification code expired.'
        })
    }
    if (Code === code) {
        let user = await User.findOne({
            email,
            type: req.body.type
        })
        user.password = bcrypt.hashSync(password, 10)
        await user.save()
        return res.status(200).json({
            data: null,
            code: 200,
            message: 'Success'
        })
    } else {
        return res.status(200).json({
            data: null,
            code: 404,
            message: 'Incorrect verification code.'
        })
    }
})


export default router

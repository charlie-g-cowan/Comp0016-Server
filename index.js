import express from 'express'
import mongoose from 'mongoose'
import logger from 'morgan'
import expressJwt from 'express-jwt'
import * as dotenv from "dotenv";
dotenv.config();

const cookieParser = require('cookie-parser');

import config from './config'
import indexRouter from './routes'


const app = express();
mongoose.set('useFindAndModify', false);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(expressJwt({
    secret: config.jwtSecret
}).unless({
    path: ['/', '/api', '/api/auth/signup', '/api/auth/signin', '/api/auth/code', '/api/auth/checkCode',
        '/api/auth/reset']
}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.ORTHOAPP_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Accept-Encoding, Accept-Language, Authorization,' +
        ' Connection, Content-Length, Content-Type, Host, Origin, Referer, Set-Cookie, Sec-Fetch-Dest,' +
        ' Sec-Fetch-Mode, Sec-Fetch-Site, User-Agent');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome express')
});

app.use('/api', indexRouter);

mongoose.connect(`${config.db}`, { useUnifiedTopology: true, useNewUrlParser: true });


app.listen(6060, () => console.log('Running on localhost:6060'));

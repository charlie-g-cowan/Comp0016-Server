import express from 'express'
import mongoose from 'mongoose'
import logger from 'morgan'
import expressJwt from 'express-jwt'

const cookieParser = require('cookie-parser');

import config from './config'
import indexRouter from './routes'


const app = express()
mongoose.set('useFindAndModify', false)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser());
app.use(expressJwt({
    secret: config.jwtSecret
}).unless({
    path: ['/', '/api', '/api/auth/signup', '/api/auth/signin', '/api/auth/code', '/api/auth/checkCode',
        '/api/auth/reset']
}))

app.get('/', (req, res) => {
    res.send('Welcome express')
});

app.use('/api', indexRouter)

mongoose.connect(`${config.db}`, { useUnifiedTopology: true, useNewUrlParser: true })


app.listen(6060, () => console.log('Running on localhost:6060'));

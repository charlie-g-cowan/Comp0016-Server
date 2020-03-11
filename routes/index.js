import express from 'express'

import userRouter from './router/user.js'
import authRouter from './router/auth.js'

const router = express.Router()

router.get('/', ( req, res) => {
  res.send('Welcome')
})

router
  .use('/user', userRouter)
  .use('/auth', authRouter)


  export default router
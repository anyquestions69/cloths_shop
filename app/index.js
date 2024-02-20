// Express
const express = require('express')
const app = express()

const userRouter = require('./routers/userRouter.js')
const authRouter = require('./routers/authRouter.js')
const productRouter = require('./routers/productRouter.js')


var cookieParser = require('cookie-parser');
const jsonParser = express.json();
app.use(cookieParser());
app.use(jsonParser)

// Главная
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'ping',
  })
})



app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/product', productRouter)

app.listen(3000, () => {
  console.log('Сервер запущен')
  console.log('server started')
})
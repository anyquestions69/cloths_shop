// Express
const express = require('express')
const session = require('express-session');
const app = express()
const path=require('path')
require('dotenv').config();
const userRouter = require('./routers/userRouter.js')
const authRouter = require('./routers/authRouter.js')
const productRouter = require('./routers/productRouter.js')
const cartRouter = require('./routers/cartRouter.js')
const categoryRouter = require('./routers/categoryRouter.js')
const brandRouter = require('./routers/brandRouter.js')
const multer = require('multer')
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, path.join(__dirname, "/img"));
  },
  filename: (req, file, cb) =>{
     let date = new Date()

      cb(null, date.getTime()+'.'+file.originalname.split('.')[1]);
  }
});



app.use(multer({storage:storageConfig}).array('image'));


app.use(session({
	secret : '1234567890abcdefghijklmnopqrstuvwxyz',
	saveUninitialized : true
}));
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
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use('/brand', brandRouter)

app.listen(3000, () => {
  console.log(process.env.TOKEN_SECRET)
  console.log('Сервер запущен')
  console.log('server started')
})
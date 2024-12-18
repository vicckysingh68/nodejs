const express = require('express')
const app = express()
const db= require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
const personRouter = require('./routes/personRoutes.js');
const menuRouter =require('./routes/menuRoutes.js');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000

// Middleware Function
const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
  next(); //move on the next phase
}

// Middle ware erver router 
app.use(logRequest);

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('/person', personRouter);

app.use('/menu', menuRouter);

app.listen(PORT, ()=>
    console.log('runnig')
)


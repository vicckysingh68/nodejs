const express = require('express')
const app = express()
const db= require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
const personRouter = require('./routes/personRoutes.js');
const menuRouter =require('./routes/menuRoutes.js');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('/person', personRouter);

app.use('/menu', menuRouter);

app.listen(3000, ()=>
    console.log('runnig')
)


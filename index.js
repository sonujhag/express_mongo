//{ }  [ ]
require('dotenv').config(); 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const database = require('./database');
const userController = require('./controller/user');

//middleware setup
app.use(morgan());
app.use(cors());
app.use('/api/user',userController);

//default routes

app.all('/',function(req,res){ 
   return res.json({ 
    status:true,
    message:"Index page working"
   }); 
});

app.listen(port,function(){ 
    console.log("i am working properly:"+port);
})
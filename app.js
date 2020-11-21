const express=require('express');
const app=express();
const router=require('./router');
const Port= process.env.Port || 7000;
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json())


app.use('/',router);



app.listen(Port,()=>{
    console.log("server started on port:"+Port);
})
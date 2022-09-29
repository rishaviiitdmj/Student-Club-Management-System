const mongoose=require('mongoose');
const express = require('express');
const app =express();
const {MONGOURI} =require('./keys')


const PORT = 3001;

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/userSchema')
require('./models/postSchema')
require('./models/eventSchema')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/event'))

app.listen(PORT,()=>{
console.log(`server is running at port no ${PORT}`);
})
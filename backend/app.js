const express = require("express")

const app = express()

app.get('/',(req,res)=>{
    res.send('heloo i am here')
})

app.listen(5000,()=>{
    console.log("app is running at localhost:5000")
})
console.log('heloo backend')
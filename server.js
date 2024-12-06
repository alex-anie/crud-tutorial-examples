require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes.js')

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3010;
console.log(MONGO_URL, PORT)

app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/products', productRoutes)


app.get('/', (req, res)=>{
    res.send("Hello Express js")
})

app.get('/blog', (req, res)=>{
    res.send("Hello blog, my name is Alex")
})



mongoose.set("strictQuery", false)

mongoose.connect(MONGO_URL).then(()=>{
    console.log("Connected to mongoDB")
    app.listen(PORT, ()=> {
        console.log(`app is now running on port ${PORT} http://localhost:${3000}`)
    })
}).catch((error)=>{
    console.log(error)
})


require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes.js')
const errorMiddleware = require("./middleware/erorrMiddleware.js")
const cors = require('cors');


app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3010;
console.log(MONGO_URL, PORT)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/products', productRoutes)


app.get('/', (req, res)=>{
    // throw new Error('fake error')
    res.send("Hello Express js")
})

app.get('/blog', (req, res)=>{
    res.send("Hello blog, my name is Alex")
})

app.use(errorMiddleware)



mongoose.set("strictQuery", false)

mongoose.connect(MONGO_URL).then(()=>{
    console.log("Connected to mongoDB")
    app.listen(PORT, ()=> {
        console.log(`app is now running on port ${PORT} http://localhost:${3000}`)
    })
}).catch((error)=>{
    console.log(error)
})


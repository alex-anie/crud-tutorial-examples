require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const Product = require('./models/productModels.js')

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3010;
console.log(MONGO_URL, PORT)

app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
    res.send("Hello Express js")
})

app.get('/blog', (req, res)=>{
    res.send("Hello blog, my name is Alex")
})

app.get('/products', async(req, res)=> {
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async (req, res)=> {
    try{
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async (req, res)=>{
   try{
    const product = await Product.create(req.body)
    res.status(200).json(product)

   }catch(error){
    console.log(error.message)
    res.status(500).json({message: error.message})
   }
})

app.put('/products/:id', async(req, res)=> {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)

    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req, res)=> {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product)

    }catch(error){
        res.status(500).json({message: error.message})
    }
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


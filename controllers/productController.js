const Product = require('../models/productModels')
const asyncHandler = require('express-async-handler')

// get all products 
const getProducts = asyncHandler(async(req, res)=> {
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    }catch(error){
         res.status(500)
        throw new Error(error.message)
    }
})


// get single product
const getProduct = asyncHandler(async (req, res)=> {
    try{
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products)
    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

// Create a product
const createProduct = asyncHandler (async (req, res)=>{
    try{
     const product = await Product.create(req.body)
     res.status(200).json(product)
 
    }catch(error){
     console.log(error.message)
      res.status(500)
        throw new Error(error.message)
    }
 })

 // Update a product
 const updateProduct = asyncHandler(async(req, res)=> {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)

    }catch(error){
         res.status(500)
        throw new Error(error.message)
    }
})

// delete product 
const deleteProduct = asyncHandler(async(req, res)=> {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404)
            throw new Error({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product)

    }catch(error){
         res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
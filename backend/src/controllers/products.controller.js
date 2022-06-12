import Product from '../models/Product'

//=======================================================

export const createProduct = async(req, res)=>{
    const {name, category, price, imgURL} = req.body;
    
    const newProduct = new Product({
        name,
        category,
        price,
        imgURL,
    })
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
}
//BUSCAR TODOS LOS PRODUCTOS (GET )
export const getProducts = async (req, res)=>{
    const  products = await Product.find()
    res.json(products)
}
//buscar un solo producto (GET by ID)
export const getProductById = async(req, res)=>{
    const product = await Product.findById(req.params.productId)
    res.status(200).json(product)
}
//actualizar (PUT)
export const updateProductById = async (req, res)=>{
    const updateProduct = await Product.findOneAndUpdate(req.params.productId, req.body,{
        new:true,
    })
    res.status(204).json(updateProduct)
}
//eliminar (DELETE)
export const deleteProductById = async (req, res)=>{
    const {productId} = req.params;
    const deleteProduct = await Product.findOneAndDelete(productId)
    res.status(204).json(deleteProduct)
}

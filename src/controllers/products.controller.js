import { findAllProds, createProd, findProdById, deleteOneProd, updateProd } from "../services/products.service.js";
import customError from "../services/errors/errors.generate.js"
import { errorsMessage, errorsName } from "../services/errors/errors.enum.js";


export const findProds = async (req, res,next) => {
    try{
        const prods = await findAllProds(req.query);
        if (!prods){
            customError.createError(errorsName.PRODUCT_NOT_FOUND,errorsMessage.PRODUCT_NOT_FOUND,500)
        }
        res.status(200).json({ prods });
    }catch (error){
        next(error)
    }    
};


export const findProductById = async (req, res,next) => {
    try{
        const { pid } = req.params;
        const prod = await findProdById(pid);
        if (!prod) {
            customError.createError(errorsName.PRODUCT_NOT_FOUND,errorsMessage.PRODUCT_NOT_FOUND,500)
            }
        res.status(200).json({ message: "Product found", prod });
    }catch (error) {
        next(error)
    }        
};


export const createProduct =  async (req, res,next) => {
    const { title, description, price, code, stock, category } = req.body;

    if (!title || !description || !price || !code || !stock || ! category) {
        customError.createError(errorsName.DATA_NOT_RECEIVED,errorsMessage.DATA_NOT_RECEIVED,500)
    }
    try {
        const createdProduct = await createProd(req.body);
    res.status(200).json({ message: "Product created", user: createdProduct });
    }catch (error){
        next (error);
    }
    
};


export const deleteOneProduct = async (req, res,next) => {
    const { pid } = req.params;
    try {
        const prod = await deleteOneProd(pid);
        if (!prod) {
            customError.createError(errorsName.PRODUCT_NOT_FOUND,errorsMessage.PRODUCT_NOT_FOUND,500)
        }
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
    next(error)
    }
}


export const updateProduct = async (req, res,next) => {
    const { pid } = req.params;
    try {
        const prod = await updateProd(pid, req.body);
        if (!prod) {
            customError.createError(errorsName.PRODUCT_NOT_FOUND,errorsMessage.PRODUCT_NOT_FOUND,500)
        }
        res.status(200).json({ message: "Product updated", prod });
    }catch (error) {
        next(error)
    }
}

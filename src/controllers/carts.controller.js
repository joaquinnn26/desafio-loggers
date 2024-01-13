import twilio from "twilio";
import { cartsService } from "../repositoryServices/index.js";
import config from "../config/config.js";
import customError from "../services/errors/errors.generate.js"
import { errorsMessage, errorsName } from "../services/errors/errors.enum.js";
import { transporter,enviarCorreo } from "../nodemailer.js";
import { uManager } from "../DAL/dao/mongo/users.dao.js";
export const createACart = (req, res) => {
    try{
        const cart = cartsService.createNewCart();
        res.status(200).json({ message: "Cart created" });
    }catch (error){
        res.status(500).json({message: error.message})
    }
};


export const findCart = async (req, res, next) => {
    try{
        const { cid } = req.params;
        const cart = await cartsService.findCartById(cid);
        if (!cart) {
                customError.createError(errorsName.CART_NOT_FOUND,errorsMessage.CART_NOT_FOUND,500)
            }
        res.status(200).json({ message: "Cart found", cart });
    }catch (error) {
        next(error)
    }        
};


export const addProductToCart =  async (req, res,next) => {
    const { cid, pid } = req.params;

    if (!cid || !pid ) {
        customError.createError(errorsName.DATA_NOT_RECEIVED,errorsMessage.DATA_NOT_RECEIVED,500)
    }
    try {
        const productAdded = await cartsService.addProduct(cid, pid);
    res.status(200).json({ message: "Product added to Cart", cart: productAdded });
    }catch (error){
        next(error)
    }    
};


export const deleteFromCart =  async (req, res ,next) => {
    const { cid, pid } = req.params;

    if (!cid || !pid ) {
        return customError.createError(errorsName.DATA_NOT_RECEIVED,errorsMessage.DATA_NOT_RECEIVED,500)
    }
    try {
        const productDeleted= await cartsService.deleteOneFromCart(cid, pid);
    res.status(200).json({ message: "Product deleted to Cart", cart: productDeleted });
    }catch (error){
        next(error)
    }    
};


export const updateProducts = async (req, res,next) => {
    const { cid } = req.params;
    try {
        const { products } = req.body
        if (!cid || !products) {
            customError.createError(errorsName.DATA_NOT_RECEIVED,errorsMessage.DATA_NOT_RECEIVED,500)
        }
        const cartProds = await cartsService.updateAllProducts(cid, products);       
        res.status(200).json({ message: "Products updated", cartProds });
    }catch (error) {
        next(error)
    }
}

export const updateProdQuantity = async (req, res,next) => {    
    try {
        const {cid, pid} = req.params
        const { quantity } = req.body 
        if (!cid ||!pid ||!quantity) {
            customError.createError(errorsName.DATA_NOT_RECEIVED,errorsMessage.DATA_NOT_RECEIVED,500)
        }       
        const response = await cartsService.updateQuantity(cid, pid, +quantity);       
        res.status(200).json({ message: "Product updated", response });
    }catch (error) {
        next (error)
    }
}


export const deleteAllProductsCart = async (req, res,next) => {    
    try {
        const {cid} = req.params  
        if (!cid) {
            customError.createError(errorsName.CART_NOT_FOUND,errorsMessage.CART_NOT_FOUND,500)
        }            
        const response = await cartsService.deleteAllProductsInCart(cid);       
        res.status(200).json({ message: "Products deleted", response });
    }catch (error) {
        next (error)
    }
}

export const thePurchase = async (req, res,next) => {    
    try {
        const {cid} = req.params
        if (!cid) {
            customError.createError(errorsName.CART_NOT_FOUND,errorsMessage.CART_NOT_FOUND,500)
        }              
        const response = await cartsService.purchase(cid);
        // Información del usuario autenticado
    const usuarioAutenticado = req.user;
    const emailUser=ticket.purchaser.email
    const nameUser=uManager.findUserByEmail(emailUser)
    // Aquí puedes personalizar el contenido del correo con la información del usuario
    const destinatarios = [emailUser, 'joaquinfefe@gmail.com']; // Agrega las direcciones de correo necesarias
    const asunto = `Ticket compra Nº ${response.ticket.code}`;
    const contenido = `Hola ${nameUser.name}, esta es tu información: ${JSON.stringify(response)}`;

    // Llama a la función para enviar el correo
    enviarCorreo(destinatarios, asunto, contenido);
        res.status(200).json({ response });
    }catch (error) {
        next(error)
    }
}
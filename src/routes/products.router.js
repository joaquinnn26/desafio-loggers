import { Router } from "express";
import { findProds, findProductById, createProduct, deleteOneProduct, updateProduct } from '../controllers/products.controller.js';
import { authorize } from "../middlewares/authMiddleware.js";
import { mockingProducts } from "../controllers/mockingsProduts.js";

const router = Router();


/* GET PRODUCTS */
router.get("/", findProds);



/* GET PRODUCTS BY ID */
router.get('/:pid', findProductById)



/* ADD PRODUCT */
router.post("/", authorize(["ADMIN"]),createProduct);



/* DELETE PRODUCT */
router.delete("/:pid", authorize(["ADMIN"]), deleteOneProduct);




/* UPDATE PRODUCT */
router.put("/:pid", authorize(["ADMIN"]), updateProduct);

/*PRODUCTS FAKER JS MOCKING*/

router.get("/mockingproducts",mockingProducts)

export default router
import express from "express"
import { addProduct,listProduct,removeProduct,singleProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post('/add',addProduct);
productRouter.post('/remove',removeProduct);
productRouter.post('/single',singleProduct);
productRouter.post('/list',listProduct);

export default productRouter;
import { postAddProductToCartAPI } from "controllers/client/api.controller";
import express, { Express } from "express"
import { ReadableStreamDefaultController } from "node:stream/web";
const router = express.Router();

const apiRoutes = (app: Express) => {

    router.post("/add-product-to-cart", postAddProductToCartAPI);
    app.use("/api", router)
}

export { apiRoutes }
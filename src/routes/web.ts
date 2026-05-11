import express, { Express } from "express";
import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from "controllers/user.controller";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoardPage } from "controllers/admin/dashboard";
import fileUploadMiddleware from "src/middleware/multer";
import { getProductDetailPage } from "controllers/client/client.controller";
import { getAdminCreateProductPage, postAdminCreateProduct } from "controllers/admin/product.controller";
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const webRoutes = (app: Express) => {

    //client
    router.get("/", getHomePage);
    router.get("/product/1", getProductDetailPage)




    router.get("/create-user", getCreateUserPage);
    router.post("/handle-create-user", postCreateUser);
    router.post("/handle-delete-user/:id", postDeleteUser);
    // router.get("/handle-view-user/:id", getViewUser);
    router.post("/handle-update-user/", postUpdateUser);

    //admin router
    router.get("/admin", getDashBoardPage);

    //admin user
    router.get("/admin/user", getAdminUserPage);
    router.post("/admin/handle-create-user", fileUploadMiddleware('avatar'), postCreateUser)
    router.get("/admin/create-user", getCreateUserPage);
    router.get("/admin/view-user/:id", getViewUser);
    router.post("/admin/delete-user/:id", postDeleteUser);
    router.post("/admin/update-user/", fileUploadMiddleware('avatar'), postUpdateUser);


    //admin product
    router.get("/admin/product", getAdminProductPage);
    router.get("/admin/create-product", getAdminCreateProductPage)
    router.post("/admin/create-product", fileUploadMiddleware('image', 'images/product'), postAdminCreateProduct)



    //admin order
    router.get("/admin/order", getAdminOrderPage);

    //client routes

    //
    app.use("/", router);
}
export default webRoutes;
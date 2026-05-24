import express, { Express } from "express";
import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from "controllers/admin/user.controller";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoardPage, getOrderDetailPage } from "controllers/admin/dashboard";
import fileUploadMiddleware from "src/middleware/multer";
import { getCartPage, getCheckoutPage, getOrderHistoryPage, getProductDetailPage, getProductFilterPage, getThanksPage } from "controllers/client/client.controller";
import { getAdminCreateProductPage, getUpdateProductPage, postAddProductToCart, postAddProductToCartinDetail, postAdminCreateProduct, postDeleteProduct, postDeleteProductInCart, postHandleCartToCheckout, postPlaceOrder, postUpdateProduct } from "controllers/admin/product.controller";
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postLogout, postRegister } from "controllers/client/auth.controller";
import passport from "passport";
import { isAdmin, isLogin } from "src/middleware/auth";
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const webRoutes = (app: Express) => {

    //client
    router.get("/", getHomePage);
    router.get("/product/:id", getProductDetailPage);
    router.get("/products", getProductFilterPage)




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
    router.get("/admin/create-product", getAdminCreateProductPage);
    router.post("/admin/create-product", fileUploadMiddleware('image', 'images/product'), postAdminCreateProduct);
    router.post("/admin/update-product", fileUploadMiddleware('image', 'images/product'), postUpdateProduct);
    router.post("/admin/delete-product/:id", postDeleteProduct);
    router.get("/admin/product-detail/:id", getUpdateProductPage)



    //admin order
    router.get("/admin/order", getAdminOrderPage);
    router.get("/admin/order-detail/:id", getOrderDetailPage)


    //login & register
    router.get("/login", getLoginPage);
    router.get("/success-redirect", getSuccessRedirectPage)
    router.post("/login", passport.authenticate('local', {
        successRedirect: '/success-redirect',
        failureRedirect: '/login',
        failureMessage: true
    }));
    router.get("/register", getRegisterPage);
    router.post("/register", postRegister)
    router.post("/logout", postLogout)


    //add to cart 
    router.post("/add-product-to-cart/:id", postAddProductToCart);
    router.post("/delete-product-in-cart/:id", postDeleteProductInCart)
    router.get("/cart", getCartPage);
    router.post("/add-product-to-cart-in-detail/:id", postAddProductToCartinDetail)

    //checkout
    router.post("/handle-cart-to-checkout", postHandleCartToCheckout);
    router.get("/checkout", getCheckoutPage);
    router.post("/place-order", postPlaceOrder)
    router.get("/thanks", getThanksPage);

    //order-history
    router.get("/order-history", getOrderHistoryPage)

    app.use("/", isAdmin, router);


}
export default webRoutes;
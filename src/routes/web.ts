import express, { Express } from "express";
import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from "controllers/user.controller";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoardPage } from "controllers/admin/dashboard";
const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", getHomePage);
    router.get("/create-user", getCreateUserPage);
    router.post("/handle-create-user", postCreateUser);
    router.post("/handle-delete-user/:id", postDeleteUser);
    router.get("/handle-view-user/:id", getViewUser);
    router.post("/handle-update-user/", postUpdateUser);

    //admin router
    router.get("/admin", getDashBoardPage);
    router.get("/admin/user", getAdminUserPage);
    router.post("/admin/handle-create-user", postCreateUser);
    router.get("/admin/create-user", getCreateUserPage);
    router.get("/admin/product", getAdminProductPage);
    router.get("/admin/order", getAdminOrderPage);

    //
    app.use("/", router);
}
export default webRoutes;
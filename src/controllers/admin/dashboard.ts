import { Request, Response } from "express";
import { getDashBoardInfo } from "services/admin/dashboard.service";
import { getOrderDetailList, getOrderList } from "services/admin/order.service";
import { getProductList } from "services/admin/product.service";
import { getAllUser } from "services/admin/user.service";
const getDashBoardPage = async (req: Request, res: Response) => {
    const count = await getDashBoardInfo();
    return res.render("admin/dashboard/show.ejs", {
        count
    });
}
const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUser();
    return res.render("admin/user/show.ejs", {
        users: users
    });
}

const getAdminProductPage = async (req: Request, res: Response) => {
    const products = await getProductList();
    return res.render("admin/product/show.ejs", {
        products
    });
}
const getAdminOrderPage = async (req: Request, res: Response) => {
    const orders = await getOrderList();
    return res.render("admin/order/show.ejs", {
        orders
    });
}
const getOrderDetailPage = async (req: Request, res: Response) => {
    const { id } = req.params
    const orderDetails = await getOrderDetailList(id as string);
    return res.render("admin/order/detail.ejs", {
        orderDetails
    })
}
export { getDashBoardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage, getOrderDetailPage }
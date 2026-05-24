import { Request, Response } from "express";
import { getDashBoardInfo } from "services/admin/dashboard.service";
import { getOrderDetailList, getOrderList, countTotalOrderPages } from "services/admin/order.service";
import { getProductList, countTotalProductPages } from "services/admin/product.service";
import { countTotalUserPages, getAllUser } from "services/admin/user.service";
const getDashBoardPage = async (req: Request, res: Response) => {
    const count = await getDashBoardInfo();
    return res.render("admin/dashboard/show.ejs", {
        count
    });
}
const getAdminUserPage = async (req: Request, res: Response) => {
    const { page } = req.query;
    const currentPage = page ? +page : 1;
    const users = await getAllUser(currentPage);
    const totalPages = await countTotalUserPages();
    return res.render("admin/user/show.ejs", {
        users: users,
        totalPages,
        currentPage
    });
}

const getAdminProductPage = async (req: Request, res: Response) => {
    const { page } = req.query;
    const currentPage = page ? +page : 1;
    const products = await getProductList(currentPage);
    const totalPages = await countTotalProductPages();
    return res.render("admin/product/show.ejs", {
        products,
        totalPages,
        currentPage
    });
}
const getAdminOrderPage = async (req: Request, res: Response) => {
    const { page } = req.query;
    const currentPage = page ? +page : 1;
    const orders = await getOrderList(currentPage);
    const totalPages = await countTotalOrderPages();
    return res.render("admin/order/show.ejs", {
        orders,
        totalPages,
        currentPage
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
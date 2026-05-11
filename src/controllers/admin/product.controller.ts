import { Request, Response } from "express";
const postAdminCreateProduct = async (req: Request, res: Response) => {
    const { name } = req.body;
    return res.redirect("/admin/product");
}
const getAdminCreateProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/create.ejs");
}

export { postAdminCreateProduct, getAdminCreateProductPage }
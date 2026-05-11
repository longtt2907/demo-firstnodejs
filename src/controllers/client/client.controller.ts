
import { Request, Response } from "express";
const getProductDetailPage = async (req: Request, res: Response) => {
    return res.render("client/product/detail.ejs");
}


export { getProductDetailPage }
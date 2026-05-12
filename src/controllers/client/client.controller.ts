
import { Request, Response } from "express";
import { getProducts, getProductsByID } from "services/client/item.service";
const getProductDetailPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductsByID(id as string);
    return res.render("client/product/detail.ejs", {
        product
    });
}


export { getProductDetailPage }
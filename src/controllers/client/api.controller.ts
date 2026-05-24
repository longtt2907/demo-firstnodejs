import { Request, Response } from "express";
import { addProductToCart } from "services/client/item.service";

const postAddProductToCartAPI = async (req: Request, res: Response) => {
    const user = req.user;
    const { quantity, productId } = req.body

    const currentSum = req?.user?.sumCart ?? 0;
    const newSum = currentSum + quantity;
    if (user) {
        await addProductToCart(+productId, +quantity, user);
        res.status(200).json({
            data: newSum
        })
    }
    else {
        return res.redirect("/login");
    }

}
export { postAddProductToCartAPI }
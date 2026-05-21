
import { Request, Response } from "express";
import { getProducts, getProductsByID, getUserCart } from "services/client/item.service";
const getProductDetailPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductsByID(id as string);
    return res.render("client/product/detail.ejs", {
        product
    });
}
const getCartPage = async (req: Request, res: Response) => {

    const user = req.user;
    if (user) {
        const cartDetails = await getUserCart(user.id);
        console.log(cartDetails);
        const totalPrice = cartDetails.map(product => +product.price * +product.quantity)?.reduce((a, b) => a + b, 0)
        return res.render("client/product/cart.ejs", {
            cartDetails, totalPrice
        });
    }
    return res.redirect("/login");
}


export { getProductDetailPage, getCartPage }
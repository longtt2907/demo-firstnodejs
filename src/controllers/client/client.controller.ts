
import { Request, Response } from "express";
import { productFilter1, productFilter2, productFilter3, productFilter4, productFilter5, userFilter } from "services/client/filter.service";
import { countTotalProductClientPages, getOrderListByUserId, getProducts, getProductsByID, getUserCart } from "services/client/item.service";
import { getProductsWithFilter } from "services/client/product.filter";
const getProductDetailPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductsByID(id as string);
    return res.render("client/product/detail.ejs", {
        product
    });
}
const getProductFilterPage = async (req: Request, res: Response) => {
    const { page, factory = "", target = "", price = "", sort = "" } = req.query as {
        page?: string;
        factory?: string;
        target?: string;
        price?: string;
        sort?: string;
    };
    const currentPage = page ? +page : 1;
    // const totalPages = await countTotalProductClientPages(6);
    // const products = await getProducts(currentPage, 6);
    const { totalPages, products } = await getProductsWithFilter(currentPage, 6, factory, target, price, sort);
    return res.render("client/product/filter", {
        products, totalPages, page: currentPage
    })
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

const getCheckoutPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (user) {
        const cartDetails = await getUserCart(user.id);
        const totalPrice = cartDetails.map(product => +product.price * +product.quantity)?.reduce((a, b) => a + b, 0)
        return res.render("client/product/checkout.ejs", {
            cartDetails, totalPrice
        });
    }
}
const getThanksPage = async (req: Request, res: Response) => {
    return res.render("client/product/thank");
}

const getOrderHistoryPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.redirect("/login");
    const orders = await getOrderListByUserId(user.id);
    return res.render("client/product/orderHistory", {
        orders
    })
}



export { getProductDetailPage, getCartPage, getCheckoutPage, getThanksPage, getOrderHistoryPage, getProductFilterPage }
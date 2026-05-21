import { Request, Response } from "express";
import { createProduct, deleteProduct, getProductById, updateProduct } from "services/admin/product.service";
import { addProductToCart, deleteProductInCart } from "services/client/item.service";
import { ProductSchema, TProductSchema } from "src/validattion/product.schema";

const factoryOptions = [
    { name: "Apple (MacBook)", value: "APPLE" },
    { name: "Asus", value: "ASUS" },
    { name: "Lenovo", value: "LENOVO" },
    { name: "Dell", value: "DELL" },
    { name: "LG", value: "LG" },
    { name: "Acer", value: "ACER" },
];

const targetOptions = [
    { name: "Gaming", value: "GAMING" },
    { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
    { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
    { name: "Mỏng nhẹ", value: "MONG-NHE" },
    { name: "Doanh nhân", value: "DOANH-NHAN" },
];


const postAdminCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        //error
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`);
        const oldData = {
            name, price, detailDesc, shortDesc, quantity, factory, target
        }
        return res.render("admin/product/create.ejs", {
            errors, oldData
        })
    }

    const image = req?.file?.filename ?? undefined;
    await createProduct(name, +price, detailDesc, shortDesc, +quantity, factory, target, image);
    return res.redirect("/admin/product");
}
const getAdminCreateProductPage = async (req: Request, res: Response) => {
    const errors: string[] = [];
    const oldData = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
        factory: "",
        target: "",
    }
    return res.render("admin/product/create.ejs", {
        errors, oldData
    });
}
const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteProduct(id as string);
    return res.redirect("/admin/product");
}


//UPDATE
const postUpdateProduct = async (req: Request, res: Response) => {
    const { id, name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        //error
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`);
        const product = {
            name, price, detailDesc, shortDesc, quantity, factory, target
        }
        return res.render("admin/product/detail.ejs", {
            errors, product, factoryOptions, targetOptions
        })
    }
    const image = req?.file?.filename ?? undefined;
    await updateProduct(id, name, +price, detailDesc, shortDesc, +quantity, factory, target, image);
    return res.redirect("/admin/product");
}

const getUpdateProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(id as string);
    const errors: string[] = [];

    return res.render("admin/product/detail.ejs", { errors, product, factoryOptions, targetOptions });
}
// const postUpdateProductPage = async (req: Request, res: Response) => {
//     const { id, name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
//     return res.redirect("/admin/product");
// }

const postAddProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    if (user) {
        await addProductToCart(+id, 1, user);
        return res.redirect(
            "/"
        )
    }
    else {
        return res.redirect("/login");
    }

}
const postDeleteProductInCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    if (user) {
        await deleteProductInCart(+id, user, user.sumCart ?? 0);
    }
    else {
        return res.redirect("/login");
    }
    return res.redirect("/cart")
}

export { postDeleteProductInCart, postAddProductToCart, postAdminCreateProduct, getAdminCreateProductPage, postDeleteProduct, postUpdateProduct, getUpdateProductPage }
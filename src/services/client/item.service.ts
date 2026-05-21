import { prisma } from "config/client";

const getProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const getProductsByID = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id: +id }
    })
    return product;
}

const addProductToCart = async (productId: number, quantity: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }

    })
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    if (cart) {
        await prisma.cart.update({
            where: {
                userId: user.id
            },
            data: {
                sum: { increment: quantity },
            }
        })

        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                productId: productId,
                cartId: cart.id
            }
        })

        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0
            },
            update: {
                quantity: {
                    increment: quantity,
                }
            },
            create: {
                price: product!.price,
                productId: productId,
                quantity: quantity,
                cartId:
                    cart.id
            }
        })
    }

    else {
        await prisma.cart.create({
            data: {
                sum: 1,
                userId: user.id,
                cartDetails: {
                    create: [{
                        productId: productId,
                        quantity: quantity,
                        price: product!.price
                    }]
                }
            }

        })
    }

}

const deleteProductInCart = async (cartDetailId: number, user: Express.User, sumCart: number) => {
    const cartDetail = await prisma.cartDetail.findUnique({
        where: {
            id: cartDetailId
        }
    })
    console.log(cartDetail)
    const quantity = cartDetail?.quantity ?? 0;
    await prisma.cartDetail.delete({
        where: {
            id: cartDetailId
        }
    })
    if (sumCart - quantity == 0) {
        await prisma.cart.delete({
            where: {
                userId: user.id
            }
        })
    }
    else {
        await prisma.cart.update({
            where: {
                userId: user.id
            }, data: {
                sum: sumCart - quantity
            }
        })
    }
}
const getUserCart = async (id: number) => {
    const cart = await prisma.cart.findUnique({
        where: { userId: +id }
    })
    if (cart) {
        const cartDetail = await prisma.cartDetail.findMany({
            where: {
                cartId: cart?.id
            },
            include: {
                product: true
            }
        })
        return cartDetail;
    }
    return [];
}

export { getProducts, getProductsByID, addProductToCart, getUserCart, deleteProductInCart }
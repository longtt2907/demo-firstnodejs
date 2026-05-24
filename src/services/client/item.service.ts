import { prisma } from "config/client";
import { error } from "console";

const getProducts = async (page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;
    const products = await prisma.product.findMany({
        skip: skip,
        take: pageSize

    });
    return products;
}
const countTotalProductClientPages = async (item_per_page: number) => {
    const totalItems = await prisma.product.count();
    const totalPages = Math.ceil(totalItems / item_per_page)
    return totalPages;
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
const updateCartDetailBeforeCheckout = async (currentCartDetail: { id: string, quantity: string }[], userId: number) => {
    let sum = 0;
    for (let i = 0; i < currentCartDetail.length; i++) {
        sum += +currentCartDetail[i].quantity;
        await prisma.cartDetail.update({
            where: {
                id: +currentCartDetail[i].id
            },
            data: {
                quantity: +currentCartDetail[i].quantity
            }
        })
    }
    await prisma.cart.update({
        where: {
            userId: userId
        },
        data: {
            sum: sum,
        }
    })
}
const handlePlaceOrder = async (user: Express.User, name: string, address: string, phone: string) => {
    try {
        await prisma.$transaction(async (tx) => {
            const cart = await tx.cart.findUnique({
                where: {
                    userId: user.id
                },
                include: {
                    cartDetails: true
                }
            })
            if (cart) {
                const totalPrice = cart?.cartDetails?.map(product => +product.price * +product.quantity)?.reduce((a, b) => a + b, 0)
                const dataOrderDetail = cart?.cartDetails?.map(item => ({
                    productId: item.productId,
                    price: item.price,
                    quantity: item.quantity
                })) ?? []

                //create
                await tx.order.create({
                    data: {
                        userId: user.id,
                        receiverName: name,
                        receiverAddress: address,
                        receiverPhone: phone,
                        paymentMethod: "COD",
                        paymentStatus: "PAYMENT_UNPAID",
                        totalPrice: totalPrice,
                        orderDetail: {
                            create: dataOrderDetail
                        }
                    }
                })

                //remove
                await tx.cartDetail.deleteMany({
                    where: {
                        cartId: cart.id
                    }
                })
                await tx.cart.delete({
                    where: {
                        id: cart.id
                    }
                })
                for (let i = 0; i < cart.cartDetails.length; i++) {
                    const productId = cart.cartDetails[i].productId;
                    const product = await tx.product.findUnique({
                        where: {
                            id: productId
                        }
                    })
                    if (!product || product.quantity < cart.cartDetails[i].quantity) {
                        throw new Error(`Sản phẩm ${product?.name} không tồn tại hoặc không đủ số lượng`)
                    }
                    await tx.product.update({
                        where: {
                            id: productId
                        },
                        data: {
                            quantity: {
                                decrement: cart.cartDetails[i].quantity
                            },
                            sold: {
                                increment: cart.cartDetails[i].quantity
                            }
                        }
                    })
                }

            }
        })
        return ""
    } catch (error) {
        return (error as Error).message;
    }

}
const getOrderListByUserId = async (id: number) => {
    const orderList = await prisma.order.findMany({
        where: {
            userId: +id
        },
        include: {
            orderDetail: {
                include: {
                    product: true
                }
            }
        }
    })
    return orderList;
}

export { countTotalProductClientPages, handlePlaceOrder, updateCartDetailBeforeCheckout, getProducts, getProductsByID, addProductToCart, getUserCart, deleteProductInCart, getOrderListByUserId }
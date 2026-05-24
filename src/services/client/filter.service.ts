import { prisma } from "config/client"

const userFilter = async (username: string) => {
    const result = await prisma.user.findMany({
        where: {
            username: {
                contains: username
            }
        }
    })
    return result;
}
const productFilter1 = async (price: number) => {
    const result = await prisma.product.findMany({
        where: {
            price: {
                gte: price
            }
        }
    })
    return result;
}
const productFilter2 = async (price: number) => {
    const result = await prisma.product.findMany({
        where: {
            price: {
                lte: price
            }
        }
    })
    return result;
}
const productFilter3 = async (factory: string) => {
    const result = await prisma.product.findMany({
        where: {
            factory: {
                equals: factory
            }
        }
    })
    return result;
}
const productFilter4 = async (factory: string[]) => {
    const result = await prisma.product.findMany({
        where: {
            factory: {
                in: factory
            }
        }
    })
    return result;
}
const productFilter5 = async (price: { min: number, max: number }) => {
    const result = await prisma.product.findMany({
        where: {
            AND: [
                {
                    price: {
                        gte: price.min
                    }
                },
                {
                    price: {
                        lte: price.max
                    }
                }

            ]
        }
    })
    return result;
}



export { userFilter, productFilter1, productFilter2, productFilter3, productFilter4, productFilter5 }
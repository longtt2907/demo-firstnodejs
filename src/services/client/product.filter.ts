import { prisma } from "config/client";

const getProductsWithFilter = async (
    page: number,
    pageSize: number,
    factory: string,
    target: string,
    price: string,
    sort: string
) => {
    const whereClause: any = {};
    if (factory) {
        const factoryInput = factory.split(",");
        whereClause.factory = {
            in: factoryInput
        }
    }
    if (target) {
        const targetInput = target.split(",");
        whereClause.target = {
            in: targetInput
        }
    }
    if (price) {
        const priceCondition = [];
        const priceInput = price.split(",")
        for (let i = 0; i < priceInput.length; i++) {
            if (priceInput[i] === "duoi-10-trieu") {
                priceCondition.push({ price: { lt: 10000000 } })
            }
            if (priceInput[i] === "10-15-trieu") {
                priceCondition.push({ price: { gt: 10000000, lt: 15000000 } })
            }
            if (priceInput[i] === "15-20-trieu") {
                priceCondition.push({ price: { gt: 15000000, lt: 20000000 } })
            }
            if (priceInput[i] === "tren-20-trieu") {
                priceCondition.push({ price: { gt: 20000000 } })
            }
        }
        whereClause.OR = priceCondition

    }
    const orderByClause: any = {};
    if (sort) {
        if (sort === "gia-tang-dan") {
            orderByClause.orderBy = {
                price:
                    "asc"
            }
        }
        if (sort === "gia-giam-dan") {
            orderByClause.orderBy = {
                price:
                    "desc"
            }
        }
    }
    const skip = (page - 1) * pageSize
    const [products, count] = await prisma.$transaction([
        prisma.product.findMany({
            where: whereClause,
            orderBy: orderByClause.orderBy,
            skip: skip,
            take: pageSize
        }),
        prisma.product.count({ where: whereClause })
    ])
    const totalPages = Math.ceil(count / pageSize)
    return {
        products, totalPages
    }
}

export { getProductsWithFilter }
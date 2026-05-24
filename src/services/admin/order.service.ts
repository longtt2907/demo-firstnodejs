import { prisma } from 'config/client'
import { TOTAL_ITEM_PER_PAGE } from 'config/constants'
const getOrderList = async (page: number) => {
    const pageSize = TOTAL_ITEM_PER_PAGE
    const skip = (page - 1) * pageSize
    const orders = await prisma.order.findMany({
        include: {
            user: true
        },
        skip: skip,
        take: pageSize
    })
    return orders;
}
const countTotalOrderPages = async () => {
    const totalItems = await prisma.order.count();
    const totalPages = Math.ceil(totalItems / TOTAL_ITEM_PER_PAGE)
    return totalPages;
}

const getOrderDetailList = async (orderId: string) => {
    const orderDetail = await prisma.orderDetail.findMany({
        where: {
            orderId: +orderId
        },
        include: {
            product: true
        }
    })
    return orderDetail;
}
export { getOrderList, getOrderDetailList, countTotalOrderPages }
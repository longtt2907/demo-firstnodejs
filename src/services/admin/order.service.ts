import { prisma } from 'config/client'
const getOrderList = async () => {
    const orders = await prisma.order.findMany({
        include: {
            user: true
        }
    })
    return orders;
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
export { getOrderList, getOrderDetailList }
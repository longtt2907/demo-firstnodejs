import { prisma } from "config/client"
import { TOTAL_ITEM_PER_PAGE } from "config/constants"

const createProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    imageUpload?: string,
) => {
    await prisma.product.create({
        data: {
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target,
            ...(imageUpload && { image: imageUpload })
        }
    })


}
const getProductList = async (page: number) => {
    const pageSize = TOTAL_ITEM_PER_PAGE;
    const skip = (page - 1) * pageSize;
    return await prisma.product.findMany({
        skip: skip,
        take: pageSize
    });
}
const countTotalProductPages = async () => {
    const totalItems = await prisma.product.count();
    const totalPages = Math.ceil(totalItems / TOTAL_ITEM_PER_PAGE)
    return totalPages;
}


const updateProduct = async (id: number, name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    imageUpload?: string,) => {
    await prisma.product.update({
        where: { id: +id },
        data: {
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target,
            ...(imageUpload && { image: imageUpload })
        }
    });

}
const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id: +id }
    })
    return product;
}
const deleteProduct = async (id: string) => {
    await prisma.product.delete({
        where: { id: +id }
    })
}
export { countTotalProductPages, createProduct, getProductList, updateProduct, deleteProduct, getProductById }
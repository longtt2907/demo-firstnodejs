import { prisma } from "config/client"

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
const getProductList = async () => {
    return await prisma.product.findMany();
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
export { createProduct, getProductList, updateProduct, deleteProduct, getProductById }
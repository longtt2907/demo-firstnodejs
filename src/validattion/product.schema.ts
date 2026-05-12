import * as z from "zod";

export const ProductSchema = z.object({
    id: z.string().optional().transform((val) => (val === "" ? 0 : Number(val))),
    name: z.string().trim().min(1, {
        message:
            "Tên không được quá ngắn"
    }),
    price: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số tiền tối thiểu là 1",
        }),

    detailDesc: z.string().trim().min(1, {
        message:
            "chi tiết không được quá ngắn"
    }),
    shortDesc: z.string().trim().min(1, {
        message:
            "Chi tiết không được quá ngắn"
    }),
    quantity: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số lượng tối thiểu là 1",
        }),

    factory: z.string().trim().min(1, {
        message:
            "Tên không được quá ngắn"
    }),
    target: z.string().trim().min(1, {
        message:
            "Tên không được quá ngắn"
    }),
})

export type TProductSchema = z.infer<typeof ProductSchema>
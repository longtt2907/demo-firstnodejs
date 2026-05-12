import { isEmailExist } from "services/auth/auth.services";
import * as z from "zod";

const emailSchema = z.string().email("Email khong dung dinh dang").refine(async (email) => {
    const existingUser = await isEmailExist(email);
    return !existingUser;
}, {
    message: "Email already exists",
    path: ["email"]
});

const passwordSchema = z
    .string()
    .min(8, { message: "It nhat 8 ky tu" })
    .max(20, { message: "Nhieu nhat 20 ky tu" })
// .refine((password) => /[A-Z]/.test(password), {
//     message: uppercaseErrorMessage,
// })
// .refine((password) => /[a-z]/.test(password), {
//     message: lowercaseErrorMessage,
// })
// .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
// .refine((password) => /[!@#$%^&*]/.test(password), {
//     message: specialCharacterErrorMessage,
// });
export const RegisterSchema = z.object({
    fullName: z.string(),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password confirm khong chinh xac",
    path: ['confirmPassword']
})


export type TRegisterSchema = z.infer<typeof RegisterSchema>

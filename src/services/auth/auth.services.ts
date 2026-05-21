import { prisma } from "config/client";
import * as bcrypt from "bcrypt";
import { ACCOUNT_TYPE } from "config/constants";
import { comparePassword } from "services/admin/user.service";
const saltRounds = 10;
const hashPassword = async (plainText: string) => {
    return await bcrypt.hash(plainText, saltRounds);
}
const isEmailExist = async (email: string) => {
    const result = await prisma.user.findUnique({
        where: { username: email }
    })
    if (result) {
        return true;
    }
    return false;
}
const registerNewUser = async (fullName: string, email: string, password: string) => {
    const defaultPassword = await hashPassword(password);
    const userRole = await prisma.role.findUnique({
        where: { name: "USER" }
    })
    if (userRole) {
        const newUser = await prisma.user.create({
            data: {
                fullName: fullName,
                username: email,
                password: defaultPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                roleId: userRole?.id,

            }
        })
        return newUser;
    }
    else {
        throw new Error("User role khong ton tai");
    }
}

const getUserWithRoleById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: +id },
        include: {
            role: true,
            cart: true,
        }, omit: {
            password: true
        }
    })
    return user;
}
const getUserSumCart = async (id: string) => {
    const user = await prisma.cart.findUnique({
        where: { userId: +id },
    })
    return user?.sum ?? 0;
}


export { isEmailExist, registerNewUser, getUserWithRoleById, getUserSumCart }
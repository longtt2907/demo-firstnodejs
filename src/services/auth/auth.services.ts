import { prisma } from "config/client";
import * as bcrypt from "bcrypt";
import { ACCOUNT_TYPE } from "config/constants";
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
    const newUser = await prisma.user.create({
        data: {
            username: email,
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: 2,

        }
    })
    return newUser;
}

export { isEmailExist, registerNewUser }
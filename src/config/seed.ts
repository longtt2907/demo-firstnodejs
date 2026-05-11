import { hashPassword } from "services/user.service";
import { prisma } from "./client"
import { ACCOUNT_TYPE } from "./constants";

const init_database = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "admin thi full quyen"
                },
                {
                    name: "USER",
                    description: "User thong thuong"
                }
            ]
        })

    }
    if (countUser == 0) {
        const adminRole = await prisma.role.findFirst({
            where: { name: "ADMIN" }
        })
        const defaultPassword = await hashPassword("123456")
        if (adminRole) await prisma.user.createMany({
            data: [
                {
                    username: "longtt2907@gmail.com",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    roleId: adminRole.id
                },
                {
                    username: "hungtt2907@gmail.com",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    roleId: adminRole.id
                }
            ]
        })
    }
    if (countRole !== 0 && countUser !== 0) {
        console.log(">>>Already have data<<<<");
    }
}
export { init_database }
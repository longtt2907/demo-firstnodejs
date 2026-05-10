import { prisma } from "./client"

const init_database = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    if (countUser == 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "longtt2907@gmail.com",
                    password: "123456",
                    accountType: "SYSTEM"
                },
                {
                    username: "hungtt2907@gmail.com",
                    password: "123456",
                    accountType: "SYSTEM"
                }
            ]
        })
    }
    else if (countRole === 0) {
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
    else {
        console.log(">>>Already have data<<<<");
    }
}
export { init_database }
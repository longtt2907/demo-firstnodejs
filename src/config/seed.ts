import { prisma } from "./client"

const init_database = async () => {
    const countUser = await prisma.user.count();
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
    else {
        console.log(">>>Already have data<<<<");
    }
}
export { init_database }
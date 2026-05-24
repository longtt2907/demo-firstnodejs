import { prisma } from "config/client";
import { ACCOUNT_TYPE, TOTAL_ITEM_PER_PAGE } from "config/constants";
import * as bcrypt from "bcrypt";
const saltRounds = 10;
const hashPassword = async (plainText: string) => {
    return await bcrypt.hash(plainText, saltRounds);
}
const comparePassword = async (password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword)
}
const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string,
    phone: string,
    avatar: string,
    role: String
) => {
    const defaultPassword = await hashPassword("123456")
    const newUser = await prisma.user.create({
        data: {

            fullName: fullName,
            username: email,
            address: address,
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            phone: phone,
            avatar: avatar,
            roleId: +role
        }
    })
    return newUser;

}
// const connection = await getConnection();
// try {
//     const sql = 'INSERT INTO `users`(`name`, `email`,`address`) VALUES (?, ?,?)';
//     const values = [fullname, email, address];

//     const [result, fields] = await connection.execute(sql, values);
//     return result;
// } catch (err) {
//     console.log(err);
//     return [];
// }
// //insert to database
// //return result
// console.log("insert a new user");

const getAllUser = async (page: number) => {
    const pageSize = TOTAL_ITEM_PER_PAGE;
    const skip = (page - 1) * pageSize
    const allUser = await prisma.user.findMany({
        skip: skip,
        take: pageSize
    });
    return allUser;
}

const countTotalUserPages = async () => {
    const totalItems = await prisma.user.count();
    const totalPages = Math.ceil(totalItems / TOTAL_ITEM_PER_PAGE)
    return totalPages;
}

const getAllRole = async () => {
    const allRole = await prisma.role.findMany();
    return allRole;
}

const handleDeleteUser = async (id: string) => {
    const deleteUser = await prisma.user.delete({
        where: { id: +id }
    })
    return deleteUser;
}
const getUserByID = async (id: string) => {
    const getUserbyID = await prisma.user.findUnique({ where: { id: +id } })
    return getUserbyID;
}

const updateUserByID = async (fullname: string,
    address: string, phone: string, roleId: string, avatar: string, id: string,) => {

    const updateUser = await prisma.user.update({
        where: { id: +id },
        data: {
            fullName: fullname,
            address: address,
            phone: phone,
            roleId: +roleId,
            ...(avatar !== "" && { avatar: avatar })
        }
    })
    return updateUser;
    // const connection = await getConnection();
    // try {
    //     const sql = 'UPDATE `users` SET `name` = ?, `email`= ?, `address`=?  WHERE `id` = ?';
    //     const values = [fullname, email, address, id];

    //     const [result, fields] = await connection.execute(sql, values);

    //     console.log(result);
    //     console.log(fields);
    // } catch (err) {
    //     console.log(err);
    // }
}
export { countTotalUserPages, hashPassword, getAllRole, handleCreateUser, getAllUser, handleDeleteUser, getUserByID, updateUserByID, comparePassword }
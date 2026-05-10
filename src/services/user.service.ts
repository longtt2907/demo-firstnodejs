import { prisma } from "config/client";
import getConnection from "../config/database";
import { RowDataPacket } from 'mysql2/promise';

const handleCreateUser = async (
    fullname: string,
    email: string,
    address: string
) => {
    const newUser = await prisma.user.create({
        data: {

            fullName: fullname,
            username: email,
            address: address,
            password: "",
            accountType: ""
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

const getAllUser = async () => {


    const allUser = await prisma.user.findMany();
    return allUser;

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
    email: string,
    address: string, id: string) => {
    const updateUser = await prisma.user.update({
        where: { id: +id },
        data: {
            fullName: fullname,
            username: email,
            address: address,

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
export { handleCreateUser, getAllUser, handleDeleteUser, getUserByID, updateUserByID }
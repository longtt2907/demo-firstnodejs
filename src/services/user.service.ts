import getConnection from "../config/database";
import { RowDataPacket } from 'mysql2/promise';
const handleCreateUser = async (
    fullname: string,
    email: string,
    address: string
) => {
    const connection = await getConnection();
    try {
        const sql = 'INSERT INTO `users`(`name`, `email`,`address`) VALUES (?, ?,?)';
        const values = [fullname, email, address];

        const [result, fields] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
    //insert to database
    //return result
    console.log("insert a new user");
}
const getAllUser = async () => {
    const connection = await getConnection();
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );
        return results;
    } catch (err) {
        console.log(err);
        return {};
    }
}
const handleDeleteUser = async (id: string) => {
    const connection = await getConnection();
    try {
        const sql = 'DELETE FROM `users` WHERE `id` = ? ';
        const values = [id];
        const [result, fields] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        console.log(err);
        return [];
    }

}
const getUserByID = async (id: string) => {
    const connection = await getConnection();
    try {
        const sql = 'SELECT * FROM `users` WHERE `id` = ?';
        const values = [id];
        const [rows, fields] = await connection.execute(sql, values);
        const result = rows as RowDataPacket[]
        return result[0];
    } catch (err) {
        console.log(err);
        return [];
    }

}
const updateUserByID = async (fullname: string,
    email: string,
    address: string, id: string) => {
    const connection = await getConnection();
    try {
        const sql = 'UPDATE `users` SET `name` = ?, `email`= ?, `address`=?  WHERE `id` = ?';
        const values = [fullname, email, address, id];

        const [result, fields] = await connection.execute(sql, values);

        console.log(result);
        console.log(fields);
    } catch (err) {
        console.log(err);
    }
}
export { handleCreateUser, getAllUser, handleDeleteUser, getUserByID, updateUserByID }
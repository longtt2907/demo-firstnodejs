import { Request, Response } from "express";
import { QueryResult } from "mysql2";
import { getAllUser, handleCreateUser, handleDeleteUser, getUserByID, updateUserByID, getAllRole } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUser();
    return res.render("home", {
        users: users
    });
}
const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRole();

    return res.render("admin/user/create.ejs", {
        roles
    });
}
const postCreateUser = async (req: Request, res: Response) => {
    //object destructering
    const { fullName, username, phone, role, address } = req.body;
    // await handleCreateUser(fullName, email, address);
    return res.redirect("/");
}
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id as string);
    return res.redirect("/")
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserByID(id as string);
    // console.log(user[0]);
    // console.log(id);
    console.log(user);
    return res.render("view-user", {
        id: id,
        user: user
    });

}
const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, email, address } = req.body;
    console.log(id, email)
    await updateUserByID(fullName, email, address, id);
    return res.redirect("/")
}




export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };
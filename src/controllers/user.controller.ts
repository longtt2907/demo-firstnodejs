import { Request, Response } from "express";
import { getAllUser, handleCreateUser, handleDeleteUser, getUserByID, updateUserByID, getAllRole } from "services/user.service";
const getHomePage = async (req: Request, res: Response) => {
    return res.render("client/home/show.ejs");
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
    const file = req.file;
    const avatar = file?.filename || "";
    await handleCreateUser(fullName, username, address, phone, avatar, role);
    return res.redirect("/admin/user");
}
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id as string);
    return res.redirect("/admin/user")
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const roles = await getAllRole();
    const user = await getUserByID(id as string);
    // console.log(user[0]);
    // console.log(id);
    console.log(user);
    return res.render("admin/user/detail.ejs", {
        id: id,
        user: user,
        roles
    });

}
const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, address, role, phone } = req.body;
    const file = req.file;
    const avatar = file?.filename || "";
    await updateUserByID(fullName, address, phone, role, avatar, id);
    return res.redirect("/admin/user")
}





export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };
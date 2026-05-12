import { Request, Response } from "express";
import { registerNewUser } from "services/auth/auth.services";
import { RegisterSchema, TRegisterSchema } from "src/validattion/auth.schema";
const getLoginPage = async (req: Request, res: Response) => {
    return res.render("login.ejs");
}
const getRegisterPage = async (req: Request, res: Response) => {
    return res.render("client/auth/register.ejs");
}
const postRegister = async (req: Request, res: Response) => {

    const { fullName, email, password, confirmPassword } = req.body as TRegisterSchema;
    const validate = await RegisterSchema.safeParse(req.body);
    if (!validate.success) {
        //error
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`);
        const user = {
            fullName, email, password, confirmPassword
        }
        return res.render("/register", {
            errors, user
        })
    }
    //success
    await registerNewUser(fullName, email, password);

    return res.redirect("/login")
}
export {
    getLoginPage, getRegisterPage, postRegister
}
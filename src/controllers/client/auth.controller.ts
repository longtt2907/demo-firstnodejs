import { NextFunction, Request, Response } from "express";
import { registerNewUser } from "services/auth/auth.services";
import { RegisterSchema, TRegisterSchema } from "src/validattion/auth.schema";
const getLoginPage = async (req: Request, res: Response) => {

    const { session } = req as any;
    const messages = session?.messages ?? [];
    return res.render("client/auth/login.ejs", {
        messages
    });
}
const getSuccessRedirectPage = async (req: Request, res: Response) => {
    const user = req.user as any;
    console.log(user);
    if (user?.role.name == "ADMIN") {
        res.redirect("/admin");
    }
    else {
        res.redirect("/");
    }

}
const getRegisterPage = async (req: Request, res: Response) => {
    const errors: string[] = [];
    const user = {
        fullName: "",
        username: "",
        password: "",
        confirmPassword: ""
    }
    return res.render("client/auth/register.ejs", {
        errors, user
    });
}
const postRegister = async (req: Request, res: Response) => {
    // console.log(req.body);
    const { fullName, email, password, confirmPassword } = req.body as TRegisterSchema
    const validate = await RegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
        //error
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`);
        const user = {
            fullName, email, password, confirmPassword
        }
        return res.render("client/auth/register", {
            errors, user
        })
    }
    //success
    await registerNewUser(fullName, email, password);

    return res.redirect("/login")
}
const postLogout = async (req: Request, res: Response, next: NextFunction) => {
    req.logOut(function (err) {
        if (err) { return next(err); }
        res.redirect("/")
    });


}

export {
    postLogout, getLoginPage, getRegisterPage, postRegister, getSuccessRedirectPage
}
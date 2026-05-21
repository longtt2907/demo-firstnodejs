import { NextFunction, Request, Response } from "express";
import { UserRole } from "src/types";

const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
        res.redirect("/");
        return;
    }
    else {
        next();
    }

}
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (req.path.startsWith('/admin')) {
        if (user?.role?.name == "ADMIN") {
            next();
        }
        else {
            res.render("status/403.ejs")
        }
        return;
    }
    next();

}

export { isLogin, isAdmin }
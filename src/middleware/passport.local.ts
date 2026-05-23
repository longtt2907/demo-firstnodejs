import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "services/admin/user.service";
import { getUserSumCart, getUserWithRoleById } from "services/auth/auth.services";
const configPassportLocal = () => {


    //check username & passowrd authorization
    passport.use(new LocalStrategy({ passReqToCallback: true }, async function verify(req, username, password, callback) {
        const { session } = req as any;
        if (session?.messages?.length) {
            session.messages = [];
        }
        const user = await prisma.user.findUnique({
            where: { username: username }
        })
        if (!user) {
            // throw new Error("Tai khoan khong ton tai");
            return callback(null, false, { message: `Username/password invalid` });
        }
        else {
            const isMatch = await comparePassword(password, user.password)
            if (!isMatch) {
                return callback(null, false, { message: `Invalid password` });

            }
            return callback(null, user as any)
        }
    }));

    //luu thong tin id & username vao trong session
    passport.serializeUser(function (user: any, cb) {
        process.nextTick(function () {
            cb(null, { id: user.id, username: user.username });
        });
    });
    //su dung id neu co session
    passport.deserializeUser(function (user: any, cb) {
        process.nextTick(async function () {
            const { id, username } = user;
            const userdb: any = await getUserWithRoleById(id);
            const sumCart = await getUserSumCart(id);
            return cb(null, { ...userdb, sumCart: sumCart });
        });
    });

}

export default configPassportLocal;
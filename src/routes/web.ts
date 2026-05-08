import express, { Express } from "express";
const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", (req, res) => {
        res.render("home.ejs");
    })
    router.get("/hoidanit", (req, res) => {
        res.send("Hello Eric!")
    })
    router.get("/abc", (req, res) => {
        res.send(`<h1 style="color:red">Hello new World!</h1>`)
    })
    app.use("/", router);
}
export default webRoutes;
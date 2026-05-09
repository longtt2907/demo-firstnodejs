import express from "express";
import "dotenv/config";
import webRoutes from "./routes/web";
const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + "/views")

//config request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//config static file
app.use(express.static('public'));

//config routes
webRoutes(app);

// app.get("/", (req, res) => {
//     res.render("home")
// })
// app.get("/hoidanit", (req, res) => {
//     res.send("Hello Eric!")
// })
// app.get("/abc", (req, res) => {
//     res.send(`<h1 style="color:red">Hello new World!</h1>`)
// })
app.listen(PORT, () => {
    console.log(`My app is running on port ${PORT}`);
    console.log(`env port: ${PORT}`);
})
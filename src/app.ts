import express from "express";
const app = express();
const PORT = 8080;
app.get("/", (req, res) => {
    res.send("Hello World Updated!")
})
app.get("/hoidanit", (req, res) => {
    res.send("Hello Eric!")
})
app.listen(PORT, () => {
    console.log(`My app is running on port ${PORT}`)
})
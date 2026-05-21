/// <reference path="./types/index.d.ts"/>
import express from "express";
import "dotenv/config";
import webRoutes from "routes/web";
import getConnection from "config/database";
import { init_database } from "config/seed";
import * as z from "zod";
import configPassportLocal from "./middleware/passport.local";
import session from "express-session";
import passport from "passport";
import { PrismaClient } from "@prisma/client";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
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

//config session

//khoi tao session
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            //clear expired session
            checkPeriod: 2 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}))



//config passport
app.use(passport.initialize()); // khai bao middleware passport de xu ly
app.use(passport.authenticate('session')); //quan ly session cua user
configPassportLocal();
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views
    next();
});


//config routes
webRoutes(app);


//init database
init_database();


//handle 404 not found
app.use((req, res) => {
    res.render("status/404.ejs");
})

//config database
getConnection();
app.listen(PORT, () => {
    console.log(`My app is running on port ${PORT}`);
})
import express from "express";
const app = express()
import requireLogin from "./middleware.js"
import path from "path"
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import session from "express-session"
import mongoose from "./database.js"

app.set("view engine", "pug")
app.set("views", "views")


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: "iam secret",
    resave: true,
    saveUninitialized: false
}))
// Routes
import loginRoute from "./routes/loginRoutes.js"
import registerRoutes from "./routes/registerRoutes.js"

app.use("/login", loginRoute)
app.use("/register", registerRoutes)

app.get("/", requireLogin, (req, res, next) => {
    let payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user
    }

    res.status(200).render("home", payload);
})  


const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server is runner in " + PORT);
})
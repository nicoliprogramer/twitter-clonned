import express from "express";
const app = express()
import requireLogin from "./middleware.js"
import path from "path"
import { fileURLToPath } from 'url';

app.set("view engine", "pug")
app.set("views", "views")


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')))

// Routes
import loginRoute from "./routes/loginRoutes.js"

app.use("/login", loginRoute)   

app.get("/", requireLogin, (req, res, next) => {
    let payload = {
        pageTitle: "Home"
    }

    res.status(200).render("home", payload);
})  


const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server is runner in " + PORT);
})
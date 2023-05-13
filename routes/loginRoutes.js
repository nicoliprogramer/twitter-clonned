import express from "express";
import bodyParser from "body-parser"; 
import User from "../schemas/userModel.js"
import bcrypt from "bcrypt";
const app = express()
const router = express.Router()

app.set("view engine", "pug")
app.set("views", "views")

app.use(bodyParser.urlencoded({extended: false}))

router.get("/", (req, res, next) => {
    res.status(200).render("login");
})

router.post("/", async (req, res, next) => {
    let payload = req.body

    if(req.body.logUsername && req.body.logPassword){ 
        const user = await User.findOne({
            $or: [
                {username: req.body.logUsername},
                {email: req.body.logUsername}
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong."
            res.status(200).render("login", payload)

        })

        if(user != null){
           let obtain = await bcrypt.compare(req.body.logPassword, user.password)
           if(obtain === true ){
                req.session.user = user;
                return res.redirect("/")
           }
        }

            payload.errorMessage = "Login credentials Incorrect."
            res.status(200).render("login", payload)
    }

        payload.errorMessage = "Make sure each field has a valid value. "
        res.status(200).render("login", payload)
})

export default router;
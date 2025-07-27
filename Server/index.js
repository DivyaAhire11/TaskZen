import express from "express"
import cors from "cors"

const app = express();
const PORT = 3000 || process.env.PORT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Controllers
import {healthControler} from "../Server/controller/generalController.js"
import { signup,login } from "./controller/userSignUpController.js";


app.post("/signup", signup);
app.post("/login",login)
app.get("/health",healthControler );


app.listen(PORT, () => {
    console.log(`Server run on the port is :${PORT}`);
})
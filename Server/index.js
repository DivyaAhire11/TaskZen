import express from "express"
import cors from "cors"
import session from "express-session";
import cookieParser from "cookie-parser";
import { config } from "dotenv"
config()

const app = express();
const PORT = 3000 || process.env.PORT

// Controllers
import { healthControler } from "./controller/generalController.js"
import { signup, login } from "./controller/loginSignUpController.js";
import { addTodo } from "./controller/todoControl.js"; 

//middleware
import verifyUser from "./middlewares/verifyUser.js";

//my Config
import connectdb from "./config/connectdb.js";

app.use(cors({
    origin: ["http://localhost:5173", "*"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: `${process.env.SESSION_SERECT}`,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        maxAge: 7 * 24 * 6000 * 60 * 60 * 24
    }
}))

app.post("/signup", signup);
app.post("/login", login);
app.get("/health", healthControler);
app.post("/addTodo/:Userid",addTodo);

app.listen(PORT, () => {
    console.log(`Server run on the port is :${PORT}`);
    connectdb();
})
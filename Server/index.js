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
import { addTodo, getTodo, updateTodoSts } from "./controller/todoControl.js";

//middleware
import verifyUser from "./middlewares/verifyUser.js";

//my Config
import connectdb from "./config/connectdb.js";


app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(cors({
    origin: ["http://localhost:5173", "*"],
    credentials: true
}));

app.use(cookieParser())

app.use(session({
    secret: `${process.env.SESSION_SERECT}`,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        maxAge: 7 * 24 * 6000 * 60 * 60 * 24
    }
}))

app.post("/api/signup", signup);
app.post("/api/login", login);
app.post("/api/addTodo/", verifyUser, addTodo);
app.get("/api/getTodo/", verifyUser, getTodo);
app.get("/api/updateTodoSts/:todoid", updateTodoSts);
app.get("/api/health", healthControler);


app.listen(PORT, () => {
    console.log(`Server run on the port is :${PORT}`);
    connectdb();
})
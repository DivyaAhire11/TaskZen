import jwt from "jsonwebtoken"
import user from "../models/user.js";
import bcrypt from "bcrypt"
// import { config } from "dotenv"
// config();

const signup = async (req, res) => {
    try {
        let { name, email, password } = req.body

        let requiredData = ["name", "email", "password"];

        requiredData.forEach((data) => {   // check all data is Entered
            if (!req.body[data]) {
                res.json({
                    message: `${data} is required`
                })
            }
        })

        //if user has been already present then
        let alreadyExistuser = await user.findOne({ email });
        if (alreadyExistuser) {
            return res.json({
                message: "email already exist please login"
            })
        }

        // if user not already exits then
        let hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);

        let createUser = await user.create({
            name,
            email,
            password: hashPassword
        })

        if (createUser) {
            createUser = await createUser.save();

            return res.json({
                message: "user create successfully",
                data: createUser
            })
        } else {
            return res.json({
                message: "something went wrong",
            })
        }
    } catch (error) {
        return res.json({
            msg: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body
        let requiredfield = ["email", "password"];
        requiredfield.forEach((field) => {
            if (!req.body[field]) {
                return res.json({
                    message: `${field} is required to login`
                })
            }
        })

        let checkUserExit = await user.findOne({ email })
        console.log(checkUserExit)
        if (!checkUserExit) {
            res.json({
                message: "email does not exit please signup"
            })
        }
        let isPasswordMatch = await bcrypt.compare(password, checkUserExit?.password)
        console.log(isPasswordMatch)
        if (!isPasswordMatch) {
            return res.json({
                message: "invalid credentials"
            })
        }

        let sendData = {
            name: checkUserExit.name,
            email: checkUserExit.email,
            _id: checkUserExit._id
        }

        //jwt = json web token
        let token = await jwt.sign(sendData, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token);

        res.json({
            message: "login successfully",
            token: token
        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

export { signup, login }
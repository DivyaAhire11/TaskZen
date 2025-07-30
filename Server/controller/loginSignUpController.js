import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import bcrypt from "bcrypt"


const signup = async (req, res) => {
    try {
        let { name, email, password } = req.body

        let requiredData = ["name", "email", "password"];

        requiredData.forEach((data) => {   // check all data is Entered
            if (!req.body[data]) {
                res.json({
                    data: null,
                    message: `${data} is required`
                })
            }
        })

        //if user has been already present then
        let isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.json({
                data: null,
                message: "email already exist please login"
            })
        }

        // if user not already exits then
        let hashPassword = await bcrypt.hash(password, 10);

        let createUser = await User.create({
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
                data: null,
                message: "something went wrong",
            })
        }
    } catch (error) {
        return res.json({
            data: null,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body
         
        if(!email || !password){
            return res.json({
                data:null,
                message:"email and password required"
            })
        }

        let isUserExist = await User.findOne({ email })

        if (!isUserExist) {
            res.json({
                message: "user not found,create your account"
            })
        }
        let isPasswordMatch = bcrypt.compare(password, isUserExist?.password)

        if (!isPasswordMatch) {
            return res.json({
                message: "invalid credentials"
            })
        }

        let sendData = {
            name: isUserExist.name,
            email: isUserExist.email,
            _id: isUserExist._id
        }

        //jwt = json web token
        let token = jwt.sign(sendData, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        // res.cookie("token", token);
        req.session.token = token;



        res.json({
            message: "login successfully",
            token: token
        })

    } catch (error) {
        res.json({
            data: null,
            message: error.message
        })
    }
}

export { signup, login }
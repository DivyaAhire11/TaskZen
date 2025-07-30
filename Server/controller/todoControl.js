import Todos from "../models/todo.model.js"
import User from "../models/user.model.js"

const addTodo = async(req , res)=>{
    try {
        let {Userid} = req.params
        let {todoTitle, todoDecription} = req.body
        if(!todoTitle || !todoDecription || !Userid){
            return res.json({
                data :null,
                message : "required all fields necessary"
            })
        }
    let findUserId = await User.findById(Userid).select("_id")
    // console.log(findUserId)
     if(!findUserId){
        return res.json({
            data : null,
            message : "something went wrong"
        })
     }
    let createTodo = await Todos.create({
        todoTitle,
        todoDecription,
        user : findUserId._id
    })
    let saveTodo = await createTodo.save();
    if(!saveTodo){
        return res.json({
            data :null,
            message : "something went wrong"
        })
    }
      return res.json({
        data : saveTodo,
        message : "Todo add SuccessFully"
      })
    } catch (error) {
        return res.json({
            data : null,
            message:error.message
        })
    }
}

export {addTodo}
import { Schema , model } from "mongoose";

const todoSchema = new Schema({
    todoTitle:{
        type:String,
        required : true
    },
    todoDescription:{
        type :String
    },
    status:{
        type : String,
        default : "incomplete",
        enum:["incomplete","complete"]
    },
    isPrivate:{
        type : Boolean,
        default:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

const Todos = model("Todo",todoSchema)

export default Todos;
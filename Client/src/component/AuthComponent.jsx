import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from "axios"
const SignUp = () => {
  const [SignUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: ""
  })
  const handelSignup = async () => {
    try {
      let result = await axios.post("http://localhost:3000/api/signup", {
        name: SignUpInfo.name,
        email: SignUpInfo.email,
        password: SignUpInfo.password
      }, { withCredentials: true })

      toast.success(result.data.message)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-[450px] h-[300px] relative flex-col   p-4 '>
      
      <input className='h-[50px] w-[95%] bg-gray-700 text-white  p-3 m-3 rounded-md shadow-xl' type="text" placeholder='Name..' />
     
      <input className='h-[50px] w-[95%] bg-gray-700 text-white  p-3 m-3 rounded-md shadow-xl' type="email" placeholder='Email..' />
     
      <input className='h-[50px] w-[95%] bg-gray-700 text-white e p-3 m-3 rounded-md shadow-xl' type="password" placeholder='Password..' />

     <button className='bg-cyan-900 text-white py-2.5 px-7 rounded-2xl mt-6 ml-35'  onClick={() => { handelSignup() }}>SignUp</button>
    </div>
  )

}
const Login = () => {

  const [LogIninfo, setLogInInfo] = useState({
    email: "",
    password: ""
  })
  const handelLogin = async () => {
    try {

      let result = await axios.post("http://localhost:3000/api/login", {
        email: LogIninfo.email,
        password: LogIninfo.password
      }, { withCredentials: true })

      toast.success(result.data.message)

    } catch (error) {

    }
  }
  return (
    <div className='w-[450px] h-[300px] relative flex-col   p-4 '>
      <input className='h-[50px] w-[90%] bg-gray-700 text-white relative p-3 m-3 rounded-md shadow-xl' type="email" placeholder='Email..' />
      <input className='h-[50px] w-[90%] bg-gray-700 text-white relative p-3 m-3 rounded-md shadow-xl' type="password" placeholder='Password..' />

       <button className='bg-cyan-900 text-white py-2.5 px-7 rounded-2xl mt-6 ml-35 '  onClick={()=>handelLogin()}>Login</button>
    </div>

  )
}


export { Login, SignUp }
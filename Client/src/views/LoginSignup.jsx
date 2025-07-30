import React, { useState } from 'react'
import { Login, SignUp } from '../component/AuthComponent.jsx'

const LoginSignup = () => {
 
     const [IsLoginOpen, setIsLoginOpen] = useState(true)
    
    return (
       
            <div className='bg-gray-300 w-screen h-screen flex relative items-center justify-center'>
                <div className='h-[500px] w-[450px] bg-teal-500 flex absolute text-[30px] text-fuchsia-800 font-bold gap-7 justify-center pt-5 cursor-pointer overflow-hidden'>
                   
               <div onClick={() => setIsLoginOpen(false)}>Signup</div>

                 <div  onClick={() => setIsLoginOpen(true)}>Login</div>
                 </div>
                {
                    IsLoginOpen ? <Login /> : <SignUp />
                }
            </div>
       
    )
}
export default LoginSignup
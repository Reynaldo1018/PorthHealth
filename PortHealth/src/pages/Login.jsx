import React, {useState} from 'react'
import { AdminContext } from '../context/adminContext'
import axios from 'axios'
import { useContext } from 'react'
import {toast} from 'react-toastify'

const Login = () => {
  const [state, setState] = useState(['Sign Up', 'Login In Provider', 'Admin'])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('');
  
  const {setAToken,backendUrl} = useContext(AdminContext);
   
  const onSubmitHandler = async (event) => {
     event.preventDefault();

     try {
       if (state === 'Admin') {
         const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})      
         if (data.success){
           localStorage.setItem('aToken',data.token)
           setAToken(data.token)
         } else {
           toast.error(data.message)
         }
       }
     } catch (error) {
      
     }
  }
  // const onSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   let url = '';
    
  //   if (state === 'Sign Up') {
  //     url = `${backendUrl}/api/auth/signup`;
  //   } else if (state === 'Login') {
  //     url = `${backendUrl}/api/auth/login`;
  //   } else if (state === 'Login In Provider') {
  //     url = `${backendUrl}/api/auth/provider-login`;
  //   } else if (state === 'Admin') {
  //     url = `${backendUrl}/api/auth/admin-login`;
  //   }

  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email, password, name }),
  //   });

  //   const data = await response.json();
    
  //   if (data.token) {
  //     setAToken(data.token);
  //     // Redirect or perform further actions
  //   } else {
  //     // Handle error
  //     console.error(data.message);
  //   }
 
  // }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
         {/* <div className='flex items-center justify-between w-full mb-4'> */}
           <p className='text-2xl font-semibold text-primary'>
            {state === 'Sign Up' && "Create Account"}
            {state === 'Login' && "Login"}
            {state === 'Login In Provider' && "Provider Login"}
            {state === 'Admin' && "Admin Login"}
          </p>
         {/* </div> */}
             
          <p>
            {state === 'Sign Up' && 'Please sign up to book an appointment'}
            {state === 'Login' && 'Please log in to book an appointment'}
            {state === 'Login In Provider' && 'Provider, please log in to manage appointments'}
            {state === 'Admin' && 'Admin, please log in to manage the system'}
          </p>
              
          {state === "Sign Up" && (
            <div className='w-full'>
              <p>Full Name</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
          )}
          
          <div className='w-full'>
            <p>Email</p>
            <input  className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input  className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <button className='bg-primary text-white w-full py-2 rounded-md text-base'>
            {state === 'Sign Up' ? "Create Account" : "Login"}
          </button>
         
          {state === "Sign Up" ? (
            <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          ) : (
            <>
              <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
              <p>Provider? <span onClick={() => setState('Login In Provider')} className='text-primary underline cursor-pointer'>Click here</span></p>
              <p>Admin? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
            </>
          )}

          {state === 'Admin' && (
            <p>Welcome Admin! Please use your credentials to log in.</p>
          )}

          {state === 'Login In Provider' && (
            <p>Welcome Provider! Please use your credentials to log in.</p>
          )}
        </div>
    </form>
  )
}

export default Login
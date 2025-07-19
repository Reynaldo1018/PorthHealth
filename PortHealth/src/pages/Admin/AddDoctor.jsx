import React from 'react'
import { assets } from '../../assets/asset/assets'
import {useState} from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/adminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

   const [docImg,setDocImg] = useState(false)
   const [name,setName] = useState('')
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   const [experience,setExperience] = useState('1 Year')
   const [about,setAbout] = useState('')
   const [degree,setDegree] = useState('')
   const [fees,setFees] = useState('')
   
   const {backendUrl, aToken} = useContext(AdminContext)

   const onSubmitHandler = async(event) =>{
     event.preventDefault()

     try {
      if (!docImg) {
        return toast.error('Image Not Selected')
        
      }

      const formData = new FormData()

      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)      
      formData.append('experience',experience)
      formData.append('about',about)
      formData.append('degree',degree)
      formData.append('fees',Number(fees))

      // console log
      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`)
      })

      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})
      if (data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('')
        setAbout('')
        setDegree('')
        setFees('')
      }else{
        toast.error(data.message)
      }
     } catch (error) {
      toast.error(error.message)
      console.log(error)
      
     }
   }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
       <p className='mb-3 text-lg font-medium'>Add Provider</p>

       <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor='doc-img'>
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt=''/>
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type='file' id='doc-img' hidden/>
          <p>Upload Provider <br/> picture</p>
        </div>

         <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Provider Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type='text' placeholder='Name' required/>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Provider Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type='email' placeholder='Email' required/>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Provider Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password}  className='border rounded px-3 py-2' type='password' placeholder='Password' required/>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience}  className='border rounded px-3 py-2' name="" id="">
                {Array.from({ length: 50 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} Year${i + 1 > 1 ? 's' : ''}`}>
                    {i + 1} Year{i + 1 > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Provider Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type='number' placeholder='fees' required/>
            </div>

             <div className='w-full lg:flex-1 flex flex-col gap-4'>
              {/* Especiallity not working at this moment */}
              {/* <div>
                <p>Speciality</p>
                <select name="" id="">
                  <option>General </option>
                </select>
              </div> */}
             
              <div className='flex-1 flex flex-col gap-1'>
              <p>Provider Education</p>
              <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type='text' placeholder='Education' required/>
            </div>
               
             <div className='flex-1 flex flex-col gap-1'>
              <p className='mt-4 mb-2'>Provider About</p>
              <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' type='text' placeholder='write about Provider' rows={5} required/>
            </div>

             <button type='submit' className='bg-primary px-4 py-2 mt-4 text-white rounded'>Add Provider</button>

             </div>
            

          </div>
         </div>
       </div>
    </form>
  )
}

export default AddDoctor
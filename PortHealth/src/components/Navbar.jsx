import { NavLink, useNavigate } from 'react-router-dom'
 import {assets} from '../assets/assets'
import { caButtonStyle, classhr, profileOptions } from '../const'
import React, {useState} from 'react'
    
const Navbar = () => {
    const navigate = useNavigate();
    // const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true)
       return (
    <div 
     className=
       'flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'
     
     >
        {/* <h1>PortHealth</h1> */}
      {/* <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt=''/> */}
       <h1 
        onClick={() => navigate('/')} 
        className='text-primary text-3xl font-bold cursor-pointer'
       >
        PortHealth Tele
      </h1>

        <ul className='hidden md:flex items-start gap-5 font-medium'>
            {/* <NavLink to='/'>
                <li className='py-1'>Home</li>
                <hr className= {classhr}/>
            </NavLink> */}
            {/* <NavLink to='/doctors'>
                <li className='py-1'>All Doctors</li>
                <hr className= {classhr}/>
            </NavLink> */}
            {/* <NavLink to='/about'>
                <li className='py-1'>About</li>
                 <hr className= {classhr}/>
            </NavLink> */}
            {/* <NavLink to='/contact'>
                <li className='py-1'>Contacts</li>
                <hr className= {classhr}/>
            </NavLink> */}
        </ul>
        <div className='flex items-center gap-4'>
            {
                token ?
                <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img 
                     className='w-9 rounded-full'
                     src={assets.profile_pic} alt=""
                     />
                     <img 
                      className='w-2.5'
                     src={assets.dropdown_icon} alt=''/>
                     <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                         {/* bg-stone-100 color */}
                        <div className='min-w-48 bg-white rounded flex flex-col gap-4 p-4 border-2 '>    
                             <p 
                              className={profileOptions}
                              onClick={()=>navigate('/my-profile')}
                             >Profile</p>
                             <p 
                              className={profileOptions} 
                              onClick={()=>navigate('/my-appointments')}>Appointments</p>
                             <p 
                              className={profileOptions} 
                              onClick={()=>setToken(false)}>Logout</p> 
                        </div>
                     </div>
                </div> :
                 <button 
                onClick={()=>navigate('/login')}
                className={caButtonStyle} 
               >
                Create Account
            </button>

            }
           
        </div>
    </div>
  )
}

export default Navbar
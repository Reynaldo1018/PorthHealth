import React from 'react'
import { assets } from '../assets/assets'


const Header = () => {
  return (
    <div className={style.firstViewStyle}>
        {/* left side */}
        <div className={style.secondViewStyle}>
           <p className={firstP}>
            Book Appointment <br /> With the best providers
           </p>  
           <div className={thirdViewStyle}>
            <img className='w-28' src={assets.group_profiles} alt=''/>
            <p>Make an appoinment today with us</p>
           </div>
           <a 
         className={bottomStyle}
           href='#speciality'>
            Booking appointment
            <img className='w-3' src={assets.arrow_icon}/>
           </a> 
        </div>

        {/* right side */}
         <div className='md:w-1/2 relative'>
            <img
             className={thirdImage}
             src={assets.header_img} alt=''/>
         </div>
        <div>

        </div>
    </div>
  )
}
const style = {
  firstViewStyle: "flex flex-col md:flex-row flex-wrap bg-blue-400 rounded-lg px-6 md:px-10 lg: px-20",
  secondViewStyle: 'md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'
};



const thirdViewStyle = 'flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light '
const firstP = 'text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg: leading-tight'
const thirdImage = 'w-full md:absolute bottom-0 h-auto rounded-lg'
const bottomStyle = "flex items-center gap-2 bg-white px-8 py-2 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"


export default Header
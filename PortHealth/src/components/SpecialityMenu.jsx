import React from 'react'
import { specialityData } from '../assets/assets';
import {Link} from 'react-router-dom'
const SpecialityMenu = () => {
  return (
    <div id='speciality' className={style.firstView}>
        <h1 className={style.firstView}>Find by Speciality</h1>
        <p className={style.secondText}>Very experiance Nurce Practioner hablamo espanol</p>
        <div className={style.secondView}>
            {specialityData.map((item,index)=>(
                <Link 
                 onClick={()=>scrollTo(0,0)}
                 className={style.firstLink} 
                 key={index} 
                 to={`/doctors/${item.speciality}`}>
                   <img className={style.firstImage} src={item.image} alt=''/>
                   <p>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

 const style = {
    firstView: 'flex flex-col items-center gap-4 py-2 tet-gray-800',
    firstText: 'text-3xl font-medium ',
    secondText: 'sm:w-1/3 tet-center text-sm ',
    secondView: 'flex sm:justify-center gap-4 pt-5 w-full overflow-scroll', 
    firstImage: 'w-16 sm:w-24 mb-2',
    firstLink: 'flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'

};

export default SpecialityMenu
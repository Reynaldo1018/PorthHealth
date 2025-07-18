import React, { useState, useContext, useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctor = () => {
  const {speciality} = useParams()
  const [filterDoc, setFilterDoc] = useState([]);
  const  {doctors} = useContext(AppContext);
  const navigate = useNavigate();
  const [showFilter,setShowFilter] = useState(false);


  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }

  useEffect(()=>{
    applyFilter();
  },[doctors, speciality]);

  return (
    <div>
      <p className='text-gray-600'>Browse through all Providers specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* <button className={`py-1 px-3 border rounded text-sm transition-al sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button> */}
        {/* <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p 
            className= {`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transitoon-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}
          onClick={()=> speciality === "General physician" ? navigate('/doctors') : navigate('/doctors/General physician')} >General physician</p>
          <p 
            className= {`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transitoon-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}
          onClick={()=> speciality === "Gynecologist" ? navigate('/doctors') : navigate('/doctors/Gynecologist')} >Gynecologist</p>
          <p
            className= {`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transitoon-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}
           onClick={()=> speciality === "Dermatologist" ? navigate('/doctors') : navigate('/doctors/Dermatologist')} >Dermatologist</p>
          <p 
           className= {`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transitoon-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}
          onClick={()=> speciality === "Pediatricians" ? navigate('/doctors') : navigate('/doctors/Pediatricians')}>Pediatricians</p>
          <p
            className= {`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transitoon-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}
           onClick={()=> speciality === "Neurologist" ? navigate('/doctors') : navigate('/doctors/Neurologist')}>Neurologist</p>
          <p
            className= {`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transitoon-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}
           onClick={()=> speciality === "Gastroenterologist" ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} >Gastroenterologist</p>
        </div> */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
             filterDoc.map((item,index)=>(
              <div 
               onClick={()=>navigate(`/appointment/${item._id}`)}
               className='border border-blue-200 rounded-xl overflow-idden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
               key={index}
              >
                 <img className='bg-blue-50' src={item.image} alt=''/>
                 {/* <div className='flex'> */}
                     
                  <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>        
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                 </div>
                   
                     {/* <div className='flex items-top '>
                      <p>es-en</p>
                     </div> */}
                   
                 {/* </div> */}
              </div>
          ))  

          }
        </div>
      </div>
    </div>
  )
}

 //const pClassName = `w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transitoon-all cursor-pointer`

export default Doctor
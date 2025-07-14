import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const dayOfWeek = ['SUN','MON','TUE','WED', 'THRU','FRI','SAT']

  const [docSlots, setDocSlots] = useState([]);
  const [slotTime, setSlotTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Find the doctor by ID
  const docInfo = doctors?.find(doc => doc._id === docId);

  // Generate slots for the selected date
  const getAvailableSlots = (dateStr) => {
    let currentDate = new Date(dateStr);
    let endTime = new Date(dateStr);
    endTime.setHours(24, 0, 0, 0);

    // Default start time is 8:00 AM
    currentDate.setHours(8, 0, 0, 0);

    const now = new Date();
    // Compare only the date part, not the full Date object
    const selected = new Date(dateStr);
    const isToday =
      selected.getFullYear() === now.getFullYear() &&
      selected.getMonth() === now.getMonth() &&
      selected.getDate() === now.getDate();

    if (isToday) {
      let nextHour = now.getHours();
      let nextMinute = now.getMinutes();

      if (nextHour < 8) {
        currentDate.setHours(8, 0, 0, 0);
      } else {
        if (nextMinute === 0) {
          currentDate.setHours(nextHour, 0, 0, 0);
        } else if (nextMinute <= 30) {
          currentDate.setHours(nextHour, 30, 0, 0);
        } else {
          currentDate.setHours(nextHour + 1, 0, 0, 0);
        }
      }
    }

    let timeSlots = [];
    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      timeSlots.push({
        datetime: new Date(currentDate),
        time: formattedTime
      });
      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    setDocSlots([timeSlots]);
  };

  useEffect(() => {
    getAvailableSlots(selectedDate);
  }, [selectedDate, docInfo]);

  return docInfo && (
    <div>
     {/* doctor detailts */}
     <div className='flex flex-col sm:flex-row gap-4'>
       <div>
         <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt=''/>
       </div> 
         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/*  doctor info */}
           <p className='flex items-center gap-2 text-2xl font-medium text-gray-900' >
            {docInfo.name} 
            <img className='w-5' src={assets.verified_icon} alt=''/></p>
           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
           </div>

           {/* Doctor about */}
           <div>
            <p  className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About 
              <img src={assets.info_icon} alt=''/></p>
            <p className='text-sm text-gray-500 max-w-[700] mt-1'>{docInfo.about}</p>
           </div>
           <p className='text-gray-500 font-medium mt-4'>
            Appoinment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
            </p>
         </div>

     </div>


      {/* Booking slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-500'>
        <p>Booking slots</p>
        <div className='mb-4'>
          <label htmlFor="booking-date" className="mr-2 font-medium">Choose a date:</label>
          <input
            type="date"
            id="booking-date"
            value={selectedDate}
            min={new Date().toISOString().split('T')[0]} // Prevent past dates
            onChange={e => setSelectedDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length > 0 && docSlots[0].map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
              key={index}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
      </div>

      {/* Listing Related Doctors */}
      {/* <RelatedDoctors docId={docId} speciality={docInfo.speciality} /> */}
  
    </div>
  );
};

export default Appointment;
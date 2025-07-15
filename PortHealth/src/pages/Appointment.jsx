// import React, { useContext, useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import { assets } from '../assets/assets';
// import RelatedDoctors from '../components/RelatedDoctors';

// const Appointment = () => {
//   const { docId } = useParams();
//   const { doctors, currencySymbol } = useContext(AppContext);
//   const dayOfWeek = ['SUN','MON','TUE','WED', 'THRU','FRI','SAT']

//   const [docSlots, setDocSlots] = useState([]);
//   const [slotTime, setSlotTime] = useState('');
//   const [selectedDate, setSelectedDate] = useState(() => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   });
//   const slotsContainerRef = useRef(null);
//   const [scrollIndex, setScrollIndex] = useState(0);

//   // Find the doctor by ID
//   const docInfo = doctors?.find(doc => doc._id === docId);

//   // Generate slots for the selected date
//   const getAvailableSlots = (dateStr) => {
//     // Parse date string as local date
//     const [year, month, day] = dateStr.split('-').map(Number);
//     let currentDate = new Date(year, month - 1, day, 8, 0, 0, 0); // 8:00 AM local
//     let endTime = new Date(year, month - 1, day, 24, 0, 0, 0);    // midnight local

//     const now = new Date();
//     const isToday =
//       year === now.getFullYear() &&
//       month - 1 === now.getMonth() &&
//       day === now.getDate();

//     if (isToday) {
//       let nextHour = now.getHours();
//       let nextMinute = now.getMinutes();

//       if (nextHour < 8) {
//         currentDate.setHours(8, 0, 0, 0);
//       } else {
//         if (nextMinute === 0) {
//           currentDate.setHours(nextHour, 0, 0, 0);
//         } else if (nextMinute <= 30) {
//           currentDate.setHours(nextHour, 30, 0, 0);
//         } else {
//           currentDate.setHours(nextHour + 1, 0, 0, 0);
//         }
//       }
//     }

//     let timeSlots = [];
//     while (currentDate < endTime) {
//       let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//       timeSlots.push({
//         datetime: new Date(currentDate),
//         time: formattedTime
//       });
//       currentDate.setMinutes(currentDate.getMinutes() + 30);
//     }

//     setDocSlots([timeSlots]);
//   };

//   useEffect(() => {
//     getAvailableSlots(selectedDate);
//   }, [selectedDate, docInfo]);

//   // Scroll handler
//   const scrollSlots = (direction) => {
//     if (!slotsContainerRef.current) return;
//     const slotWidth = 120; // px, adjust to match your slot width
//     slotsContainerRef.current.scrollBy({
//       left: direction === 'left' ? -slotWidth : slotWidth,
//       behavior: 'smooth'
//     });
//     setScrollIndex(prev => direction === 'left' ? Math.max(prev - 1, 0) : prev + 1);
//   };

//   return docInfo && (
//     <div>
//      {/* doctor detailts */}
//      <div className='flex flex-col sm:flex-row gap-4'>
//        <div>
//          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt=''/>
//        </div> 
//          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
//           {/*  doctor info */}
//            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900' >
//             {docInfo.name} 
//             <img className='w-5' src={assets.verified_icon} alt=''/></p>
//            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//             <p>{docInfo.degree} - {docInfo.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
//            </div>

//            {/* Doctor about */}
//            <div>
//             <p  className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
//               About 
//               <img src={assets.info_icon} alt=''/></p>
//             <p className='text-sm text-gray-500 max-w-[700] mt-1'>{docInfo.about}</p>
//            </div>
//            <p className='text-gray-500 font-medium mt-4'>
//             Appoinment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
//             </p>
//          </div>

//      </div>


//       {/* Booking slots */}
//       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-500'>
//         <p>Booking slots</p>
//         <div className='mb-4'>
//           <label htmlFor="booking-date" className="mr-2 font-medium">Choose a date:</label>
//           <input
//             type="date"
//             id="booking-date"
//             value={selectedDate}
//             min={new Date().toISOString().split('T')[0]} // Prevent past dates
//             onChange={e => setSelectedDate(e.target.value)}
//             className="border rounded px-2 py-1"
//           />
//         </div>
//         <div className="flex items-center gap-2 w-full">
//           {/* Left Arrow */}
//           <button
//             className="p-2 rounded-full bg-gray-200 hover:bg-primary hover:text-white transition"
//             onClick={() => scrollSlots('left')}
//             aria-label="Scroll left"
//           >
//             <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7"/></svg>
//           </button>
//           {/* Slots */}
//           <div
//             ref={slotsContainerRef}
//             className="flex gap-3 items-center w-full overflow-x-scroll mt-4 scrollbar-hide"
//             style={{ scrollBehavior: 'smooth' }}
//           >
//             {docSlots.length > 0 && docSlots[0].map((item, index) => (
//               <p
//                 onClick={() => setSlotTime(item.time)}
//                 className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-200 ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
//                 key={index}
//                 style={{ minWidth: 100 }}
//               >
//                 {item.time.toLowerCase()}
//               </p>
//             ))}
//           </div>
//           {/* Right Arrow */}
//           <button
//             className="p-2 rounded-full bg-gray-200 hover:bg-primary hover:text-white transition"
//             onClick={() => scrollSlots('right')}
//             aria-label="Scroll right"
//           >
//             <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
//           </button>
//         </div>
//         <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
//       </div>

//       {/* Listing Related Doctors */}
//       {/* <RelatedDoctors docId={docId} speciality={docInfo.speciality} /> */}
  
//     </div>
//   );
// };

// export default Appointment;


import React, { useContext, useEffect, useState, useRef } from 'react';
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
  const slotsContainerRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  // Find the doctor by ID
  const docInfo = doctors?.find(doc => doc._id === docId);

  // Generate slots for the selected date
  const getAvailableSlots = (dateStr) => {
    // Parse date string as local date
    const [year, month, day] = dateStr.split('-').map(Number);
    let currentDate = new Date(year, month - 1, day, 8, 0, 0, 0); // 8:00 AM local
    let endTime = new Date(year, month - 1, day, 24, 0, 0, 0);    // midnight local

    const now = new Date();
    const isToday =
      year === now.getFullYear() &&
      month - 1 === now.getMonth() &&
      day === now.getDate();

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

  // Scroll handler
  const scrollSlots = (direction) => {
    if (!slotsContainerRef.current) return;
    const slotWidth = 120; // px, adjust to match your slot width
    slotsContainerRef.current.scrollBy({
      left: direction === 'left' ? -slotWidth : slotWidth,
      behavior: 'smooth'
    });
    setScrollIndex(prev => direction === 'left' ? Math.max(prev - 1, 0) : prev + 1);
  };

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
        <div className="flex items-center gap-2 w-full">
          {/* Left Arrow */}
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-primary hover:text-white transition"
            onClick={() => scrollSlots('left')}
            aria-label="Scroll left"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          {/* Slots */}
          <div
            ref={slotsContainerRef}
            className="flex gap-3 items-center w-full overflow-x-scroll mt-4 scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
          >
            {docSlots.length > 0 && docSlots[0].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-200 ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
                key={index}
                style={{ minWidth: 100 }}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>
          {/* Right Arrow */}
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-primary hover:text-white transition"
            onClick={() => scrollSlots('right')}
            aria-label="Scroll right"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
      </div>

      {/* Listing Related Doctors */}
      {/* <RelatedDoctors docId={docId} speciality={docInfo.speciality} /> */}
  
    </div>
  );
};

export default Appointment;
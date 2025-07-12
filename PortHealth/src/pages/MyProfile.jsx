import React from 'react'
import { assets } from '../assets/assets'

export const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: 'edward@yahoo.com',
    phone: '407-333-5555',
    address: {
      line1: '110 citrus',
      line2: 'Winter haven Fl, 33884'
    },
    gender: 'Male',
    dob: '2000-01-20'

  })

  const [isEdit, setIsEdit] = useState(false)
  return (
    <div>

      <img src={userData.image} alt=""/>
      {
        isEdit
        ? <input type="text" value={userData.name} onChange={e => setUserData(prec=>({...prev,name:e.target.value}))}/>
        : <p>{userData.name}</p>
      }

      <hr />
      <div>
        <p>CONTACT INFORMATION</p>
        <div>
          <p>Email id:</p>
          <p>{userData.email}</p>
          <p>Phone: {userData.phone}</p>
          {
        isEdit
        ? <input type="text" value={userData.phone} onChange={e => setUserData(prec=>({...prev,phone:e.target.value}))}/>
        : <p>{userData.name}</p>
          }
        </div>
      </div>



    </div>
  )
}

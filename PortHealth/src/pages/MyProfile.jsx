import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Heather Portela",
    image: assets.profile_pic,
    email: 'Heather@yahoo.com',
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
        ? <input type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}/>
        : <p>{userData.name}</p>
      }
      <hr />
      <div>
        <p>CONTACT INFORMATION HERE</p>
        <div>
          <p>Email id:</p>
          <p>{userData.email}</p>
          <p>Phone: {userData.phone}</p>
          {
            isEdit
            ? <input type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}/>
            : <p>{userData.phone}</p>
          }
          <p>Address: </p>
          {
            isEdit 
            ? <p>
              <input onChange={(e)=>setUserData(prev => ({...prev, address, line1: e.target.value}))} value={userData.address.line1} type="text"/>
              <br/>
               <input onChange={(e)=>setUserData(prev => ({...prev, address, line2: e.target.value}))} value={userData.address.line2} type="text"/>
            </p>
            : <p>
              {userData.address.line1}
              <br/>
              {userData.address.line2}
            </p>
          }
        </div>
      </div>
      <div>
        <p>Basic Information</p>
        <div>
          <p>Gender:</p>
          {
            isEdit
            ? <select name="" id=""></select>
            : <p>{userData.phone}</p>
          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile
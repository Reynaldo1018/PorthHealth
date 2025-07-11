import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import { MyProfile } from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

//npx expo start --web  /try to use this command to run the app in web mode
//npx expo export --platform web  /create an build the web app
//npx expo export --platform web



// Publish command to deploy the app on web
// eas deploy --prod  /deploy the app in production mode
// eas deploy --prod


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Routes>
        <Route path= '/' element={<Home/>}/>
        <Route path= '/doctors' element={<Doctor/>}/>
        <Route path= '/doctors/:speciality' element={<Doctor/>}/>
        <Route path= '/login' element={<Login/>}/>
        <Route path= '/about' element={<About/>}/>
        <Route path= '/contact' element={<Contact/>}/>
        <Route path= '/my-profile' element={<MyProfile/>}/>
        <Route path= '/my-appointments' element={<MyAppointments/>}/>
        <Route path= '/appointment/:docId' element={<Appointment/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
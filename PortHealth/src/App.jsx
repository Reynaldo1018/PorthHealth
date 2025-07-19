import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import  MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/adminContext'
import NavbarAdmin from './components/NavbarAdmin'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard'
import AllApointments from './pages/Admin/AllApointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorList from './pages/Admin/DoctorList'





const App = () => {
  const {aToken} = useContext(AdminContext)
  return aToken ? (
     <div className='bg-[#F8F9FD'>
      <ToastContainer/>
       <NavbarAdmin/>
       <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllApointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorList/>}/>
        </Routes>
       </div>
     </div>
  ) : (
    
    <>
     
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
       <ToastContainer />

    </div>
    </>


  )
}

export default App
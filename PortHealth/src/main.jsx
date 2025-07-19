import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import AppContextProvider from './context/AppContext.jsx';
//import AdminContextProvider from './context/AdminContext.jsx';
import DoctorContextProvider from './context/DoctorContext.jsx';
import AdminContextProvider from './context/adminContext.jsx';
// //he
// ReactDOM.createRoot(document.getElementById('root')).render(
  
//     <BrowserRouter>
//     <AppContextProvider>
//       <App />
//     </AppContextProvider>     
//     </BrowserRouter>
  
// );



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AdminContextProvider>
    <DoctorContextProvider>
     <AppContextProvider>
      <App/>
     </AppContextProvider>
    </DoctorContextProvider>   
   </AdminContextProvider>   
  </BrowserRouter>,
)

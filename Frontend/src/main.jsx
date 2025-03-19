import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import App2 from './App2.jsx'

// import OrigApp from './AppFIrst.jsx'



import QRCOde from './TeacherPages/componants/QR-CodeTest/QRCOde.jsx'

import GenerateQRCode from './TeacherPages/componants/QR-CodeTest/GenerateQRCode.jsx'



createRoot(document.getElementById('root')).render(

  
  <StrictMode>
    {/* <DashboardLayoutBasic/> */}



    {/* Admin */}
    <App />
{/* 
    <QRCOde/>

    <GenerateQRCode  /> */}

    {/* taecher */}
    {/* <App2 /> */}



    {/* student */}






    {/* <OrigApp/> */}
    
    

    
  </StrictMode>,
)

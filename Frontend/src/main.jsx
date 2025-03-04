import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DashboardLayoutBasic from './App.jsx'
import OrigApp from './AppFIrst.jsx'

import App2 from './App2'

import QRCOde from './TeacherPages/componants/QR-CodeTest/QRCOde.jsx'
import App3 from './App3'
import GenerateQRCode from './TeacherPages/componants/QR-CodeTest/GenerateQRCode.jsx'



createRoot(document.getElementById('root')).render(

  
  <StrictMode>
    {/* <DashboardLayoutBasic/> */}



    {/* Admin */}
    <App />

    {/* <QRCOde/> */}

    {/* <GenerateQRCode  /> */}

    {/* taecher */}
    {/* <App2 /> */}


    {/* student */}
    {/* <App3 /> */}





    {/* <OrigApp/> */}
    
    

    
  </StrictMode>,
)

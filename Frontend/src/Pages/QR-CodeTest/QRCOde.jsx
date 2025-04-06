import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useParams, useLocation } from 'react-router-dom';

import {
  Box,
  Typography,
  Paper,
  Alert,
  useTheme,
} from "@mui/material";
import ReturnButton from '../../comps/ReturnButton';

function QRCode({ onScan }) {
  const { speciality, year, semester, module } = useParams();
  const location = useLocation();
  const stateModule = location.state?.module;
  const finalModule = stateModule || module;

  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
      
      if (onScan) {
        onScan(result);
      }

      // ✅ Call handleScan when QR code is successfully scanned
      handleScan(result, finalModule);
    }

    async function handleScan(scanResult, module) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/etu/${scanResult}/exa/${module}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
          throw new Error("Failed to mark attendance");
        }
        alert("Attendance marked successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      }
    }

    function error(err) {
      console.warn(err);
    }

    return () => scanner.clear(); // Cleanup when component unmounts
  }, [onScan, finalModule]); // ✅ Ensure finalModule is up-to-date

  return (
    <Box sx={{ display: "flex",flexDirection:'column', height: "100%",width:'100%' }}>
      <Box sx={{ display: "flex",alignItems:'center', height: "auto",width:'100%',mb:5 }}>

        <ReturnButton/><h1 style={{margin:'0',padding:'0',marginLeft:'2%'}}>QR-Code Scanning Page for {speciality} {year} {semester} - {finalModule}</h1>
      </Box>

    <div>
      
      {scanResult ? <p>Scanned: {scanResult}</p> : <div id="reader">Waiting for scan...</div>}
    </div>
    </Box>
  );
}

export default QRCode;

import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useParams, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import ReturnButton from '../../comps/ReturnButton';

function QRCodetea({ onScan }) {
  const { module } = useParams();
  const location = useLocation();
  const stateModule = location.state?.module;
  const finalModule = stateModule || module;

  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(scannerRef.current.id, {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    const success = (result) => {
      scanner.clear().then(() => {
        setScanResult(result);
        onScan?.(result);
        handleScan(result, finalModule);
      }).catch((e) => {
        console.error("Clear scanner error:", e);
        setErrorMessage("Failed to stop scanner");
      });
    };

    const error = (err) => {
      console.warn("QR Scan Error:", err);
    };

    scanner.render(success, error);

    setLoading(false); // Scanner rendered

    return () => {
      scanner.clear().catch((e) => console.log("Scanner cleanup failed:", e));
    };
  }, [finalModule, onScan]);

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
      setErrorMessage(error.message);
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: 'column', height: "100%", width: '100%' }}>
      <Box sx={{ display: "flex", alignItems: 'center', mb: 3 }}>
        <ReturnButton />
        <Typography variant="h5" sx={{ ml: 2 }}>
          QR Code Scanning Page - {finalModule}
        </Typography>
      </Box>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {scanResult ? (
          <Typography variant="h6" color="success.main">Scanned: {scanResult}</Typography>
        ) : (
          <>
            {loading ? (
              <CircularProgress />
            ) : (
              <div ref={scannerRef} id="reader" style={{ width: "100%" }} />
            )}
          </>
        )}
      </Paper>
    </Box>
  );
}

export default QRCodetea;

import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useParams, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Alert,
  IconButton,
  Tooltip
} from "@mui/material";
import Swal from 'sweetalert2';
import ReturnButton from '../../comps/ReturnButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

function QRCode({ onScan }) {
  const { speciality, year, semester, module } = useParams();
  const location = useLocation();
  const stateModule = location.state?.module;
  const finalModule = stateModule || module;

  const [lastScan, setLastScan] = useState(null);
  const lastScannedRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      if (result === lastScannedRef.current) return;

      setLastScan(result);
      lastScannedRef.current = result;

      if (onScan) onScan(result);
      handleScan(result, finalModule);

      setTimeout(() => {
        lastScannedRef.current = null;
      }, 3000);
    }

    async function handleScan(scanResult, module) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/etu/${scanResult}/exa/${module}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData?.message || "Failed to mark attendance");
        }

        showToast("Attendance marked successfully!", "success");
      } catch (error) {
        console.error("Error:", error);
        showToast(error.message || "Invalid or already present", "error");
      }
    }

    function error(err) {
      console.warn(err);
    }

    function showToast(msg, icon = "success") {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: icon,
        title: msg,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }

    return () => {
      scanner.clear().catch(err => console.error("Failed to clear scanner:", err));
    };
  }, [onScan, finalModule]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      fullscreenRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <Box sx={{ p: 3, height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Paper elevation={0} sx={{ p: 4, width: "100%", maxWidth: 800 }} ref={fullscreenRef}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ReturnButton />
            <Typography variant="h5" sx={{ ml: 2 }}>
              QR-Code Scanning Page for {speciality} {year} {semester} - <b>{finalModule}</b>
            </Typography>
          </Box>
          <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
            <IconButton onClick={toggleFullscreen} size="large">
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Box id="reader" sx={{ width: 300 }}></Box>
        </Box>

        {lastScan && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Last scanned: <strong>{lastScan}</strong>
          </Alert>
        )}

        <Typography variant="body2" color="text.secondary" align="center">
          Keep scanning QR codes. Press return to exit.
        </Typography>
      </Paper>
    </Box>
  );
}

export default QRCode;

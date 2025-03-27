import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useParams, useLocation } from 'react-router-dom';

function QRCOde({ onScan }) {
  const { speciality, year, semester, module } = useParams();  // ✅ Get module from URL params
  const location = useLocation();
  const stateModule = location.state?.module; // Get module from state if available
  const finalModule = stateModule || module; // Prefer state module but fallback to URL param

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
    }

    function error(err) {
      console.warn(err);
    }

    return () => scanner.clear(); // Cleanup when component unmounts
  }, [onScan]);

  return (
    <div className="App">
      <h1>QR Scanning for {speciality} {year} {semester} - {finalModule}</h1>
      {scanResult ? <p>Scanned: {scanResult}</p> : <div id="reader">Waiting for scan...</div>}
    </div>
  );
}

export default QRCOde;

import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { useNavigate } from "react-router-dom";

const QrCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      console.log("Scanned QR Code:", data);

      // Redirect to the scanned page or process data
      navigate(data);
    }
  };

  const handleError = (err) => {
    console.error("QR Code Scan Error:", err);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Scan the QR Code</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "300px" }}
      />
      {scanResult && <p>Scanned Result: {scanResult}</p>}
    </div>
  );
};

export default QrCodeScanner;

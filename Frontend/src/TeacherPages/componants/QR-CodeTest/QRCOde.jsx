import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function QRCOde({ onScan }) {
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
      onScan(result); // ✅ Call onScan function to update student presence
    }

    function error(err) {
      console.warn(err);
    }
  }, [onScan]);

  return (
    <div className="App">
      <h1>QR Scanning Code</h1>
      {scanResult ? <p>Scanned: {scanResult}</p> : <div id="reader">waiting</div>}
    </div>
  );
}

export default QRCOde;

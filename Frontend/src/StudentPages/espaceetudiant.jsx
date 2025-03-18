import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { GraduationCap, Download, User, Mail, Hash, BookOpen, Building2 } from 'lucide-react';
import './espaceetudiant.css';

function espaceetudiant() {
  const [student, setStudent] = useState(null);
  const qrRef = useRef(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/student/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((error) => console.error("Error fetching student data:", error));
  }, [token]);

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${student?.matricul}_qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  if (!student) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
         <BookOpen className="role-card-icon" />
          <h1>Student Profile</h1>
          <div className="matricul-number">{student.matricul}</div>
        </div>

        <div className="profile-content">
          <div className="qr-section">
            <div ref={qrRef} className="qr-code-container" onClick={downloadQRCode}>
              <QRCodeCanvas 
                value={student.matricul} 
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="qr-caption">
              <Download className="icon-sm" />
              Click to download QR Code
            </div>
          </div>

          <div className="info-section">
            <div className="info-group">
              <div className="info-item">
                <div className="info-label">
                  <User className="icon-sm" /> First Name
                </div>
                <div className="info-value">{student.first_name}</div>
              </div>
              <div className="info-item">
                <div className="info-label">
                  <User className="icon-sm" /> Last Name
                </div>
                <div className="info-value">{student.last_name}</div>
              </div>
            </div>

            <div className="info-group">
              <div className="info-item">
                <div className="info-label">
                  <Mail className="icon-sm" /> Email
                </div>
                <div className="info-value">{student.email}</div>
              </div>
              <div className="info-item">
                <div className="info-label">
                  <Hash className="icon-sm" /> Roll Number
                </div>
                <div className="info-value">{student.roll_number}</div>
              </div>
            </div>

            <div className="info-group">
              <div className="info-item">
                <div className="info-label">
                  <BookOpen className="icon-sm" /> Level
                </div>
                <div className="info-value">{student.level}</div>
              </div>
              <div className="info-item">
                <div className="info-label">
                  <Building2 className="icon-sm" /> Speciality
                </div>
                <div className="info-value">{student.speciality}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default espaceetudiant;
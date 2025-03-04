import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function GenerateQRCode() {
//   const [text, setText] = useState("");


const [students, setStudents] = useState([
    { id: 1, matricule: "202212345", firstName: "Alice", lastName: "Johnson", examan: "Maths", presence: "Absent" },
    { id: 2, matricule: "202267890", firstName: "Bob", lastName: "Smith", examan: "Science", presence: "Absent" },
  ]);

  const student = students.find(student => student.id === 1);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Generate QR Code</h2>
      {/* <input
        type="text"
        placeholder="Enter text or ID"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px", width: "80%" }}
      /> */}


      <div>
        {/* {text && <QRCodeCanvas value={text} size={200} />}

        <QRCodeCanvas value={student[1]} size={200} /> */}



        {student ? (
            <div>
            <p>Student: {student.firstName} {student.lastName}</p>
            <p>Matricule: {student.matricule}</p>
            <QRCodeCanvas value={student.matricule} size={200} />
            </div>
        ) : (
            <p>No student found</p>
        )}
        </div>
      </div>
    
  );
}

export default GenerateQRCode;

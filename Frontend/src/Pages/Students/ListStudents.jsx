import React, { useState, useEffect } from "react";
import "./ListStudents.css";
import StudentTable from "./StudentTable";
import { Button, Modal, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import ReturnButton from "../../comps/ReturnButton";
import AddStudent from "./AddStudent"; // import the form component

export default function ListStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const rowsPerPage = 5;
  const { speciality, year } = useParams();

  const fetchStudents = (pageNumber = 1) => {
    fetch(`http://127.0.0.1:8000/student_par_specialitylevel/${speciality}/${year}?page=${pageNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.results || []);
        setTotalCount(data.count || 0);
      })
      .catch((err) => console.error("Error fetching students:", err));
  };

  useEffect(() => {
    fetchStudents(page + 1);
  }, [page]);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/student/delete/${id}/`, {
      method: "DELETE",
    })
      .then(() => fetchStudents(page + 1))
      .catch((err) => console.error("Error deleting student:", err));
  };

  return (
    <div className="Student-Container">
      <div className="MainSection-Top">
        <div className="TSL">
          <ReturnButton />
          <h1 className="StudentListTitle">Student List</h1>
        </div>

        <Button
          color="info"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
        >
          Add
        </Button>
      </div>

      <div className="MainSection-Bottom">
        <StudentTable
          students={students}
          navigate={navigate}
          onDelete={handleDelete}
          page={page}
          setPage={setPage}
          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
        />
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height:"auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          pl: 4,
          pr: 4,
          borderRadius: 2,
        }}>
          <AddStudent
            onClose={() => setModalOpen(false)}
            onAdd={() => fetchStudents(page + 1)}
          />
        </Box>
      </Modal>
    </div>
  );
}

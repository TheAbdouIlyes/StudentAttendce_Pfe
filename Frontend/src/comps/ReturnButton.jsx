import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const ReturnButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      startIcon={<ExitToAppIcon />}
      onClick={() => navigate(-1)} // Navigate back
      sx={{height:40}}
    >
      Return
    </Button>
  );
};

export default ReturnButton;

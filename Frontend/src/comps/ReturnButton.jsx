import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const ReturnButton = () => {
  const navigate = useNavigate();
  const theme= useTheme();

  return (
    <Button
      variant="contained"
      startIcon={<ExitToAppIcon />}
      onClick={() => navigate(-1)} // Navigate back
      sx={{height:40 ,maxWidth:130}}
      color="info"
    >
      Return
    </Button>
  );
};

export default ReturnButton;

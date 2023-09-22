import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../../features/alert/alertSlice";

function App() {
  const {
    open,
    title,
    onCancel,
    onAccept,
    description,
    textAccept,
    textCancel,
  } = useSelector((status) => status.alert);
  const dispatch = useDispatch();

  const handleAccept = () => {
    onAccept();
    dispatch(setOpen(false));
  };

  const handleCancel = () => {
    onCancel();
    dispatch(setOpen(false));
  };

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      {description && description !== "" && (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        {textCancel && textCancel !== "" && (
          <Button onClick={handleCancel} color="primary">
            {textCancel}
          </Button>
        )}
        {textAccept && textAccept !== "" && (
          <Button onClick={handleAccept} color="primary" variant="contained">
            {textAccept}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default App;

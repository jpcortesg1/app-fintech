import { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import RUTER_BASE from "../../utils/getRouteBase";
import { useDispatch, useSelector } from "react-redux";
import {
  setCancelText,
  setTitle,
  setOpen as setOpenAlert,
} from "../../features/alert/alertSlice";

const CreateAccountButton = ({ setAccounts }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    balance: "",
    number: "",
  });
  const { jwt } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: dataRes } = await axios.post(
        `${RUTER_BASE}/api/v1/account/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { status, data } = dataRes;
      if (status === 200) {
        setAccounts((prev) => [...prev, data]);
        handleClose();
      }
    } catch (error) {
      const data = error?.response?.data;
      if (!data) {
        dispatch(setCancelText(""));
        dispatch(setOpenAlert(true));
        dispatch(setTitle(error.message));
        return;
      }
      const { message } = data;
      dispatch(setCancelText(""));
      dispatch(setOpenAlert(true));
      dispatch(setTitle(message));
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
        }}
      >
        Crear Cuenta
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Container
          maxWidth="sm"
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              pointerEvents: "all",
            }}
          >
            <Typography variant="h6">Crear Nueva Cuenta</Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Tipo de Cuenta</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Tipo de Cuenta"
                >
                  <MenuItem value="savings">Ahorros</MenuItem>
                  <MenuItem value="checking">Corriente</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Saldo"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Número de Cuenta"
                name="number"
                value={formData.number}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <Button type="submit" variant="contained" color="primary">
                Crear
              </Button>
            </form>
          </Box>
        </Container>
      </Modal>
    </div>
  );
};

export default CreateAccountButton;

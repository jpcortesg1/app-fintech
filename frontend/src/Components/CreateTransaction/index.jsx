import { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";
import RUTER_BASE from "../../utils/getRouteBase";
import { useDispatch, useSelector } from "react-redux";
import {
  setCancelText,
  setTitle,
  setOpen as setOpenAlert,
  setOnAccept,
} from "../../features/alert/alertSlice";
import { useNavigate } from "react-router-dom";

const CreateTransactionModal = ({ open, setOpen, id, setAccounts }) => {
  const [formData, setFormData] = useState({
    account_destination: "",
    amount: 0,
  });
  const { jwt } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    console.log({ ...formData, id_account_origin: id });
    try {
      const { data: dataRes } = await axios.post(
        `${RUTER_BASE}/api/v1/transaction/`,
        {
          ...formData,
          amount: parseFloat(formData.amount),
          id_account_origin: id,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { status } = dataRes;
      if (status === 200) {
        setAccounts &&
          setAccounts((prev) =>
            prev.map((acc) => {
              if (acc.id !== id) return acc;
              return {
                ...acc,
                balance: acc.balance - parseFloat(formData.amount),
              };
            })
          );
        dispatch(setCancelText(""));
        dispatch(setOpenAlert(true));
        dispatch(setTitle("Transacción creada con éxito"));
        dispatch(setOnAccept(() => navigate("/account")));
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
          <Typography variant="h6">Crear Nueva Transacción</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Cuenta Destino"
              name="account_destination"
              value={formData.account_destination}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Monto"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </form>
        </Box>
      </Container>
    </Modal>
  );
};

export default CreateTransactionModal;

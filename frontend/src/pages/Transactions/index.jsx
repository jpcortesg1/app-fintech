import { useParams } from "react-router-dom";
import CreateTransactionModal from "../../Components/CreateTransaction";
import { useState } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import Transaction from "../../Components/Transactions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import RUTER_BASE from "../../utils/getRouteBase";
import {
  setCancelText,
  setOnAccept,
  setOnCancel,
  setOpen,
  setTitle,
} from "../../features/alert/alertSlice";
import { useNavigate } from "react-router-dom";

export default function Transactions() {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { jwt } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTransaction = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (!id) return;
        const { data: dataRes } = await axios.get(
          `${RUTER_BASE}/api/v1/transaction/by-account/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const { data } = dataRes;
        setTransactions(data);
      } catch (error) {
        const data = error?.response?.data;
        if (!data) {
          dispatch(setCancelText(""));
          dispatch(setOpen(true));
          dispatch(setTitle(error.message));
          return;
        }
        const { message } = data;
        dispatch(setCancelText(""));
        if (message === "Account not found!") {
          dispatch(setOnAccept(() => navigate("/account")));
        }
        dispatch(setOpen(true));
        dispatch(setTitle(message));
      }
    };
    getData();
  }, [jwt, dispatch, id, navigate]);

  return (
    <>
      <CreateTransactionModal open={openModal} setOpen={setOpenModal} id={id} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleTransaction}
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
        }}
      >
        Hacer Transacción
      </Button>
      <Container maxWidth="lg">
        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100wh",
          }}
        >
          <h1>Transacciones de la Cuenta # {id}</h1>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
            }}
          >
            {transactions.map((transaction) => (
              <Transaction
                key={transaction.id}
                transaction={transaction}
                type={
                  transaction.id_account_destination == id
                    ? "received"
                    : "sended"
                }
              />
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

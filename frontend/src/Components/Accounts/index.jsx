import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import RUTER_BASE from "../../utils/getRouteBase";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCancelText,
  setOpen,
  setTitle,
} from "../../features/alert/alertSlice";
import CreateTransactionModal from "../CreateTransaction";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    width: 300,
    minWidth: 300,
  },
});

const Accounts = ({ accounts, setAccounts }) => {
  const classes = useStyles();
  const { jwt } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <CreateTransactionModal
        open={openModal}
        setOpen={setOpenModal}
        id={id}
        setAccounts={setAccounts}
      />
      {accounts?.map((account, index) => {
        const date = new Date(account.created_at);
        const dateDayMonthYear = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        const handleDelete = async () => {
          try {
            const { data: dataRes } = await axios.delete(
              `${RUTER_BASE}/api/v1/account/${account.id}`,
              {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
              }
            );
            const { status } = dataRes;
            if (status && status === 200) {
              setAccounts((prev) =>
                prev.filter((acc) => acc.id !== account.id)
              );
            }
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
            dispatch(setOpen(true));
            dispatch(setTitle(message));
          }
        };

        const handleTransaction = () => {
          setId(account.id);
          setOpenModal(true);
        };

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Cuenta #{account.id}
                </Typography>
                <Typography variant="body2">Tipo: {account.type}</Typography>
                <Typography variant="body2">
                  Número de Cuenta: {account.number}
                </Typography>
                <Typography variant="body2">
                  Saldo: {account.balance.toFixed(2)} USD
                </Typography>
                <Typography variant="body2">
                  Fecha de Creación: {dateDayMonthYear}
                </Typography>
                <Grid container justifyContent="center" gap={1} marginTop={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/transactions/${account.id}`)}
                  >
                    Ver Transacciones
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTransaction}
                  >
                    Hacer Transacción
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                  >
                    Borrar
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default Accounts;

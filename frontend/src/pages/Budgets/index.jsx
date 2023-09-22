import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RUTER_BASE from "../../utils/getRouteBase";
import {
  setCancelText,
  setOpen,
  setTitle,
} from "../../features/alert/alertSlice";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  card: {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: 400,
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    marginTop: 2,
  },
  button: {
    marginTop: 2,
  },
}));

export default function Budgets() {
  const { jwt } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [allTransactionsQuantity, setAllTransactionsQuantity] = useState(0);
  const [allTransactionsQuantityDo, setAllTransactionsQuantityDo] = useState(0);

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    if (!allTransactionsQuantity || allTransactionsQuantity?.lenght === 0)
      return;
    allTransactionsQuantity.forEach((transaction) => {
      const { amount } = transaction;
      setIncome((prev) => prev + amount);
    });
  }, [allTransactionsQuantity]);

  useEffect(() => {
    if (!allTransactionsQuantityDo || allTransactionsQuantityDo?.lenght === 0)
      return;
    allTransactionsQuantityDo.forEach((transaction) => {
      const { amount } = transaction;
      setExpenses((prev) => prev + amount);
    });
  }, [allTransactionsQuantityDo]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: dataRes } = await axios.get(
          `${RUTER_BASE}/api/v1/transaction/by-user`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const { data } = dataRes;

        setAllTransactionsQuantity(data?.all_transactions_destination);
        setAllTransactionsQuantityDo(data?.all_transactions_origin);
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
    getData();
  }, [jwt, dispatch]);

  return (
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
        <h1>Presupuestos</h1>

        <Grid
          container
          spacing={2}
          marginTop={5}
          sx={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" className={classes.title}>
                  Gastos
                </Typography>
                <Typography variant="body2" className={classes.description}>
                  {expenses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" className={classes.title}>
                  Ingresos
                </Typography>
                <Typography variant="body2" className={classes.description}>
                  {income}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

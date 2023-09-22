import { ThemeProvider } from "@emotion/react";
import { Card, CardContent, Typography, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  sentCard: {
    borderLeft: `4px solid #f44336`,
    marginBottom: 2,
  },
  receivedCard: {
    borderLeft: `4px solid #4caf50`,
    marginBottom: 2,
  },
}));

const theme = createTheme({
  palette: {
    type: "dark", // Indica que es un tema oscuro
    primary: {
      main: "#2196f3", // Color principal
    },
    secondary: {
      main: "#f50057", // Color secundario
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
  },
});

const TransactionCard = ({ transaction, type }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Card
        className={
          type === "received" ? classes.receivedCard : classes.sentCard
        }
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Transacción #{transaction?.id}
          </Typography>
          <Typography variant="body2">
            Monto: {transaction?.amount.toFixed(2)} USD
          </Typography>
          <Typography variant="body2">
            Fecha de Creación: {transaction?.created_at}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default TransactionCard;

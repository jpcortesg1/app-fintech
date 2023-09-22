import { Box, Container, Grid } from "@mui/material";
import CreateAccountButton from "../../Components/CreateAccount";
import Accounts from "../../Components/Accounts";
import { useState } from "react";
import { useEffect } from "react";
import RUTER_BASE from "../../utils/getRouteBase";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Account() {
  const [accounts, setAccounts] = useState([]);
  const { jwt } = useSelector((state) => state.auth);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${RUTER_BASE}/api/v1/account/by-user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const { data } = res.data;
      setAccounts(data);
    };
    getData();
  }, [jwt]);

  return (
    <>
      <CreateAccountButton setAccounts={setAccounts} />
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
          <h1>Cuentas</h1>
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
            <Accounts accounts={accounts} setAccounts={setAccounts} />
          </Grid>
        </Box>
      </Container>
    </>
  );
}

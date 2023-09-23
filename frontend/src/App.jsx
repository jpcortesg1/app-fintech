import TopBar from "./Components/TopBar";
import Home from "./pages/Home";
import { Routes, Route, HashRouter } from "react-router-dom";
import Register from "./pages/Register";
import Account from "./pages/Account";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "./Components/SideBar";
import Alert from "./Components/Alert";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Budgets from "./pages/Budgets";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { loggout } from "./features/auth/authSlice";

function App() {
  const { jwt } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Detect any click in dom
  useEffect(() => {
    const handleClick = () => {
      if (jwt === "" || !jwt) return;
      const { exp } = jwtDecode(jwt);
      let expDate = new Date(exp * 1000 - 10);
      const now = new Date();
      if (now.getTime() > expDate.getTime()) {
        dispatch(loggout());
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [dispatch, jwt]);

  const isLogged = (page) => {
    if (jwt === "") return page;
    return <Navigate to="/dashboard" />;
  };

  const isNotLogged = (page) => {
    if (jwt !== "") return page;
    return <Navigate to="/" />;
  };

  return (
    <>
      <Alert />
      <HashRouter>
        {jwt ? <Sidebar /> : <TopBar />}
        <Routes>
          <Route path="/">
            <Route index element={isLogged(<Home />)} />
            <Route path="register" element={isLogged(<Register />)} />
            <Route path="account" element={isNotLogged(<Account />)} />
            <Route
              path="transactions/:id"
              element={isNotLogged(<Transactions />)}
            />
            <Route path="dashboard" element={isNotLogged(<Dashboard />)} />
            <Route path="budgets" element={isNotLogged(<Budgets />)} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;

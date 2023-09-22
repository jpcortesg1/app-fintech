import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: localStorage.getItem("jwt") || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setJwt: (state, action) => {
      state.jwt = action.payload;
      localStorage.setItem("jwt", action.payload);
    },
    loggout: (state) => {
      state.jwt = "";
      localStorage.removeItem("jwt");
    },
  },
});

export const { setJwt, loggout } = authSlice.actions;

export default authSlice.reducer;

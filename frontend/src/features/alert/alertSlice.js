import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  title: "base alert",
  description: "",
  textAccept: "Aceptar",
  textCancel: "",
  onAccept: () => {
    console.log("base alert");
  },
  onCancel: () => {
    console.log("base alert");
  },
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setOnAccept: (state, action) => {
      state.onAccept = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setCancelText: (state, action) => {
      state.textCancel = action.payload;
    },
  },
});

export const {
  setOpen,
  setTitle,
  setDescription,
  setOnAccept,
  setOnCancel,
  setCancelText,
} = alertSlice.actions;

export default alertSlice.reducer;

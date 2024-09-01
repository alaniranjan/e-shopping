import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn:
    localStorage.getItem("username") !== null &&
    localStorage.getItem("username") !== undefined &&
    localStorage.getItem("username") !== "",
  modalOpen: false,
  username: localStorage.getItem("username") ?? "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateModal: (state, action) => {
      state.modalOpen = action.payload;
    },
    doLogin: (state, action) => {
      if (
        action.payload.username === "niranjan@gmail.com" &&
        action.payload.password === "niranjan"
      ) {
        localStorage.setItem("username", "Niranjan");
        state.username = "Niranjan";
        state.modalOpen = false;
        state.isLoggedIn = true;
      }
    },
    doLogout: (state) => {
      localStorage.removeItem("username");
      state.username = "";
      state.isLoggedIn = false;
    },
  },
});

export const { updateModal, doLogin, doLogout } = authSlice.actions;
export default authSlice.reducer;

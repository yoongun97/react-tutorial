import { createSlice } from "@reduxjs/toolkit";
// import produce from "immer";

// 1. createSlice 만들기
const user = createSlice({
  name: "User",
  initialState: {
    email: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = user.actions;
export default user.reducer;

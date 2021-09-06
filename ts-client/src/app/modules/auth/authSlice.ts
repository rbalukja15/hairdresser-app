import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface AuthSlice {
  loggedIn: boolean;
}

const initialState: AuthSlice = {
  loggedIn: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const selectAuth = (state: RootState) => state.auth.loggedIn;

export default authSlice.reducer;

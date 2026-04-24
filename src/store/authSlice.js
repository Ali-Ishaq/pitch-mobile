import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: null,
  user: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      const payload = action.payload || {};
      const resolvedUser = payload.user ?? payload;
      const resolvedToken = payload.token ?? null;

      state.status = true;
      state.token = resolvedToken;
      state.user = resolvedUser;
      state.role = resolvedUser?.role || payload.role || "user"; // Default to "user" if role is not provided
    },

    logout: (state) => {
      state.status = false;
      state.token = null;
      state.user = null;
      state.role = null;
    },
  },
});

export const { setAuthUser, logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.status;
export const selectAuthRole = (state) => state.auth.role;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;

export default authSlice.reducer;

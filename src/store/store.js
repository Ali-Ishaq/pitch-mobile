import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./adminSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import alertSlice from "./slices/alertSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer:{
        authSlice,
        alert: alertSlice,
        user: userSlice,
    },
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import alertSlice from "./slices/alertSlice";

const store = configureStore({
    reducer:{
        authSlice,
        alert: alertSlice,
    },
});

export default store;
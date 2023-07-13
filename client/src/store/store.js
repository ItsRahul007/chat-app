import { configureStore } from "@reduxjs/toolkit";
import exampleSlice from "./slices/exampleSlice";

const store = configureStore({
    reducer:{
        example: exampleSlice
    },
});

export default store;
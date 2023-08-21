import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alertSlice";
import userSlice from "./slices/userSlice";
import messageSlice from "./slices/messageSlice";
import onlineSlice from "./slices/onlineSlice";
import mediaSlice from "./slices/mediaSlice";
import blockSlice from "./slices/blockSlice";

const store = configureStore({
    reducer:{
        alert: alertSlice,
        user: userSlice,
        messageSlice,
        onlineSlice,
        mediaSlice,
        blockSlice
    },
});

export default store;
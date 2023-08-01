import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slices/chatSlice";
import alertSlice from "./slices/alertSlice";
import userSlice from "./slices/userSlice";
import messageSlice from "./slices/messageSlice";

const store = configureStore({
    reducer:{
        chatId: chatSlice,
        alert: alertSlice,
        user: userSlice,
        messageSlice,
    },
});

export default store;
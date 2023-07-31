import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat-ids",
    initialState: [],
    reducers: {
        chatList(state, action) {
            state.push(action.payload);
        }
    }
});

export const { chatList } = chatSlice.actions;
export default chatSlice.reducer;
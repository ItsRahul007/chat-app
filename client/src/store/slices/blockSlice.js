import { createSlice } from "@reduxjs/toolkit";

const blockSlice = createSlice({
    name: "block slice",
    initialState: {
        blockedChat: [],
        blockedBy: []
    },
    reducers: {
        blockUser(state, action) {
            state.blockedChat.push(action.payload);
        },

        blockEdBy(state, action) {
            state.blockedBy.push(action.payload);
        },

        unBlockEdBy(state, action) {
            state.blockedBy.map(id => id !== action.payload);
        },

        unblockUser(state, action) {
            state.blockedChat.map(id => id !== action.payload);
        },
    }
});

export const { blockUser, blockEdBy, unBlockEdBy, unblockUser } = blockSlice.actions;
export default blockSlice.reducer;
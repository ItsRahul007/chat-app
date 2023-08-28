import { createSlice } from "@reduxjs/toolkit";
import clearData from "../actions/clearData";

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

        unBlockUser(state, action) {
            const newArr = state.blockedChat;
            state.blockedChat = newArr.filter(id => id !== action.payload);
            return state;
        },

        blockEdBy(state, action) {
            state.blockedBy.push(action.payload);
        },

        unBlockEdBy(state, action) {
            const newArr = state.blockedBy;
            state.blockedBy = newArr.filter(id => id !== action.payload);
            return state;
        }
    },
    extraReducers: builder => {
        builder.addCase(clearData, () => {
            return {
                blockedChat: [],
                blockedBy: []
            }
        })
    }
});

export const { blockUser, blockEdBy, unBlockEdBy, unBlockUser } = blockSlice.actions;
export default blockSlice.reducer;
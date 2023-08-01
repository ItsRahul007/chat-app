import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'message-slice',
    initialState: {},
    reducers: {
        setNewMessage(state, action) {
            const {keyId, id, msg} = action.payload;
            state[keyId] = [{id, msg}];
        },

        saveMessage(state, action) {
            const {keyId, id, msg} = action.payload;
            const newMsg = [
                ...state[keyId],
                { id, msg },
              ];
              
            state[keyId] = newMsg;
        }
    }
});

export const { setNewMessage, saveMessage } = messageSlice.actions;
export default messageSlice.reducer
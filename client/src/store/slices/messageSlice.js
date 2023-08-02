import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'message-slice',
    initialState: {},
    reducers: {
        setNewMessage(state, action) {
            const {keyId, id, msg} = action.payload;
            state[keyId] = [...(state[keyId] || []), {id, msg}];
            console.log("not ok");
        }
    }
});

export const { setNewMessage } = messageSlice.actions;
export default messageSlice.reducer
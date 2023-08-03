import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'message-slice',
    initialState: {},
    reducers: {
        setMessage(state, action) {
            const {keyId, id, msg} = action.payload;
            state[keyId] = [...(state[keyId] || []), {id, msg}];
        }
    }
});

export const { setMessage } = messageSlice.actions;
export default messageSlice.reducer
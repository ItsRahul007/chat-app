import { createSlice } from "@reduxjs/toolkit";

const onlineSlice = createSlice({
    name: 'online',
    initialState: [],
    reducers: {
        pushOnlineId(state, action){
            state.push(action.payload);
        },

        removeOnlineId(state, action){
            return state.filter(e => e !== action.payload);
        }
    }
});

export const { pushOnlineId, removeOnlineId } = onlineSlice.actions;
export default onlineSlice.reducer;
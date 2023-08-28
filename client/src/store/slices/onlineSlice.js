import { createSlice } from "@reduxjs/toolkit";
import clearData from '../actions/clearData';

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
    },
    extraReducers: builder => {
        builder.addCase(clearData, () => {
            return []
        })
    }
});

export const { pushOnlineId, removeOnlineId } = onlineSlice.actions;
export default onlineSlice.reducer;
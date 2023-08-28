import { createSlice } from "@reduxjs/toolkit";
import clearData from "../actions/clearData";

const alertSlice = createSlice({
    name: 'alert',
    initialState: [],
    reducers: {
        showAlert(state, action) {
            state.push(action.payload);
        },
        removeAlert() {
            return [];
        }
    },
    extraReducers: builder => {
        builder.addCase(clearData, () => {
            return []
        })
    }
});
export const { showAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
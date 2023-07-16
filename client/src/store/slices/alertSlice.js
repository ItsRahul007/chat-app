import { createSlice } from "@reduxjs/toolkit";

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
    }
});
export const { showAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
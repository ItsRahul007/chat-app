import { createSlice } from "@reduxjs/toolkit";
import clearData from "../actions/clearData";

const mediaSlice = createSlice({
    name: "media",
    initialState: [],
    reducers: {
        storeImagesToSlice(state, action){
            state.push(action.payload);
        }
    },
    extraReducers: builder => {
        builder.addCase(clearData, () => {
            return []
        })
    }
});

export const { storeImagesToSlice } = mediaSlice.actions;
export default mediaSlice.reducer;
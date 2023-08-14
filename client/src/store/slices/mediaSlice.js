import { createSlice } from "@reduxjs/toolkit";

const mediaSlice = createSlice({
    name: "media",
    initialState: [],
    reducers: {
        storeImagesToSlice(state, action){
            state.push(action.payload);
        }
    }
});

export const { storeImagesToSlice } = mediaSlice.actions;
export default mediaSlice.reducer;
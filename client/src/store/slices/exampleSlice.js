import { createSlice } from "@reduxjs/toolkit";

const exampleSlice = createSlice({
    name: "example",
    initialState: [],
    reducers:{
        sampleFun1(state, action){
            state.push(action.payload);
        },

        sampleFun2(state, action){
            console.log('fun2 is here');
            console.log('state: '+ state);
            console.log('action: '+ action);
        },
    }
});


export const {sampleFun1} = exampleSlice.actions;
export default exampleSlice.reducer;
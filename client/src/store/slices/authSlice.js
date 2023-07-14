import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "example",
    initialState: [],
    reducers:{
        async sampleFun1(state, action){
            // const 
        },

        sampleFun2(state, action){
            console.log('fun2 is here');
            console.log('state: '+ state);
            console.log('action: '+ action);
        },
    }
});


// export const {sampleFun1} = authSlice.actions;
export default authSlice.reducer;
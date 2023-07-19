import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk('fetchUser', async () => {
    const data = await fetch('http://localhost:4000/auth/getuser', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "auth-token": localStorage.getItem('authToken')
        }
    });
    const parsedData = await data.json();
    return parsedData;
});

export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async () => {
    const data = await fetch('http://localhost:4000/auth/getallusers', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "auth-token": localStorage.getItem('authToken')
        }
    });
    const parsedData = await data.json();
    return parsedData;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {
            isLoading: false,
            data: null,
            isFailed: false
        },

        allUsersData:{
            isLoading: false,
            data: null,
            isFailed: false
        }
    },
    extraReducers: (builder) => {
        // For fetching the requested user
        builder.addCase(fetchUser.pending, (state) => {
            state.userData.isLoading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.userData.data = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.userData.isFailed = true;
            console.log(action.payload);
        });

        // For fetching all users
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.allUsersData.isLoading = true;
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.allUsersData.data = action.payload;
        });
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.allUsersData.isFailed = true;
            console.log(action.payload);
        });
    },
});

export default userSlice.reducer;
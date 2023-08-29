import { createSlice } from "@reduxjs/toolkit";

const unreadMessage = createSlice({
    name: "unread messages",
    initialState: {},
    reducers: {
        addUnreadMsgAmmount(state, action){
            let prev = state[action.payload];
            if(prev && prev.length >= 1){
                prev.push('1');
                state[action.payload] = prev;
            }
            else {
                state[action.payload] = ['1'];
            };
            return state;
        },

        removeUnreadMsgAmmount(state, action){
            const newState = {...state};
            delete newState[action.payload];
            return newState;
        }
    }
});

export const { addUnreadMsgAmmount, removeUnreadMsgAmmount } = unreadMessage.actions;
export default unreadMessage.reducer;
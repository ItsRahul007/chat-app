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

            const allUnread = {...state};
            localStorage.setItem("unread", JSON.stringify(allUnread));
            return state;
        },

        removeUnreadMsgAmmount(state, action){
            const newState = {...state};
            delete newState[action.payload];
            localStorage.setItem("unread", JSON.stringify(newState));
            return newState;
        },

        getAllUnreadMsg(){
            const stringAllUnread = localStorage.getItem("unread");
            if(stringAllUnread){
                const parsed = JSON.parse(stringAllUnread);
                return parsed;
            };
        }
    }
});

export const { addUnreadMsgAmmount, removeUnreadMsgAmmount, getAllUnreadMsg } = unreadMessage.actions;
export default unreadMessage.reducer;
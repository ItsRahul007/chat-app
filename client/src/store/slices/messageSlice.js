import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'message-slice',
    initialState: {},
    reducers: {
        // Storing messages in state
        setMessage(state, action) {
            const { keyId, id, msg, msgId } = action.payload;
            state[keyId] = [...(state[keyId] || []), { id, msg, msgId }];
        },

        // Filtering through the message id and remove it
        dltMessage(state, action) {
            const { keyId, msgId } = action.payload;
            const personChat = state[keyId];
            if (personChat) {
                const updatedChat = personChat.filter(message => message.msgId !== msgId);
                state[keyId] = updatedChat;
            }
        },

        // Updating the message with the new one
        updateMessage(state, action) {
            const { keyId, msgId, newContent } = action.payload;
            const personChat = state[keyId];
            if (personChat) {
                const updatedChat = personChat.map(message => {
                    if (message.msgId === msgId) {
                        return { ...message, msg: newContent };
                    }
                    return message;
                });
                state[keyId] = updatedChat;
            }
        },

        // Removing the whole chat
        deleteWholeChat(state, action) {
            const { keyId, msgId } = action.payload;
            return state[keyId].filter(e => e.msgId !== msgId);
        }
    }
});

export const { setMessage, dltMessage, updateMessage, deleteWholeChat } = messageSlice.actions;
export default messageSlice.reducer
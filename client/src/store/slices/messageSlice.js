import { createSlice } from "@reduxjs/toolkit";

// Deleting a message from local storage
function deleteMessageFromLocalStorage(keyId, msgId) {
    const userId = localStorage.getItem("userId");
    const localMessage = localStorage.getItem(userId);
    if (localMessage) {
        const parsedMsg = JSON.parse(localMessage);
        const messages = parsedMsg[keyId];
        if (messages) {
            const updateLocalChat = messages.filter(msg => msg.msgId !== msgId);
            parsedMsg[keyId] = updateLocalChat;
            localStorage.setItem(userId, JSON.stringify(parsedMsg));
        }
    };
};

// Update local messages
function updateLocalMessages(keyId, msgId, newContent) {
    const userId = localStorage.getItem("userId");
    const localMessage = localStorage.getItem(userId);
    if (localMessage) {
        const parsedMsg = JSON.parse(localMessage);
        const personChat = parsedMsg[keyId];
        const updatedChat = personChat.map(message => {
            if (message.msgId === msgId) {
                return { ...message, msg: newContent };
            }
            return message;
        });
        parsedMsg[keyId] = updatedChat;
        localStorage.setItem(userId, JSON.stringify(parsedMsg));
    };
};

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
            };
            deleteMessageFromLocalStorage(keyId, msgId)
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
            };
            updateLocalMessages(keyId, msgId, newContent);
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
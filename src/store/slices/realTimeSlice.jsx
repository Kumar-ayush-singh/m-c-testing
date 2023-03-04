import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onlineUsers: {},
    chatNotifications: {}
}

const realTimeSlice = createSlice({
    name: "realTime",
    initialState: initialState,
    reducers: {
        setOnlineUsers: (state, { payload }) => {
            state.onlineUsers = payload;
        },
        addOnlineUser: (state, { payload }) => {
            state.onlineUsers[payload] = true;
            console.log(`${payload} is now online`);
        },
        removeOfflineUser: (state, { payload }) => {
            const { [payload]: value, ...removedOfflineUsers } = state.onlineUsers;
            state.onlineUsers = removedOfflineUsers;
            console.log(`${payload} gone offline`);
        },
        setChatNotification: (state, { payload }) => {
            if(payload.dataFromDB){
                if(state.chatNotifications[payload.chatId]){
                    return;
                }
                state.chatNotifications[payload.chatId] = {
                    newMsgCount: payload.newMsgCount,
                    lastMessage: payload.lastMessage,
                    lastViewedMessage: payload.lastViewedMessage,
                }
            }
            else if(state.chatNotifications[payload.chatId]){
                const numb = JSON.stringify(state.chatNotifications[payload.chatId].newMsgCount);
                state.chatNotifications[payload.chatId].newMsgCount = Number(numb) + 1;
                state.chatNotifications[payload.chatId].lastMessage = payload;
            }
            else{
                state.chatNotifications[payload.chatId] = {
                    newMsgCount: 1,
                    lastMessage: payload,
                }
            }
        },
        removeChatNotification: (state, { payload }) => {
            state.chatNotifications[payload].newMsgCount = 0;
        },
        updateLastMessage: ( state, { payload }) => {
            state.chatNotifications[payload.chatId].lastMessage = {
                _id: payload._id,
                senderId: payload.senderId,
                text: payload.text,
            }
        },
        updateViewedMessage: ( state, { payload } ) => {
            state.chatNotifications[payload].lastViewedMessage = JSON.parse(JSON.stringify(state.chatNotifications[payload].lastMessage));
        }
    }
})

export const { setOnlineUsers, addOnlineUser, removeOfflineUser, setChatNotification, removeChatNotification, updateViewedMessage, updateLastMessage } = realTimeSlice.actions;
export default realTimeSlice.reducer;
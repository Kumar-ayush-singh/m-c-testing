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

            const index = state.onlineUsers.indexOf(payload);
            if(index > -1){
                state.onlineUsers.splice(index, 1);
            }
            console.log(`${payload} gone offline`);
        },
        setChatNotification: (state, { payload }) => {
            if(state.chatNotifications[payload.chatId]){
                (state.chatNotifications[payload.chatId].newMsgCount)++;
                state.chatNotifications[payload.chatId].lastMessage = payload.text;
            }
            else{
                state.chatNotifications[payload.chatId] = {
                    newMsgCount: 0,
                    lastMessage: payload.text,
                }
            }
        },
        removeChatNotification: (state, { payload }) => {
            delete state.chatNotifications[payload];
        }
    }
})

export const { setOnlineUsers, addOnlineUser, removeOfflineUser, setChatNotification, removeChatNotification } = realTimeSlice.actions;
export default realTimeSlice.reducer;
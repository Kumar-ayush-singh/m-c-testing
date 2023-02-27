import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userPageSlice";
import chatSlice from "./slices/chatSlice";
import chatNavSlice from "./slices/chatNavSlice";
import realTimeSlice from "./slices/realTimeSlice";


export const store = configureStore({
  reducer: {
    chat: chatSlice,
    user: userSlice,
    chatNav: chatNavSlice,
    realTime: realTimeSlice,
  },
});

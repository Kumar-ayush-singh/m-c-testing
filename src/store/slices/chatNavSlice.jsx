import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatSection: "recentChats",
};


const chatNavSlice = createSlice({
  name: "chatNav",
  initialState: initialState,
  reducers: {
      setChatSection(state, {payload}){
        state.chatSection = payload;
      }
  }
});

export const {setChatSection} = chatNavSlice.actions; 
export default chatNavSlice.reducer;

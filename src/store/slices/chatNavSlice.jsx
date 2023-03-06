import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatSection: "recentChats",
  mobileViewSection: "chatBody"
};


const chatNavSlice = createSlice({
  name: "chatNav",
  initialState: initialState,
  reducers: {
      setChatSection(state, {payload}){
        state.chatSection = payload;
      },
      setMobileViewSection( state, { payload } ){
        state.mobileViewSection = payload;
      }
  }
});

export const {setChatSection, setMobileViewSection} = chatNavSlice.actions; 
export default chatNavSlice.reducer;

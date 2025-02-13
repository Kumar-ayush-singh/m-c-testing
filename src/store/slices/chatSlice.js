import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allChats: [], //[{_id, members[], newMessage, status}]
  currentChat: {
    Id: "",
    messages: [],
    receiverName: "",
    receiverId: "",
  }
};

//for adding classes to aggange message in ui
const arrangeMessages = (messages, userId, addedNewMessage) => {

  if(!messages.length){
    return;
  }

  let i=0;
  if(addedNewMessage){
    i=messages.length-1;
  }

  for(i; i<messages.length; i++){

    let messageSide = " left";
    if(messages[i].senderId === userId){
      messageSide = " right";
    }

    messages[i].classes= messageSide;

    if(i && messages[i-1].classes.includes(messageSide)){
      messages[i].classes += " end";

      if(messages[i-1].classes.includes(" end")){
        messages[i-1].classes += " start";
      }
    }
    else{
      messages[i].classes += " start";
      if(i && messages[i-1].classes.includes(" end")){
        messages[i-1].classes = messages[i-1].classes.replace(" start", " ");
      }
    }

    console.log(addedNewMessage + ` ${i}`);
  }
}

export const startConversation = createAsyncThunk(
  "chat/startConversation",
  async (payload, thunkApi) => {

    console.log("settig Chat id : " + payload.chatId);
    console.log(payload);

    try{
      const res = await axios.get(
        `http://localhost:3000/api/message/${payload.chatId}`
      );

      console.log("got all message");
      return {
        messages: res.data,
        userId: payload.userId,
        chatId: payload.chatId
      }
    } catch(e){
      console.log(e.message);
      return thunkApi.rejectWithValue(e.message);
    }
  }
);


const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    addChatMessage: (state, { payload }) => {
      console.log("chat message");
      console.log(payload);
      state.currentChat.messages.push(payload.message);
      arrangeMessages(state.currentChat.messages, payload.userId , true);
    },
    setCurrentReceiver: (state, { payload }) => {
      console.log(`current co-chater is ${payload.name} with id : ${payload.Id}` );
      state.currentChat.receiverName = payload.name;
      state.currentChat.receiverId = payload.Id;
    },
    setAllChats: (state, { payload }) => {
      state.allChats = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startConversation.fulfilled, (state, { payload }) => {
        state.currentChat.messages = payload.messages;
        state.currentChat.Id = payload.chatId;
        arrangeMessages(state.currentChat.messages, payload.userId);
      })
  }
});


export const { setChatId, setCurrentReceiver, addChatMessage, setAllChats} = chatSlice.actions;
export default chatSlice.reducer;

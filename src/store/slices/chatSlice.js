import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL, PORT } from "../../util/hostDetails";
import { getToken } from "../../util/localStorage";
import { logOutUser } from "./userPageSlice";

const initialState = {
  allChats: [],
  allUsers: [],
  newChat: null,
  currentChat: {
    Id: "",
    messages: [],
    otherMember: {},
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
  }
}

export const startConversation = createAsyncThunk(
  "chat/startConversation",
  async (payload, thunkApi) => {

    console.log("settig Chat id : " + payload.chatId);
    console.log(payload);

    try{
      const token = getToken();
      if(!token){
        thunkApi.dispatch(logOutUser());
        return thunkApi.rejectWithValue("401");
      }
      const res = await axios.get(
        `${HOST_URL}/api/message/${payload.chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
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
      state.currentChat.otherMember.name = payload.name;
      state.currentChat.otherMember._id = payload.Id;
      state.currentChat.otherMember.avatar = payload.avatar;
    },
    setAllChats: (state, { payload }) => {
      state.allChats = payload;
    },
    moveChatToTop: (state, { payload }) => {
      let chatToMove;
      const AllShiftedChat = state.allChats.filter((chat) => {
        if(chat._id !== payload.chatId){
          return true;
        }
        else{
          chatToMove = {...chat};
        }
      });

      if(!chatToMove){
        //only used to refresh recent chat when message come from new chat
        state.newChat = payload.chatId;
        return;
      }

      AllShiftedChat.splice(0, 0, chatToMove);
      state.allChats = AllShiftedChat;
    },
    closeChat: (state, { payload }) => {
      state.currentChat.Id = "";
      state.currentChat.messages = [];
      state.currentChat.otherMember = {};
    },
    setAllUsers: (state, {payload}) => {
      state.allUsers = payload;
    }
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


export const { setChatId, setCurrentReceiver, addChatMessage, setAllChats, moveChatToTop, closeChat, setAllUsers} = chatSlice.actions;
export default chatSlice.reducer;

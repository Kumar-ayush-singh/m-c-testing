import axios from "axios";
import React, { useEffect, useState } from "react";
import dummuPic from "../../assets/dummy-pic.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentReceiver, startConversation } from "../../../../store/slices/chatSlice";
import StyledCard from "../../../../components/functional/styledCard";
import { removeChatNotification, setChatNotification, updateViewedMessage } from "../../../../store/slices/realTimeSlice";
import socket from "../../../../util/socket.io";



const ChatCard = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);
  const { currentChat } = useSelector(store => store.chat);
  const { onlineUsers, chatNotifications } = useSelector(store => store.realTime);
  
  const setChatIdInStore = () => {
    //remove unread tag if user click second time
    if(chatNotifications[props.chat._id] && chatNotifications[props.chat._id].newMsgCount === 0){
      dispatch(updateViewedMessage(props.chat._id));
    }
    dispatch(setCurrentReceiver({
      name: props.chat.otherMember.name,
      Id: props.chat.otherMember._id,
    }));
    dispatch(startConversation({"chatId": props.chat._id, "userId": user.userId}));
    
    if(chatNotifications[props.chat._id] && chatNotifications[props.chat._id].newMsgCount){
      dispatch(removeChatNotification(props.chat._id));
      socket.emit("message-viewed", props.chat._id, props.chat.lastMessage._id, (res) => {
        console.log(`Viewed message id is send to server and get response status ${res.status}`);
      })
    }
  }


  useEffect(() => {
    if(props.chat.lastMessage){
      dispatch(setChatNotification({
        chatId: props.chat._id,
        lastMessage: props.chat.lastMessage,
        newMsgCount: (props.chat.lastMessage.senderId !== user.userId) ? props.chat.unreadMsgCount : 0,
        lastViewedMessage: props.chat.lastViewedMessage,
        dataFromDB: true,
      }));
    }
    console.warn(`running use effect of chat card`);
  }, [props.chat.lastMessage]);

  const isChatOpen = props.chat._id === currentChat.Id;

  return (
    <StyledCard>
      <div className={(isChatOpen ? "active" : "") + " card"} onClick={setChatIdInStore}>
        <div className="img-notification-container">
          <img src={dummuPic} alt="" />
          {
            chatNotifications[props.chat._id] &&
            chatNotifications[props.chat._id].newMsgCount >= 1 ?
            <div>{chatNotifications[props.chat._id].newMsgCount}</div>
            :
            null
          }
        </div>
        <div className="card-info new-message">
          <h5>{props.chat.otherMember.name}</h5>
          {
            chatNotifications[props.chat._id] &&
            chatNotifications[props.chat._id].lastMessage.text ?
            <span>{chatNotifications[props.chat._id].lastMessage.text}</span>
            :
            null
          }
        </div>
        <span className={ onlineUsers[props.chat.otherMember._id] ? "online" : "offline"}></span>
      </div>
    </StyledCard>
  );
};

export default ChatCard;

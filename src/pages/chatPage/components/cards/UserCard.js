import axios from "axios";
// import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StyledCard from "../../../../components/functional/styledCard";
import { startConversation, setCurrentReceiver } from "../../../../store/slices/chatSlice";
import { setChatSection, setMobileViewSection } from "../../../../store/slices/chatNavSlice";
import { HOST_URL } from "../../../../util/hostDetails";
import { getToken } from "../../../../util/localStorage";
import { logOutUser } from "../../../../store/slices/userPageSlice";
import getAvatarSvg from "../../../../util/allAvatar";
import { removeChatNotification, setChatNotification } from "../../../../store/slices/realTimeSlice";


const UserCard = ({ name, Id, avatar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { onlineUsers, chatNotifications } = useSelector(store => store.realTime);
  const { currentChat } = useSelector(store => store.chat);

  
  const createChat = async () => {
    try {
      const token = getToken();
      if(!token){
        dispatch(logOutUser());
      }
      console.log(user)
      const { data } = await axios.post(`${HOST_URL}/api/chat`, {
        senderId: user.userId,
        receiverId: Id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      dispatch(startConversation({chatId: data._id, userId: user.userId}));
      dispatch(setChatNotification({
        chatId: data._id,
        dataFromDB: true,
        newMsgCount: 0,
        lastMessage: {},
        lastViewedMessage: {}
      }))
      dispatch(setChatSection("recentChats"));
      dispatch(setCurrentReceiver({
        name: name,
        Id: Id,
        avatar: avatar
      }));
      dispatch(setMobileViewSection("currentChatContainer"));

      //removing noficication of current chat
      if(chatNotifications[currentChat.Id] && chatNotifications[currentChat.Id].newMsgCount === 0){
        dispatch(removeChatNotification(currentChat.Id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledCard>
      <div className="card" onClick={createChat}>
        <div className="img-notification-container">
          <img src={getAvatarSvg(avatar)} alt="" />
        </div>
        <div className="card-info">
          <h5>{name}</h5>
        </div>
        <span className={ onlineUsers[Id] ? "online" : "offline"}></span>
      </div>
    </StyledCard>
  );
};



export default UserCard;

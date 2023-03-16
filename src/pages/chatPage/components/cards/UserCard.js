import axios from "axios";
// import React, { useEffect, useState } from "react";
import dummuPic from "../../assets/dummy-pic.jpeg";
import { useSelector, useDispatch } from "react-redux";
import StyledCard from "../../../../components/functional/styledCard";
import { startConversation, setCurrentReceiver } from "../../../../store/slices/chatSlice";
import { setChatSection, setMobileViewSection } from "../../../../store/slices/chatNavSlice";
import { HOST_URL, PORT } from "../../../../util/hostDetails";
import { getToken } from "../../../../util/localStorage";
import { logOutUser } from "../../../../store/slices/userPageSlice";
import getAvatarSvg from "../../../../util/allAvatar";


const UserCard = ({ name, Id, avatar }) => {
  console.log(name + " : " + Id);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { onlineUsers } = useSelector(store => store.realTime);
  const { receiverId } = useSelector(store => store.chat.currentChat);
  console.log(useSelector(store => store));

  
  const createChat = async () => {
    try {
      const token = getToken();
      if(!token){
        dispatch(logOutUser());
      }
      console.log(user)
      const { data } = await axios.post(`${HOST_URL}:${PORT}/api/chat`, {
        senderId: user.userId,
        receiverId: Id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      dispatch(startConversation({chatId: data._id, userId: user.userId}));
      dispatch(setChatSection("recentChats"));
      dispatch(setCurrentReceiver({
        name: name,
        Id: Id,
      }));
      dispatch(setMobileViewSection("currentChatContainer"));
      console.log(data);
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

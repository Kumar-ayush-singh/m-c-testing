import axios from "axios";
// import React, { useEffect, useState } from "react";
import dummuPic from "../../assets/dummy-pic.jpeg";
import { useSelector, useDispatch } from "react-redux";
import StyledCard from "../../../../components/functional/styledCard";
import { startConversation, setCurrentReceiver } from "../../../../store/slices/chatSlice";
import { setChatSection } from "../../../../store/slices/chatNavSlice";


const UserCard = ({ name, Id }) => {
  console.log(name + " : " + Id);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { onlineUsers } = useSelector(store => store.realTime);
  const { receiverId } = useSelector(store => store.chat.currentChat);
  console.log(useSelector(store => store));

  
  const createChat = async () => {
    try {
      console.log(user)
      const { data } = await axios.post("http://localhost:3000/api/chat", {
        senderId: user.userId,
        receiverId: Id,
      });
      
      dispatch(startConversation({chatId: data._id, userId: user.userId}));
      dispatch(setChatSection("recentChats"));
      dispatch(setCurrentReceiver({
        name: name,
        Id: Id,
      }));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledCard>
      <div className="card" onClick={createChat}>
        <div className="img-notification-container">
          <img src={dummuPic} alt="" />
        </div>
        <div className="card-info">
          <h5>{name}</h5>
        </div>
        <span className={ onlineUsers[receiverId] ? "connection-status online" : "connection-status"}></span>
      </div>
    </StyledCard>
  );
};



export default UserCard;

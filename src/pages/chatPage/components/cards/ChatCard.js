import axios from "axios";
import React, { useEffect, useState } from "react";
import dummuPic from "../../assets/dummy-pic.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentReceiver, startConversation } from "../../../../store/slices/chatSlice";
import StyledCard from "../../../../components/functional/styledCard";



const ChatCard = (props) => {
  const dispatch = useDispatch();
  const [otherMember, setOtherMemeber] = useState({name: "", Id: ""});
  const { user } = useSelector(store => store.user);
  const { currentChat } = useSelector(store => store.chat);
  const { onlineUsers, chatNotifications } = useSelector(store => store.realTime);

  const getUser = async () => {
    const otherUser = props.members[0] === user.userId ? props.members[1] : props.members[0];
    const { data } = await axios.get(
      `http://localhost:3000/api/user/update-user/${otherUser}`
    );
    setOtherMemeber({name: data.name, Id: otherUser});
  };
  
  const setChatIdInStore = () => {
    console.warn(otherMember.name + " receiver name and id id " + otherMember.Id);
    dispatch(setCurrentReceiver({
      name: otherMember.name,
      Id: otherMember.Id,
    }));
    dispatch(startConversation({"chatId": props.chatId, "userId": user.userId}));
  }


  useEffect(() => {
    getUser();
  }, []);

  const isChatOpen = props.chatId === currentChat.Id;

  return (
    <StyledCard>
      <div className={(isChatOpen ? "active" : "") + " card"} onClick={setChatIdInStore}>
        <div className="img-notification-container">
          <img src={dummuPic} alt="" />
          {
            chatNotifications[props.chatId].newMsgCount > 1 ?
            <div>{chatNotifications[props.chatId].newMsgCount}</div>
            :
            null
          }
        </div>
        <div className="card-info new-message">
          <h5>{otherMember.name}</h5>
          {
            chatNotifications[props.chatId].lastMessage ?
            <span>{chatNotifications[props.chatId].lastMessage}</span>
            :
            null
          }
        </div>
        <span className={ onlineUsers[otherMember.Id] ? "connection-status online" : "connection-status"}></span>
      </div>
    </StyledCard>
  );
};

export default ChatCard;

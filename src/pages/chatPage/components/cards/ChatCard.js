import axios from "axios";
import React, { useEffect, useState } from "react";
import dummuPic from "../../assets/dummy-pic.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { setReceiverName, startConversation } from "../../../../store/slices/chatSlice";
import StyledCard from "../../../../components/functional/styledCard";



const ChatCard = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState([]);
  const {user} = useSelector(store => store.user);
  const chat = useSelector(store => store.chat);


  const getUser = async () => {
    const otherUser = props.members[0] === user.userId ? props.members[1] : props.members[0];
    const { data } = await axios.get(
      `http://localhost:3000/api/user/update-user/${otherUser}`
    );
    setName(data.name);
    dispatch(setReceiverName(data.name));
  };

  const setChatIdInStore = () => {
    dispatch(startConversation({"chatId": props.chatId, "userId": user.userId}));
  }


  useEffect(() => {
    getUser();
  }, []);

  const isChatOpen = props.chatId === chat.Id;

  return (
    <StyledCard>
      <div className={(isChatOpen ? "active" : "") + " card"} onClick={setChatIdInStore}>
        <div className="img-notification-container">
          <img src={dummuPic} alt="" />
          <div>5</div>
        </div>
        <div className="card-info new-message">
          <h5>{name}</h5>
          <span>Last message from any side</span>
        </div>
        <span className="connection-status online"></span>
      </div>
    </StyledCard>
  );
};

export default ChatCard;

import React, { useEffect } from "react";
import styled from "styled-components";
import ChatBody from "./chatBody";
import CurrentChatMessages from "./CurrentChatMessages";
import { useSelector, useDispatch } from "react-redux";
import socket from "../../util/socket.io";
import { addOnlineUser, removeOfflineUser, setOnlineUsers } from "../../store/slices/realTimeSlice";
import ChatNavBar from "./components/chatNavBar";
// import Navbar from "../../components/helper/Navbar";



const ChatPage = () => {

  const { user } = useSelector( store => store.user );
  const { mobileViewSection } = useSelector( store => store.chatNav);
  const dispatch = useDispatch();

  useEffect( () => {

    function handelConnection(){
      socket.emit("register-connection", {"userId": user.userId, "socketId": socket.id}, (res) => {
        console.log(res);
        dispatch(setOnlineUsers(res.onlineUsers));
      });
    }
    if(socket.connected){
      handelConnection();
    }
    else{
      socket.on("connect", () => {
        handelConnection();
      })
    }

    //for handelling user connection and disconnection
    socket.on("new-user-connected", (userId) => {
      dispatch(addOnlineUser(userId));
    });
    socket.on("user-disconnected", (userId) => {
      dispatch(removeOfflineUser(userId));
    });

    return () => {
      socket.off("connect");
      socket.off("register-connection");
      socket.off("new-user-connected");
      socket.off("user-disconnected");
    }
  }, []);

  return (
    <>
      {/* <Navbar/> */}
      <Wrapper>
        <div className={(console.warn(mobileViewSection) || mobileViewSection === "currentChatContainer" ? 
            "show-current-message-container " : "") + "container"
          }
        >
          <nav>
            <ChatNavBar/>
          </nav>

          <div className="chat-container">
              <ChatBody/>
          </div>
          <div className="current-chat-container">
            <CurrentChatMessages />
          </div>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
 --thm-svg-color: #9e9e9e;
 --thm-svg-active-color: var(--thm-primary-color); 

  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  *{
    color: white;
  }

  .container {
    display: flex;
    height: 100%;
    width: 100%;
    transition: 0.2s ease;

    @media (max-width: 950px){
      overflow: hidden;
      display: grid;
      grid-template-columns: 0.75fr 1fr;
      grid-auto-rows: 100%;
    }
    @media (max-width: 750px){
      position: absolute;
      top: 0;
      left: 0;
      grid-template-columns: 1fr 1fr;
      width: 200%;
    }

    &.show-current-message-container{
      @media( max-width: 750px){
        left: -100%;
      }
    }

    &>nav{
      height: 100%;
      @media (max-width: 950px){
        display: none;
      }
    }

    .chat-container {
      flex-basis: 400px;
      width: 400px;
      min-width: 350px;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;

      @media (max-width: 950px){
        width: 100%;
        grid-area: 1/1/2/2;
      }
    }

    .current-chat-container {
      width: calc(100% - 80px - 400px);
      min-width: 350px;
      height: 100%;

      @media (max-width: 950px){
        width: 100%;
        grid-area: 1/2/2/3;
      }
    }
  }
`;


export default React.memo(ChatPage);
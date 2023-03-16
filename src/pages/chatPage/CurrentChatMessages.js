import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Message from "./components/Message";
import { addChatMessage, closeChat, moveChatToTop, setCurrentReceiver } from "../../store/slices/chatSlice";
import { setChatNotification, removeChatNotification, updateViewedMessage, updateLastMessage } from "../../store/slices/realTimeSlice";
import { FaPaperclip } from "react-icons/fa";
import { MdDelete, MdSend } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import WelcomeCard from "./components/cards/WelcomeCard";
import socket from "../../util/socket.io";
import UnreadTag from "./components/cards/unreadTag";
import { IoIosArrowRoundBack } from "react-icons/io";
import { setMobileViewSection } from "../../store/slices/chatNavSlice";


const CurrentChat = () => {
  const { Id: chatId, messages, otherMember } = useSelector((store) => store.chat.currentChat);
  const { user } = useSelector((store) => store.user);
  const { onlineUsers, chatNotifications } = useSelector(store => store.realTime);
  const dispatch = useDispatch();
  const textarea = useRef(null);
  const messageContainer = useRef(null);


  const [msg, setMsg] = useState("");
  const [isMessagesScrolled, setIsMessagesScrolled] = useState(true);

  const handlMsgeSubmit = async () => {

    if(msg.trim().length === 0){
      setMsg("");
      return;
    }

    try {
      // const { data } = await axios.post("http://localhost:3000/api/message/", {
      //   chatId: chatId,
      //   senderId: user.userId,
      //   text: msg,
      // });

      console.log(otherMember.name + " is receiver name " + otherMember._id + " is receiver id ");

      socket.emit("client-send-msg", {
        chatId: chatId,
        senderId: user.userId,
        receiverId: otherMember._id,
        text: msg,
      }, (res)=>{
        if(res.status != 200){
          throw Error(res.error);
        }
        console.log(res.data.text + " >>>> is reached to server ");
        dispatch(addChatMessage({
          message: { ...(res.data) },
          userId: user.userId
        }));
        dispatch(updateLastMessage({ ...res.data }));

        //remove unred msg tag
        dispatch(updateViewedMessage(chatId));
        dispatch(moveChatToTop({chatId: chatId}));
      })
      setMsg("");
    } catch (error) {
      console.log(error);
      //remove unred msg tag
      dispatch(updateViewedMessage(chatId));
    }
  };

  function handelScroll(e) {
    const isfullyScrolled = (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight);
    setIsMessagesScrolled(isfullyScrolled);
  }


  useEffect( () => {
    socket.on("server-send-msg", (message) => {
      console.log(message.senderId + " and receiver id is " + otherMember._id);
      if(message.chatId === chatId){
        dispatch(addChatMessage({message: {...message}, userId: user.userId}));
        dispatch(updateLastMessage({...message}));
        dispatch(updateViewedMessage(chatId));
        socket.emit("message-viewed", chatId, message._id, (res)=> {
          console.log("message is viewed in current message with status " + res.status);
        });
      }
      else{
        dispatch(setChatNotification({...message}));
      }

      //sending this chat card at top of chat card stack
      dispatch(moveChatToTop({chatId: message.chatId}));
    });

    return () => {
      socket.off("server-send-msg");
    }
  }, [chatId]);

  useEffect( () => {
    if(messageContainer.current){
      messageContainer.current.scrollTo(0, messageContainer.current.scrollHeight);
    }

  }, [messages]);

  // useEffect( ()=> {
  //   console.error(textarea);
  //   if(textarea.current){
  //     textarea.current.focus();
  //   }
  //   window.navigator.vibrate(1000);
  // })


  return (
    <>
      {
        chatId === "" ? (
          <WelcomeCard />
        ) 
        : 
        (
          <Wrapper>
            <div className="head">
              <div className="userInfo-container">
                <div className="back-container" onClick={()=>{
                  dispatch(setMobileViewSection("chatBody"));
                  dispatch(closeChat());
                }}>
                  <IoIosArrowRoundBack/>
                  <div className="img-container">
                    <img src="userpic" alt="chat user" />
                  </div>
                </div>
                <div>
                  <span>{otherMember.name}</span>
                  {
                    onlineUsers[otherMember._id] ? 
                    <span>Online</span> : null
                  }
                </div>
              </div>
              <div className="functionality-container">
                <ul>
                  <li>
                    <FaPaperclip />
                  </li>
                  <li>
                    <MdDelete />
                  </li>
                </ul>

                <div className="close-message" onClick={()=>{
                  dispatch(setCurrentReceiver({
                    name: "",
                    Id: "",
                  }));
                  dispatch(closeChat());
                }}>
                  <TiDeleteOutline />
                </div>
              </div>
            </div>
            <div className="background-container">
              <div className={(isMessagesScrolled ? "" : "scrolling-down") + " messages custom-scroll"}
                ref={messageContainer}
                onScroll={(e) => handelScroll(e)}
              >
                {messages.length > 0 ? (
                  (chatNotifications[chatId] && chatNotifications[chatId].lastViewedMessage) &&
                  !(chatNotifications[chatId].lastViewedMessage._id === chatNotifications[chatId].lastMessage._id ||
                  chatNotifications[chatId].lastMessage.senderId === user.userId) ?
                  
                  messages.map((message, i) => {
                    return (
                      <>
                      {
                        chatNotifications[chatId].lastViewedMessage._id === message._id ?
                        <>
                          <Message key={i} message={message} />
                          <UnreadTag/>
                        </>
                        :
                        <Message key={i} message={message} />
                      }
                      </>
                    )
                  })
                  :
                  messages.map((message, i) => {
                    return (<Message key={i} message={message} />);
                  })
                ) : (
                  <h2 className="msg-404">
                    No messages found.
                  </h2>
                )}
              </div>

              <div className="text-editor">
                <div className="wrap-auto-resize">
                  <div className="textarea-cpy">{msg + " "}</div>
                  <textarea
                    className="custom-scroll"
                    name="message"
                    rows="1"
                    placeholder="write your message here"
                    focus="true"
                    ref={textarea}
                    value={msg}
                    onChange={ (e) => setMsg(e.target.value) }
                    virtualkeyboardpolicy="manual"
                    onClick={ () => {
                      textarea.current.removeAttribute("virtualkeyboardpolicy");
                      // textarea.current.setAttribute("virtualkeyboardpolicy", "manual");
                      // textarea.current.inputMode="null";
                      // navigator.virtualKeyboard.show();
                    } }
                    onBlur={
                      (e)=>{
                        e.currentTarget.focus();
                      }
                    }
                    autoFocus
                  ></textarea>
                </div>
                <div>
                  <button onClick={handlMsgeSubmit}>
                    <MdSend/>
                  </button>
                </div>
              </div>
            </div>
          </Wrapper>
        )
      }
    </>
  );
};

const Wrapper = styled.section`
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 450px){
    padding: 20px 10px 10px 10px;
  }
  
  
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;

    @media ( max-width: 950px ){
      margin-top: -20px;
    }

    .userInfo-container{
      display: flex;
      gap: 15px;
      width: 100%;

      .back-container{
        display: flex;
        align-items: center;

        
        &>svg{
          height: 35px;
          width: 35px;
          
          @media (min-width: 750px){
            display: none;
          }
        }
      }

      .img-container{
        width: 60px;
        height: 60px;
        background-color: yellow;
        border-radius: 50%;

        img{
          width: 100%;
          border-radius: 50%;
        }
      }

      &>div:last-child{
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: none;
        overflow: hidden;

        &>span:first-child{
          font-weight: bold;
          font-size: 20px;
          text-overflow: ellipsis;
          overflow: hidden;

          &+span{
            font-size: 10px;
            font-style: italic;
            color: #d5d5d5;
          }
        }
      }
    }

    .functionality-container{
      display: flex;
      display: none;
      gap: 40px;
      align-items: center;
      justify-content: space-between;

      ul{
        display: flex;
        list-style: none;
        gap: 20px;
  
        // li{
        //   margin: 10px;
        // }
        svg{
          width: 20px;
          height: 20px;
        }
      }

      .close-message{
        svg{
          width: 30px;
          height: 30px;
        }
      }

      svg{
        transform: scale(1);
        transition: 0.2s ease;
      }
      li, .close-message{
        &:hover svg{
          transform: scale(1.2);
        }
      }
    }
  }


  .background-container{
    background-color: var(--thm-transparent-color);
    border-radius: 10px;
    padding: 10px 40px;
    height: calc(100% - 100px);
    display: flex;
    gap: 10px;
    flex-direction: column;
    overflow: hidden;  

    @media (max-width: 950px){
      height: calc(100% - 80px);
      padding: 10px 20px;
    }

    @media (max-width: 450px){
      padding: 10px;
    }


    .messages {
      height: calc(100% - 100px);
      flex-shrink: 1;
      flex-grow: 1;
      position: relative;
      margin-right: -20px;

      @media (max-width: 450px){
        margin-right: -5px;
      }

      .msg-404{
        height: 100%;
        width: 100%;
        margin: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        color: var(--thm-transparent-color);
      }


      &.scrolling-down + .text-editor::before{
        opacity: 1;
      }
    }

    

    .text-editor {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-shrink: 0;
      flex-grow: 0;
      padding: 10px 0px;
      position: relative;
      gap: 10px;

      @media (max-width: 450px){
        padding: 0;
      }

      //for shadow below msg container
      &::before{
        --height: 10px;
        content: "";
        display: block;
        position: absolute;
        top: calc(-10px - var(--height));
        left: -50%;
        width: 200%;
        height: var(--height);
        background: linear-gradient(0deg,var(--thm-background-color), transparent);
        opacity: 0;
        pointer-event: none;
        transition: 0.15s ease;
      }

      
      &>.wrap-auto-resize{
        width: 100%;
        min-height: 40px;
        display: grid;
        padding: 8px;
        border-radius: 8px;
        border: 1px solid var(--thm-primary-color);
        flex-grow: 1;
        flex-shrink: 1;

        &>.textarea-cpy{
          white-space: pre-wrap;
          word-break: break-word;
          visibility: hidden;
        }

        &>textarea, &>.textarea-cpy {
          width: calc(100% + 10px);
          min-height: 100%;
          max-height: 6.2em;
          margin-right: -8px; //equal to parent padding
          border: none;
          outline: none;
          background-color: transparent;
          font-size: 15px;
          line-height: 1.25em;
          resize: none;
          grid-area: 1/1/2/2;
        }
        &>textarea::placeholder{
          color: var(--thm-transparent2-color);
        }
      }
      
      
      &>div:last-child{
        display: flex;
        flex-shrink: 0;
        flex-grow: 0;
        justify-content: center;
        align-items: center;
        
        button {
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          background-color: var(--thm-secondary-color);
          border: none;
          outline: none;
          border-radius: 8px;

          &>svg{
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
  

`;
export default React.memo(CurrentChat);

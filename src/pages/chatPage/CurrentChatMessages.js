import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Message from "./components/Message";
import { addChatMessage, setCurrentReceiver } from "../../store/slices/chatSlice";
import { setChatNotification, removeChatNotification } from "../../store/slices/realTimeSlice";
import { FaPaperclip } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import WelcomeCard from "./components/cards/WelcomeCard";
import socket from "../../util/socket.io";


const CurrentChat = () => {
  const { Id: chatId, messages, receiverName, receiverId } = useSelector((store) => store.chat.currentChat);
  const { user } = useSelector((store) => store.user);
  const { onlineUsers } = useSelector(store => store.realTime);
  const dispatch = useDispatch();
  const textarea = useRef(null);
  const messageConteiner = useRef(null);


  const [msg, setMsg] = useState("");
  const [isMessagesScrolled, setIsMessagesScrolled] = useState(true);

  const handlMsgeSubmit = async () => {
    try {
      // const { data } = await axios.post("http://localhost:3000/api/message/", {
      //   chatId: chatId,
      //   senderId: user.userId,
      //   text: msg,
      // });

      console.log(receiverName + " is receiver name " + receiverId + " is receiver id ");

      socket.emit("client-send-msg", {
        chatId: chatId,
        senderId: user.userId,
        receiverId: receiverId,
        text: msg,
      }, (res)=>{
        if(res.error){
          throw Error(res.error);
        }
        console.log(res.text + " >>>> is reached to server ");
        dispatch(addChatMessage({
          message: { ...res },
          userId: user.userId
        }));
      })
      setMsg("");
      messageConteiner.current.scrollTo(0, messageConteiner.current.scrollHeight);
    } catch (error) {
      console.log(error);
    }
  };

  function handelScroll(e) {
    const isfullyScrolled = (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight);
    setIsMessagesScrolled(isfullyScrolled);
  }


  useEffect( () => {
    socket.on("server-send-msg", (message) => {
      if(message.senderId === receiverId){
        dispatch(addChatMessage({message: {...message}, userId: user.userId}));
      }
      else{
        dispatch(setChatNotification({...message}));
      }
    });

    dispatch(removeChatNotification(receiverId));

    return () => {
      socket.off("server-send-msg");
    }
  }, [])

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
                <div className="img-container">
                  <img src="userpic" alt="chat user" />
                </div>
                <div>
                  <span>{receiverName}</span>
                  {
                    onlineUsers.receiverId ? 
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
                }}>
                  <TiDeleteOutline />
                </div>
              </div>
            </div>
            <div className="background-container">
              <div className={(isMessagesScrolled ? "" : "scrolling-down") + " messages custom-scroll"}
                ref={messageConteiner}
                onScroll={(e) => handelScroll(e)}
              >
                {messages.length > 0 ? (
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
                  <div className="textarea-cpy">{msg}</div>
                  <textarea
                    className="custom-scroll"
                    name="message"
                    rows="1"
                    placeholder="write your message here"
                    focus="true"
                    ref={textarea}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <button onClick={handlMsgeSubmit}>Send</button>
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
  
  
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;

    .userInfo-container{
      display: flex;
      gap: 15px;

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

        &>span:first-child{
          font-weight: bold;
          font-size: 20px;

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


    .messages {
      height: calc(100% - 100px);
      flex-shrink: 1;
      flex-grow: 1;
      position: relative;

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
      padding: 10px;
      position: relative;

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
        width: calc(100% - 100px);
        display: grid;

        &>.textarea-cpy{
          white-space: pre-wrap;
          word-break: break-word;
          visibility: hidden;
        }

        &>textarea, &>.textarea-cpy {
          width: 100%;
          max-height: 100px;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid var(--thm-primary-color);
          outline: none;
          background-color: transparent;
          font-size: 15px;
          resize: none;
          grid-area: 1/1/2/2;
        }
        &>textarea:placeholder{
          color: var(--thm-transparent2-color);
        }
      }
      
      
      &>div:last-child{
        display: flex;
        justify-content: center;
        align-items: center;
        
        button {
          width: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          background-color: var(--thm-secondary-color);
          border: none;
          outline: none;
          border-radius: 8px;
        }
      }
    }
  }
  

`;
export default React.memo(CurrentChat);

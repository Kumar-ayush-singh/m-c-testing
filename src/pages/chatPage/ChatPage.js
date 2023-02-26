import React from "react";
import styled from "styled-components";
import { BiGroup, BiLogOutCircle, BiUser } from "react-icons/bi";
import { BsFillChatDotsFill } from "react-icons/bs";
import ChatBody from "./chatBody";
import CurrentChatMessages from "./CurrentChatMessages";
import { logOutUser } from "../../store/slices/userPageSlice";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setChatSection } from "../../store/slices/chatNavSlice";
// import Navbar from "../../components/helper/Navbar";




const ChatPage = () => {

  const { chatSection } = useSelector( store => store.chatNav);

  const dispatch = useDispatch();
  function navHandler(pram){
    dispatch(setChatSection(pram));
  }

  return (
    <>
      {/* <Navbar/> */}
      <Wrapper>
        <div className="container">

          <div className="chatNavBar">
            <ul>
              <li className={chatSection === "groupChats" ? "active":""} onClick={() => {
                navHandler("groupChats");
              }}>
                <BiGroup />
              </li>
              <li className={chatSection === "recentChats" ? "active":""} onClick={() => {
                navHandler("recentChats");
              }}>
                <BsFillChatDotsFill />
              </li>
              <li className={chatSection === "searchUsers" ? "active":""} onClick={() => {
                navHandler("searchUsers");
              }}>
                <BiUser />
              </li>
            </ul>
            <div className="high-order-buttons">
              <button className="home">
                <Link to="/">
                  <FaHome/>
                </Link>
              </button>
              <button className="log-out" onClick={logOutUser}>
                <Link to="/">
                  <BiLogOutCircle />
                </Link>
              </button>
            </div>
          </div>

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

  .container {
    display: flex;
    height: 100%;
    width: 100%;

    *{
      color: white;
    }

    .chatNavBar {
      --container-width: 80px;
      width: var(--container-width);
      height: 100vh;
      display: flex;
      align-items: center;
      position: relative;



      ul {
        display: flex;
        flex-direction: column;
        width: 100%;

        li{
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          margin: 10px 0px;
          cursor: pointer;
          position: relative;

          &, *{
            transition: 0.2s ease;
          }

          svg{
            width: var(--container-width);
            height: 30px;
            transform: scale(1);
            transform-origin: center center;
          }

          &.active, &:hover{
            svg{
              transform: scale(1.2);
            }
          }
          
          &.active{
            svg{
              fill: var(--thm-svg-active-color);
            }

            &::after{
              content: "";
              top: 0;
              height: 100%;
            }

          }
          &::after{
            content: "";
            position: absolute;
            display: block;
            background: var(--thm-svg-active-color);
            top: 50%;
            left: 0px;
            width: 5px;
            border-radius: 3px;
            height: 0px;
            transition: 0.2s linear;
          }
        }
      }

      .high-order-buttons{
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: var(--container-width);
        padding: 8px;


        .home{
          width: 100%;
          height: 40px;
          padding: 5px;
          margin-bottom: 5px;
          background: transparent;
          border: none;
          outline: none;
  
          svg{
            height: 100%;
            width: 100%;
            cursor: pointer;

            // @keyframe home-anima{
            //   from{
            //     transform: scale(1);
            //   }
            //   to{
            //     transform: scale(0.8);
            //   }
            // }

            // &:hover{
            //   animation: home-anima 0.5s linear infinite;
            // }
          }
        }

        .log-out{
          height: 40px;
          width: 100%;
          background: #fbd547;
          border-radius: 5px;
          padding: 5px;
          overflow: hidden;
          cursor: pointer;


          svg{
            fill: black;
            height: 100%;
            width: 100%;
            transform: rotate(-180deg);
            transition: 0.15s ease;
          }

          &:hover svg{
            transform: rotate(360deg);
          }
        }

      }
    }

    .chat-container {
      flex-basis: 400px;
      width: 400px;
      height: 100vh;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .current-chat-container {
      width: calc(100% - 80px - 400px);
      height: 100vh;
    }
  }
`;


export default React.memo(ChatPage);
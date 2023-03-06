import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BiGroup, BiLogOutCircle, BiUser } from "react-icons/bi";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setChatSection } from "../../../store/slices/chatNavSlice";
import { logOutUser } from "../../../store/slices/userPageSlice";


export default function ChatNavBar() {
    const { chatSection } = useSelector( store => store.chatNav );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function navHandler(pram){
        dispatch(setChatSection(pram));
      }
      function handleLogout(){
        dispatch(logOutUser());
        navigate('/');
      }

    return (
        <Wrapper className="chatNavBar">
            <ul>
                <li className={chatSection === "groupChats" ? "active" : ""} onClick={() => {
                    navHandler("groupChats");
                }}>
                    <BiGroup />
                </li>
                <li className={chatSection === "recentChats" ? "active" : ""} onClick={() => {
                    navHandler("recentChats");
                }}>
                    <BsFillChatDotsFill />
                </li>
                <li className={chatSection === "searchUsers" ? "active" : ""} onClick={() => {
                    navHandler("searchUsers");
                }}>
                    <BiUser />
                </li>
            </ul>
            <div className="high-order-buttons">
                <button className="home">
                    <Link to="/">
                        <FaHome />
                    </Link>
                </button>
                <button className="log-out" onClick={handleLogout}>
                    <Link to="/">
                        <BiLogOutCircle />
                    </Link>
                </button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.nav`

&.chatNavBar {
    --container-width: 80px;
    width: var(--container-width);
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    @media (max-width: 950px){
        width: 100%;
    }

    ul {
      display: flex;
      flex-direction: column;
      width: 100%;

      @media (max-width: 950px){
        flex-direction: row;
        justify-content: space-between;
      }

      li{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        margin: 10px 0px;
        cursor: pointer;
        position: relative;

        @media (max-width: 950px){
            margin: 0px;
            padding: 10px;
        }

        &, *{
          transition: 0.2s ease;
        }

        svg{
          width: var(--container-width);
          height: 25px;
          transform: scale(1);
          transform-origin: center center;
        }

        &.active, &:hover{
          svg{
            transform: scale(1.2);
          }
        }
        
        &.active{
          @media (max-width: 950px){
            margin-top: -15px;
          }

          svg{
            fill: var(--thm-svg-active-color);
          }

          &::after{
            top: 0;
            height: 100%;

            @media(max-width: 950px){
                height: 3px;
                left: 0;
                top: unset;
                width: 100%;
            }
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


          @media (max-width: 950px){
            top: unset;
            bottom: 0px;
            left: 50%;
            height: 3px;
            width: 0px;
          }
        }
      }
    }

    .high-order-buttons{
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: var(--container-width);
      padding: 8px;

      @media (max-width: 950px){
        display: none;
      }


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
`;
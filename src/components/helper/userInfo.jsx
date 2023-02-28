import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../../store/slices/userPageSlice";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";


export default function UserInfo(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((store) => store.user);
    const [popupClass, setPopupClass] = useState('');

    const logout = () => {
        dispatch(logOutUser());
        navigate("/");
    }
    const togglePopup = () => {
        if(popupClass){
            setPopupClass('');
        }
        else{
            setPopupClass('show');
        }
    }

    return (
        <DropDowncontainer>
            <div className="fixed-container" onClick={togglePopup}>
                <div className="user-info">
                    <span>
                        {user.userName}
                    </span>
                    <span>
                        {user.email}
                    </span>
                </div>
                <div className="userimg-container">
                    <img src="from db" alt="user DP"/>
                </div>
            </div>
            <div className={"popup-container " + popupClass}>
                <ul>
                    <li onClick={logout}>
                        <BiLogOutCircle />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </DropDowncontainer>
    )
}

const DropDowncontainer = styled.label`

    --container-background-color: #fbd547;

    position: relative;
    color: white;
    justify-content: flex-end;
    // background-color: var(--container-background-color);
    border-radius: 8px;
    padding: 10px;
    margin-left: 50px;
    font-weight: bold;

    .fixed-container{
        display: flex;
        gap: 10px;

        .userimg-container{
            border-radius: 50%;
            width: 40px;
            height: 40px;
            overflow: hidden;
            background-color: var(--container-background-color);

            // img{
            //     width: 100%;
            //     height: 100%;
            // }
        }

        .user-info{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: center;


            span:last-child{
                font-size: 10px;
                font-style: italic;
            }
        }
    }


    .popup-container{
        position: absolute;
        background: linear-gradient(var(--thm-primary-color) 1.69%,var(--thm-secondary-color) 63.59%);
        color: white;
        width: 100%;
        max-width: 150px;
        top: calc(100% + 10px);
        right: 0;
        opacity: 0;
        transform: scale(0.2);
        transform-origin: right top;
        transition: 0.15s ease;
        border-radius: 5px;
        box-shadow: 0 2px 5px 0 rgba(var(--shadow-rgb),.26),0 2px 10px 0 rgba(var(--shadow-rgb),.16);
        
        &.show{
            opacity: 1;
            transform: scale(1);
        }

        li{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;

            &::after{
                display: none;
            }

            svg{
                height: 30px;
                width: 30px;
            }
        }
    }


`;
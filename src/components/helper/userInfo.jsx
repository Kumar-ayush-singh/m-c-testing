import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../../store/slices/userPageSlice";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getAvatarSvg from "../../util/allAvatar";


export default function UserInfo(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((store) => store.user);
    const [popupClass, setPopupClass] = useState('');

    const logout = () => {
        dispatch(logOutUser());
        navigate("/");
    }
    const togglePopup = (e) => {
        e.stopPropagation();
        if(popupClass){
            setPopupClass('');
        }
        else{
            setPopupClass('show');
            window.addEventListener('click', ()=>{
                setPopupClass('');
            }, {
                once: true,
            })
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
                    <img src={getAvatarSvg(user.avatar)} alt="user DP"/>
                </div>
            </div>
            <section className={"popup-container " + popupClass}>
                <ul>
                    <li onClick={ () => { navigate("/select-avatar")}}>
                        Avatar
                    </li>
                    <li onClick={logout}>
                        {/* <BiLogOutCircle />
                        <span>Logout</span> */}
                        Logout
                    </li>
                </ul>
            </section>
        </DropDowncontainer>
    )
}

const DropDowncontainer = styled.label`

    --container-background-color: #fbd547;

    position: relative;
    color: white;
    justify-content: flex-end;
    border-radius: 8px;
    padding: 10px;
    font-weight: bold;

    .fixed-container{
        display: flex;
        gap: 10px;
        cursor: pointer;

        .userimg-container{
            border-radius: 50%;
            width: 40px;
            height: 40px;
            overflow: hidden;
            display: block;
            background-color: var(--container-background-color);
        }

        .user-info{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: center;

            @media(max-width: 850px){
                align-items: flex-start;
            }


            span:last-child{
                font-size: 10px;
                font-style: italic;
            }
        }

        @media(max-width: 850px){
            flex-direction: row-reverse;
        }
    }


    .popup-container{
        position: absolute;
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
        pointer-events: none;

        @media(max-width: 850px){
            right: unset;
            left: 0;
            top: 20px;
            transform-origin: center bottom;
        }
        
        &.show{
            opacity: 1;
            transform: scale(1);
            pointer-events: initial;

            @media(max-width: 850px){
                top: -190%;
            }
        }

        ul{
            display: flex;
            flex-direction: column;
            background: var(--thm-transparent-color);
        }
        li{
            padding:10px;
            text-align: center;
            margin: 0;
            cursor: pointer;
            
            &:hover{
                background: var(--thm-transparent2-color);
            }


            &::after{
                display: none;
            }

            svg{
                height: 30px;
                width: 30px;
            }

            &:last-child:hover{
                background: darkred;
            }
        }
    }


`;
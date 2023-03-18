import axios from "axios";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./cards/ChatCard";
import { setAllChats } from "../../../store/slices/chatSlice";
import { setChatSection } from "../../../store/slices/chatNavSlice";
import { getToken } from "../../../util/localStorage";
import { logOutUser } from "../../../store/slices/userPageSlice";
import { HOST_URL, PORT } from "../../../util/hostDetails";
import Loading from "../../../components/helper/loading";


const RecentChats = ({search}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.user);
    const [dataFatching, setDataFatching] = useState(true);
    const { allChats, newChat } = useSelector( store => store.chat );


    const getChats = async () => {

        try {
            const token = getToken();
            if(!token){
                dispatch(logOutUser);
                return;
            }
            const { data } = await axios.get(
                `${HOST_URL}/api/chat/${user.userId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
            );

            setDataFatching(false);
            dispatch(setAllChats(data));
            
            console.log("All Chats of user : ");
            console.log(data);
        } catch (error) { }
    };

    useEffect(() => {
        getChats();
    }, [newChat]);

    const startNewHandler = () => {
        dispatch(setChatSection("searchUsers"));
    }


    return (
        <>
        <Wrapper>
            {allChats.length === 0 ? (
                <div className="chat404">
                    {
                        dataFatching ?
                        <Loading height="100%"/> 
                        : 
                        <div className="no-chat">
                            <div>No Chat Available.</div>
                            <button onClick={startNewHandler}>Start New</button>
                        </div>
                    }
                </div>
            )
            :
            (
                allChats.map((chat, i) => {
                    return String(chat.otherMember.name).toLowerCase().includes(search) ? <ChatCard key={i} chat={chat} /> : null
                })
            )}
        </Wrapper>
        </>
    );

};

const Wrapper = styled.div`
height: 100%;

    .chat404{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px;
        border-radius: 15px;
        background: linear-gradient(var(--thm-transparent-color), transparent);
        font-weight: 500;


        &>div.no-chat{
            width: 100%;
            padding: 20px;
            margin-top: -50px;
            text-align: center;
            background: var(--thm-transparent-color);
            border-radius: 10px;
            
            button{
                margin-top: 15px;
                background: var(--thm-gradient);
                outline: none;
                border: none;
                border-radius: 5px;
                padding: 10px 20px;
                cursor: pointer;
                font-weight: inherit;
            }
        }
    }
`;


export default RecentChats;

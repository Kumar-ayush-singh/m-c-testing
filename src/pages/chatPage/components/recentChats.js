import axios from "axios";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./cards/ChatCard";
import { setAllChats } from "../../../store/slices/chatSlice";
import { setChatSection } from "../../../store/slices/chatNavSlice";
import { getToken } from "../../../util/localStorage";
import { logOutUser } from "../../../store/slices/userPageSlice";


const RecentChats = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.user);
    const { allChats } = useSelector( store => store.chat );


    const getChats = async () => {
        try {
            const token = getToken();
            if(!token){
                dispatch(logOutUser);
                return;
            }
            const { data } = await axios.get(
                `http://localhost:3000/api/chat/${user.userId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
            );

            dispatch(setAllChats(data));
            
            console.log("All Chats of user : ");
            console.log(data);


            // if(data.length < 1){
            //     dispatch(setChatSection("searchUsers"));
            // }
        } catch (error) { }
    };

    useEffect(() => {
        getChats();
    }, []);

    const startNewHandler = () => {
        dispatch(setChatSection("searchUsers"));
    }



    return (
        <>
        <Wrapper>
            {allChats.length === 0 ? (
                <div className="chat404">
                    <div>
                        <div>No Chat Available.</div>
                        <button onClick={startNewHandler}>Start New</button>
                    </div>
                </div>
            )
            :
            (
                allChats.map((chat, i) => {
                    return <ChatCard key={i} chat={chat} />;
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


        &>div{
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

import axios from "axios";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatCard from "./cards/ChatCard";


const RecentChats = () => {
    const [chats, setChats] = useState([]);
    const { user } = useSelector((store) => store.user);


    const getChats = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:3000/api/chat/${user.userId}`
            );
            setChats(data);
            // dispatch(setCurrentChats(data))

            console.log(data);
        } catch (error) { }
    };

    useEffect(() => {
        getChats();
    }, []);

    if (chats) {
        return (
            <Wrapper>
                {chats.map(({ members, _id }, i) => {
                    return <ChatCard key={i} members={members} chatId={_id} />;
                })}
            </Wrapper>
        );
    }
    return <h4>loading ....</h4>;
};

const Wrapper = styled.div`
`;


export default RecentChats;

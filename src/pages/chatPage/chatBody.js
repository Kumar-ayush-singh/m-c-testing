import React, { useState } from "react";
import { useSelector } from "react-redux";
import RecentChats from "./components/recentChats";
import GroupChats from "./components/GroupChats";
import SearchUsers from "./components/SearchUsers";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import { FiDelete } from "react-icons/fi";



const ChatBody = () => {

  const { chatSection } = useSelector((store) => store.chatNav);
  const [isSearching, setIsSearching] = useState(false);
  const togleSearching = () => {
    setIsSearching(!isSearching);
  }


  return (
    <Wrapper>
      <div className="head">
        <h3>{
        chatSection === "recentChats" ?
          "Chat" :
          chatSection === "groupChats" ?
            "Groups" :
            "Users"}</h3>
        <div>
          <input type="search" className={isSearching ? "searching": ""}/>
          {
          isSearching ? 
            <FiDelete onClick={togleSearching} className="icon"/> 
            : 
            <BsSearch onClick={togleSearching} className="icon"/>
          }
        </div>
      </div>
      <div className="chat-section-container custom-scroll">
        {
          chatSection === "recentChats" ?
          <RecentChats/> :
          chatSection === "groupChats" ? 
            <GroupChats/>:
            <SearchUsers />
        }
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.div`


width: 100%;
height: 100%;
padding: 20px;
position: relative;

&>.head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  position: sticky;
  top: 0;


    &>h3{
      margin: 0;
      font-size: 30px;
    }

    .icon{
      width: 25px;
      height: 25px;
    }

    &>div{
      display: flex;
      align-items: center;
      gap: 15px;
      cursor: pointer;

      input{
        border: 1px solid var(--thm-primary-color);
        background: var(--thm-transparent-color);
        width: 0px;
        height: 30px;
        opacity: 0;
        transition: width .2s ease, opacity .5s ease;
        border-radius: 500px;
        padding: 0px 10px;
        pointer-event: none;

        &.searching{
          opacity: 1;
          width: 200px;
        }
      }
    }
  }
}

&>.chat-section-container{
  height: calc(100% - 100px);
  overflow-y: auto;
  overflow-x: hidden;
}
`



export default ChatBody;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import RecentChats from "./components/recentChats";
import GroupChats from "./components/GroupChats";
import SearchUsers from "./components/SearchUsers";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import { FiDelete } from "react-icons/fi";
import ChatNavBar from "./components/chatNavBar";



const ChatBody = () => {

  const { chatSection } = useSelector((store) => store.chatNav);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const togleSearching = () => {
    if(isSearching){
      setSearchInput("");
    }
    setIsSearching(!isSearching);
  }


  return (
    <Wrapper>
      <div className="head">

        <div>
          {!isSearching && 
            <h3>{
            chatSection === "recentChats" ?
              "Chat" :
              chatSection === "groupChats" ?
                "Groups" :
                "Users"
            }
            </h3>
          }
          <div className={isSearching ? "searching-container": ""}>
            <input type="search" className={isSearching ? "searching": ""} value={searchInput} onInput={(e) => { setSearchInput(e.currentTarget.value)}}/>
            {
            isSearching ? 
              <FiDelete onClick={togleSearching} className="icon"/> 
              : 
              <BsSearch onClick={togleSearching} className="icon"/>
            }
          </div>
        </div>
        <nav>
          <ChatNavBar/>
        </nav>
      </div>
      <div className="chat-section-container custom-scroll">
        {
          chatSection === "recentChats" ?
          <RecentChats search={searchInput}/> :
          chatSection === "groupChats" ? 
            <GroupChats search={searchInput}/>:
            <SearchUsers search={searchInput}/>
        }
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.div`


width: 100%;
height: 100%;
position: relative;

@media (min-width: 950px){
  padding-top: 20px;
}

&>.head{
  display: grid;
  grid-template-rows: 1fr;
  align-items: space-between;
  height: 100px;
  position: sticky;
  top: 0;
  padding: 0px 20px;
  border-radius: 0px 0px 15px 15px;


  @media(max-width: 950px){
    margin: 0;
    padding-top: 20px;
    background: var(--thm-transparent-color);
  }

  &>*{
    @media (max-width: 950px){
      height: 50%;
    }
  }


  &>div{
    display: flex;
    justify-content: space-between;
    align-items: center;

    &>h3{
      margin: 0;
      font-size: 30px;

      @media (max-width: 950px){
        font-size: 25px;
      }
    }

    .icon{
      width: 20px;
      height: 20px;
    }

    &>div{
      display: flex;
      align-items: center;
      gap: 15px;
      cursor: pointer;
      width: 100%;
      justify-content: flex-end;

      &.searching-container{
        width: 100%;
      }

      input{
        border: 1px solid var(--thm-primary-color);
        background: var(--thm-transparent-color);
        outline: none;
        width: 0px;
        height: 30px;
        opacity: 0;
        transition: width .2s ease, opacity .5s ease;
        border-radius: 500px;
        padding: 0px 10px;
        pointer-event: none;

        &.searching{
          opacity: 1;
          width: 100%;
          flex-grow: 1;
          flex-shrink: 1;
        }
      }

      &>svg{
        flex-grow: 0;
        flex-shrink: 0;
      }
    }
  }

  &>nav{
    align-self: center;
    @media (min-width: 951px){
      display: none;
    }
  }

}

&>.chat-section-container{
  padding: 0px 20px;
  height: calc(100% - 100px);
  overflow-y: auto;
  overflow-x: hidden;
  // margin-right: -20px;

  @media (max-width: 950px){
    padding-top: 10px;
  }
}
`



export default ChatBody;

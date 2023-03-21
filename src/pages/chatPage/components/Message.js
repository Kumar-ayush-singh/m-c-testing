import React, { Fragment } from "react";
import { MdTimelapse } from "react-icons/md";
import { VscCheck, VscCheckAll } from "react-icons/vsc";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { formatAMPM } from "../../../util/dateFormater";


const Message = ({ message, viewed, reached }) => {
  reached = true;

  const { chatNotifications, onlineUsers } = useSelector(store => store.realTime );
  const { Id: chatId, otherMember } = useSelector(store => store.chat.currentChat);

  const { text, classes } = message;
  const time = new Date(message.createdAt);



  return (
    <Wrapper>
      <div className={"message" + classes}>
        <div className="msg-text-container">
          <div className="msg-text">
            {/*finding emoji and scaling it */}
            {
              text.length === 2 && text[0].codePointAt(0) > 8986 && text[0].codePointAt(0) < 129511 ? 
              <span className="only-emoji">{text}</span>
              :
              <>
              {[...text].map((char, i) => {
                return char.codePointAt(0) > 8986 && char.codePointAt(0) < 129511 ?
                  <span className="txt-emoji" key={i} >{char}</span>
                  :
                  <Fragment key={i}>{char}</Fragment>
              })}
            </>}
            <span className="white-space"></span>
          </div>
        <div className="msg-time">{formatAMPM(time)}<span className={`${reached && viewed ? "viewed" : ""} msg-status`}>{
          reached ?
          viewed || onlineUsers[otherMember._id] ? <VscCheckAll/> : <VscCheck/> : <MdTimelapse/>
        }
        </span></div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .message {
    width: 100%;
    display: flex;
    margin-top: 5px;
    
    &.left{
      justify-content: flex-start;
      .white-space{
        display: inline-block;
        width: 65px;
      }

      .msg-text-container{
        background: var(--thm-other-message-background);
      }

      &.start{
        .msg-text-container{
          border-bottom-left-radius: 2px;
        }
      }
      &.end{
        .msg-text-container{
          border-top-left-radius: 2px;
        }
      }

      .msg-status{
        display: none !important;
      }
    }
    
    &.right{
      justify-content: flex-end;

      .white-space{
        display: inline-block;
        width: 80px;
      }

      .msg-text-container{
        background: var(--thm-own-message-background);
      }

      &.start{
        .msg-text-container{
          border-bottom-right-radius: 2px;
        }
      }
      &.end{
        .msg-text-container{
          border-top-right-radius: 2px;
        }
      }
    }

    .msg-text-container{
      border-radius: 15px;
      position: relative;
      max-width: 90%;
      background-color: var(--thm-transparent-color);

      .msg-text{
        min-width: 50px;
        padding: 15px 10px 15px 10px;
        display: flex;
        word-break: break-word;
        white-space: pre-wrap;
        // justify-content: center;
        align-items: center;
        // min-height: 60px;

        
      }

      .txt-emoji{
        font-size: 1.5em;
        line-height: 1;
      }
      .only-emoji{
        font-size: 2em;
        line-height: 1;
      }

      .msg-time{
        --time-color: #bfbfbf;
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 12px;
        padding: 5px;
        color: var(--time-color);
        display: flex;
        align-items: center;
        gap: 5px;

        span{
          display: flex;
        }
        svg{
          fill: white;
          width: 1.2em;
          height: 1.2em;
        }

        &>.viewed{
          svg{
            fill: #00ffb1;
          }
        }
      }
    }
  }
`;
export default React.memo(Message);

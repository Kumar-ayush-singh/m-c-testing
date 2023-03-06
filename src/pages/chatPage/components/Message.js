import React from "react";
import styled from "styled-components";


const Message = ({ message }) => {

  const { text, classes } = message;

  return (
    <Wrapper>
      <div className={"message" + classes}>
        <div className="msg-text">{ text }</div>
        {/* <div className="msg-time">06:36 PM</div> */}
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
      .msg-text{
        background: var(--thm-other-message-background);
      }

      &.start{
        .msg-text{
          border-bottom-left-radius: 2px;
        }
      }
      &.end{
        .msg-text{
          border-top-left-radius: 2px;
        }
      }
    }
    
    &.right{
      justify-content: flex-end;
      .msg-text{
        background: var(--thm-own-message-background);
      }

      &.start{
        .msg-text{
          border-bottom-right-radius: 2px;
        }
      }
      &.end{
        .msg-text{
          border-top-right-radius: 2px;
        }
      }
    }

    .msg-text{
      max-width: 90%;
      min-width: 50px;
      padding: 20px 10px;
      display: flex;
      word-break: break-word;
      white-space: preWrap;
      // justify-content: center;
      align-items: center;
      // min-height: 60px;
      border-radius: 15px;
      background-color: var(--thm-transparent-color);
    }
  }
`;
export default React.memo(Message);

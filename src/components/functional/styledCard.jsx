import styled from "styled-components";

const StyledCard = styled.section`

  --thm-online-status-color: var(--thm-primary-color);
  --thm-selected-chat-color: linear-gradient(300deg, var(--thm-primary-color), var(--thm-secondary-color));

  margin-bottom: 8px;

  .card {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: var(--thm-transparent-color);
    border-radius: 15px;
    padding: 15px 20px;
    box-shadow: 0px 0px 2px var(--thm-background-color) inset;
    // position: relative;

    // &::before, &::after{
    //   content: "";
    //   display: block;
    //   width: 100%;
    //   height: 5px;
    //   position: absolute;
    //   left: 0;
    // }
    // &::before{
    //   top: 0;
    //   background: linear-gradient(var(--thm-background-color), transparent);
    // }
    // &::after{
    //   bottom: 0;
    //   background: linear-gradient(transparent, var(--thm-bakcground-color));
    // }

    &:hover{
      background: var(--thm-transparent2-color);
    }
    &.active{
      background: var(--thm-selected-chat-color);
    }

    &>div.img-notification-container {
      height: max-content;
      width: max-content;
      position: relative;

      img{
        width: 50px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }

      div{
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: black;
        font-weight: bold;
        background: yellow;
      }
    }

    &>div.card-info{
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;

      h5{
        margin: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      span{
        font-size: 12px;
        color: #d5d5d5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
      }

      &.new-message{
        font-weight: bold;
      }
    }

    &>span, div.img-notification-container{
      display: block;
      flex-shrink: 0;
      flex-grow: 0;
    }
    
    &>span.online{
      width: 12px;
      height: 12px;
      border-radius: 50%;

      background: var(--thm-online-status-color);
    }
  }
`;


export default StyledCard;
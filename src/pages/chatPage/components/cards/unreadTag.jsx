import { useSelector } from "react-redux"
import styled from "styled-components";


export default function UnreadTag(){
    const { Id: chatId } = useSelector( store => store.chat.currentChat );
    const { newMsgCount } = useSelector( store => store.realTime.chatNotifications[chatId] );

    return (
        <Wrapper>
            <div className="unreadMsgTag">
                Unread Message 
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: cetnter;
padding: 20px;
div{
    padding: 5px 20px;
    // background: var(--thm-transparent2-color);
    border-radius: 5px;
    box-shadow: -2px -2px 6px var(--thm-transparent2-color), 2px 2px 6px  #060910;
}`
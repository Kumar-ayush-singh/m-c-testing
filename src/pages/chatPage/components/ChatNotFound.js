import React from 'react';
import styled from 'styled-components';

const ChatNotFound = () => {
    return (
        <Wrapper>
            <div className='messge'>
                Not Chat <br/> Yet?
            </div>
            <div className='action'>
                Start Chat
            </div>
        </Wrapper>
    );
}


const Wrapper = styled.section`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 100%;

&>message{
    font-size: 20px;
    font-weight: bold;
}

&>.action{
    border-radius: 500px;
    padding: 15px 30px;
    background: var(--thm-primary-gradient);
    curssor: pointer;
}
`;



export default ChatNotFound;

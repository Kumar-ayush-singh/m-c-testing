import React from "react";
import { IoMdHand } from "react-icons/io";
import styled from "styled-components";


const WelcomeCard = () => {
    return (
        <Wrapper>
            <div>
                <IoMdHand/>
                <h1>No Chat Selected.</h1>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
width: 100%;
height: 100%;
padding: 20px;
padding-left: 0px;

&>div{
    background: linear-gradient(transparent, var(--thm-transparent-color));
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;

    &>svg{
        height: 200px;
        width: 200px;
        fill: var(--thm-transparent2-color);
    }
    &>h1{
        color: var(--thm-transparent2-color);
    }
}
`;


export default WelcomeCard;
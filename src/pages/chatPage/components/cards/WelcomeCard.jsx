import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Loading from "../../../../components/helper/loading";
import welcome from "../../assets/welcome.svg";


const WelcomeCard = () => {
    const { mobileViewSection } = useSelector( store => store.chatNav);
    return (
        <Wrapper>
            <div>
                {
                    mobileViewSection === "currentChatContainer" ? <Loading height="100%"/> 
                    :
                    <>
                    <img src={welcome} alt="welcome" />
                    <h1></h1>
                    </>
                }
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
width: 100%;
height: 100%;
padding: 20px;
padding-left: 0px;

@media(max-width: 850px){
    padding-left: 20px;
}

&>div{
    background: linear-gradient(transparent, var(--thm-transparent-color));
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;

    img{
        filter: brightness(0.5) contrast(1.5) saturate(0.7);
        width: 100%;
        height: 70%;
        min-height: 200px;
        min-width: 200px;
        height: 60%;
        width: 60%;
    }
    &>h1{
        color: var(--thm-transparent2-color);
    }
`;


export default WelcomeCard;
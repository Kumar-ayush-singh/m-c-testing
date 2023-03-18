import styled from "styled-components";
import { IoIosArrowRoundForward } from "react-icons/io";
import chatBegin from "../assets/chat-begin.svg";
import { useNavigate } from "react-router-dom";


const ImageContainer = styled.div`
height: 100%;
flex-shrink: 1;
max-height: 800px;

@media (max-width: 1300px){
  width: 100%;
  height: 600px;

  @media(min-height: 600px){
    height: 100%;
  }
}

img{
  max-height: 800px;
  height: 600px;
  z-index: -10;

  @media (min-height: 600px){
    height: 100%;
  }
  @media (max-width: 1300px){
    position: absolute;
    top: 0;
    right: 0;
  }
}
`;

const Section1 = (props) => {
  const navigate = useNavigate();
  return (
    <Wrapper className={"section_1 " + props.class}>
      <div className="section_container">
        <div>
          <h1>
            cHAT WITH EVERYONE{/* WITH ENCRIPTED MESSAGE */}
          </h1>
          <h3>
            BE CONNECTED TO EVERYONE AT ANY TIME WITH ANY DEVICE.
          </h3>
          <p>
            Wanna is a real time chat app that is develop to chat without downloading any app or software, it work in all deveices which have internet connection and a sofware in which you are accessing this site.
          </p>
          <br/>
          <GetStarted onClick={() => { navigate("/chat-page")}}>
            Get Started
            <span className="arrow-container">
              <IoIosArrowRoundForward className="upperlayer"/>
            </span>
          </GetStarted>
        </div>
        <ImageContainer>
          <img src={chatBegin} alt="chat-art"/>
        </ImageContainer>
      </div>
    </Wrapper>
  );
};


const Wrapper = styled.section`
width: 100vw;
padding: 0px 100px;
display: grid;
justify-content: center;


@media (max-width: 1300px){
  background: linear-gradient(90deg, var(--thm-background-color) 30%, transparent);
  padding: 0px 50px;
}

@media( max-width: 600px){
  padding: 0px 20px;
}


.section_container{
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  gap: 50px;
  justify-content: center;
  align-items: center;

  @media (max-width: 1300px){
    gap: 0px;
  }


  h1{
    margin-bottom: 30px;
  }
  h3{
    margin-bottom: 30px;
    font-weight: lighter;
  }

  &>div:first-child{
    flex-shrink: 1;
    flex-basis: 470px;
    z-index: 5;

    @media (max-width: 1300px){
      // flex-basis: 60%;
      flex-shrink: 0;
      padding-top: 100px;
    }

    @media (max-width: 800px){
      flex-basis: 100%;
      align-self: flex-start;
    }
  }
}
`;

const GetStarted = styled.button`
--height: 40px;
--btn-color: #fbd547;

padding: 0px 20px;
background: var(--btn-color);
border-radius: 500px;
display: flex;
justify-contetn: space-between;
align-items: center;
font-size: 1rem;
font-weight: 600;
border: none;
outline: none;
gap: 20px;
height: var(--height);
overflow: hidden;
cursor: pointer;

svg{
  height: var(--height);
  width: var(--height);
}

&>.arrow-container{
  position: relative;
  width: var(--height);
  height: var(--height);

  &>.upperlayer{
    background: var(--btn-color);
    position: absolute;
    left: 0;
    top: 0;
  }
}


&:hover{
  .arrow-container .upperlayer{
    animation: movearrow .5s ease infinite alternate;
  }
}

@keyframes movearrow{
  0%{
    left: 0;
  }
  100%{
    left: 10px;
  }
}

`;



export default Section1;

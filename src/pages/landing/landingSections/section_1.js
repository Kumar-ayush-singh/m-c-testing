import styled from "styled-components";
import mobileImg from "../assets/home_appscreen_en-1.webp";


const LeftBackgroundBlock = styled.div`
height: 916px;
width: 996px;
transform: rotate(26deg) translate(-290px, 45px);
border-radius: 90px;
background: linear-gradient(208.89deg,var(--thm-primary-color) 1.69%,var(--thm-secondary-color) 63.59%);
z-index: -10;
position: absolute;
left: 0px;
top: 0px;
`;
const RightBackgroundBlock = styled.div`
position: absolute;
background-color: var(--thm-transparent-color);
height:737px;
width: 737px;
top: 50px;
right: -33%;
transform: rotate(26deg);
border-radius: 100px;

&::after{
  content: "";
  background-color: inherit;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 100px;
  transform: rotate(-46deg);
}`;
const InnerContainer = styled.div`
gap: 80px;

div{
  &:last-child{
    width: 60%;
  }
  width: 50%;
}

h1{
  font-size: 60px;
  font-weight: bolder;
  margin-bottom: 30px;
}
h3{
  font-size: 28px;
  font-weight: lighter;
  margin-bottom: 35px;
}

img{
  width: 600px;
  transform: translateY(-85px);
}
`;

const ImageContainer = styled.div`
`;

const Section1 = (props) => {
  return (
    <section className={"section_1 " + props.class}>
      <LeftBackgroundBlock/>
      <RightBackgroundBlock/>
      <div className="section_container">
        <InnerContainer className="flex">
          <div>
            <h1>
              THE SOCIAL NETWORK OF SPORTS BETTING
            </h1>
            <h3>
              BE A PART OF A COMMUNITY THAT LOVES SPORTS AS MUCH AS YOU.
            </h3>
            <p>
              Wanna isn't your average sports betting platform. We take the entertainment of sports betting to another level with a community full of passionate and competitive fans. We love the emotions of each game, the excitement, the joy, the heartbreak, the victory cry, and of course, the pleasure of letting your rival fans know how much better your team is.
            </p>
            <br/>
            <p>
              We want you to feel like you took part in the game that you are watching. You should feel sore the next day from jumping, cheering and high-fiving. This, we’ve decided, this is what sports betting should be, what it can do. Like books, sports give people a sense of having lived other lives, of taking part in other people's victories. And defeats. When sports are at their best, the spirit of the fan merges with the spirit of the athlete, this is the oneness that the mystics talk about.
            </p>
          </div>
          <ImageContainer>
            <img src={mobileImg} alt="Phone"/>
          </ImageContainer>
        </InnerContainer>
      </div>
    </section>
  );
};

export default Section1;

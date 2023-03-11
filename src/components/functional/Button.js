import styled from "styled-components";

const SlidingButton = styled.button`
display: block;
outline: none;
border: none;
border-radius: 5px;
overflow: hidden;
height: 40px;
min-width: 120px;
font-weight: bold;
position: relative;
background: transparent;
color: transparent;
padding: 10px;

&::before{
  content: "${(props)=>props.btn_name}";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: black;
  fill: black;
  background-color: #fbd547;
  position: absolute;
  top: 0px;
  left: 0px;
  transition: 150ms ease;
}

&::after{
  content: "${(props)=>props.btn_name}";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fbd547;
  fill: #fbd547;
  background-color: black;
  position: absolute;
  left: 0px;
  top: 100%;
  z-index: 1;
  transition: 150ms ease;
  transition-delay: 50ms;
}

&:hover::before{
  top: -100%;
}
&:hover::after{
  top: 0px;
}
`;

export default SlidingButton;
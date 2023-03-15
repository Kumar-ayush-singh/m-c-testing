import React, {useState} from "react";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SlidingButton from "../functional/Button";
import UserInfo from "./userInfo";

const Nav = styled.div`
--nav-padding: 15px 70px;

display: flex;
padding: var(--nav-padding);
justify-content: space-between;
align-items: center;
position: sticky;
top: 0px;
z-index: 100;
background: var(--thm-background-color);
// transition: 0.2s;

&.translusent{
  backdrop-filter: blur(10px);
  background: #4242423d;
}

@media (max-width: 850px){
  justify-content: flex-end;
  gap: 20px;
  flex-direction: row-reverse;

  --nav-padding: 15px 50px;
}


.hamberg{
  display: none;
  
  svg{
    width: 40px;
    height: 40px;
    fill: white;
    cursor: pointer;
  }
  @media (max-width: 850px){
    display: initial;
  }
}

div:last-child{
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;

  @media(max-width: 850px){
    display: none;
  }

  &.show-mobile-nav{
    @media (max-width: 850px){
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      padding: 20px;
      flex-direction: column;
      backdrop-filter: blur(15px);
      height: 100vh;
      height: var(--calculated-vh);
      width: 100%;
      align-items: center;
    }
  }


  &>.close-nav{
    display: none;
    width: 100%;

    &>svg{
      width: 40px;
      height: 40px;
      fill: white;
      cursor: pointer;
    }
    @media( max-width: 850px){
      display: flex;
      justify-content: flex-end;
    }
  }
}

ul{
  display: flex;
  list-style: none;

  @media (max-width: 850px){
    flex-direction: column;
    gap: 20px;
  }

  li{
    margin: 0px 20px;
    padding: 3px 0px;
    position: relative;

    &::after{
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      height: 0px;
      width: 0%;
      border: 0px solid white;
      transition: border-width 0ms, 150ms ease-out;
    }

    &:hover::after{
      // border-color: white;
      border-width: 1px;
      width: 100%;
      left: 0%;
    }

    a{
      color: white;
      font-weight: bold;
      text-decoration: none;
    }
    a:*{
      color: white;
    }
  }
}
`;

const Navbar = () => {

  const [navState, setNavState] = useState(false);

  window.addEventListener("scroll", (event)=>{
    if(window.scrollY > 80){
      setNavClass('translusent');
    }
    else{
      setNavClass('');
    }
  });

  const toggleNav = () => {
    setNavState(!navState);
  }

  const [NavClass, setNavClass] = useState('');
  const user = useSelector((store) => store.user);
  return (
    <>
    <Nav className={NavClass}>
      <div className="logo">
        <Link to="/">
          <svg width="200" viewBox="0 0 456 107.69"><g><rect x="11.01" y="11.01" width="85.67" height="85.67" rx="13.41" ry="13.41" transform="translate(-17.4 80.74) rotate(-65.68)" style={{fill: "rgb(251, 213, 71)"}}></rect><g><rect x="11.01" y="11.01" width="85.67" height="85.67" rx="13.41" ry="13.41" transform="translate(-15.55 22.48) rotate(-20.68)" style={{fill: "rgb(108, 68, 155)"}}></rect><path d="M76.45,39.77l-9.62,29.03h-5.72l-7.17-21.48-7.3,21.48h-5.76l-9.62-29.03h5.6l7.22,22.06,7.51-22.06h4.98l7.34,22.18,7.42-22.18h5.14Z" style={{fill: "rgb(255, 255, 255)"}}></path></g></g><g><path d="M180.02,37.05l-11.23,33.6h-5.04l-9.17-26.83-9.17,26.83h-5.14l-11.23-33.6h4.94l9.07,27.31,9.46-27.31h4.42l9.26,27.46,9.26-27.46h4.56Z" style={{fill: "rgb(255, 255, 255)"}}></path><path d="M206.22,62.25h-17.86l-3.7,8.4h-4.94l15.22-33.6h4.75l15.27,33.6h-5.04l-3.7-8.4Zm-1.68-3.84l-7.25-16.46-7.25,16.46h14.5Z" style={{fill: "rgb(255, 255, 255)"}}></path><path d="M248.85,37.05v33.6h-3.94l-20.16-25.06v25.06h-4.8V37.05h3.94l20.16,25.06v-25.06h4.8Z" style={{fill: "rgb(255, 255, 255)"}}></path><path d="M287.82,37.05v33.6h-3.94l-20.16-25.06v25.06h-4.8V37.05h3.94l20.16,25.06v-25.06h4.8Z" style={{fill: "rgb(255, 255, 255)"}}></path><path d="M319.31,62.25h-17.86l-3.7,8.4h-4.94l15.22-33.6h4.75l15.27,33.6h-5.04l-3.7-8.4Zm-1.68-3.84l-7.25-16.46-7.25,16.46h14.5Z" style={{fill: "rgb(255, 255, 255)"}}></path><path d="M331.79,67.62c0-1.92,1.49-3.26,3.26-3.26s3.17,1.34,3.17,3.26-1.44,3.31-3.17,3.31-3.26-1.39-3.26-3.31Z" style={{fill: "rgb(255, 255, 255)"}}></path><path d="M341.82,53.85c0-9.94,7.58-17.19,17.81-17.19,5.18,0,9.7,1.78,12.77,5.23l-3.12,3.02c-2.59-2.74-5.76-3.98-9.46-3.98-7.58,0-13.2,5.47-13.2,12.91s5.62,12.91,13.2,12.91c3.7,0,6.86-1.3,9.46-4.03l3.12,3.02c-3.07,3.46-7.58,5.28-12.82,5.28-10.18,0-17.76-7.25-17.76-17.19Z" style={{fill: "rgb(255, 255, 255)"}}></path><path d="M375.8,53.85c0-9.84,7.58-17.19,17.91-17.19s17.81,7.3,17.81,17.19-7.58,17.19-17.81,17.19-17.91-7.34-17.91-17.19Zm30.91,0c0-7.44-5.57-12.91-13.01-12.91s-13.11,5.47-13.11,12.91,5.57,12.91,13.11,12.91,13.01-5.47,13.01-12.91Z" style={{fill: "rgb(255, 255, 255)"}}></path><path d="M450.01,70.65l-.05-24.48-12.15,20.4h-2.21l-12.15-20.26v24.34h-4.61V37.05h3.94l14.02,23.62,13.83-23.62h3.94l.05,33.6h-4.61Z" style={{fill: "rgb(255, 255, 255)"}}></path></g></svg>
        </Link>
      </div>
      <div className="hamberg">
        <IoIosMenu onClick={toggleNav}/>
      </div>
      <div className={navState ? "show-mobile-nav": ""}>
        <div className="close-nav">
          <IoIosClose onClick={toggleNav}/>
        </div>
        <ul>
          <li>
          <Link to="/">Home</Link>
          </li>
          <li>
          <Link to="/chat-page">Chats</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
        </ul>
        
        {
          user.isLogedIn ? (
            <UserInfo/>
          ):(
            <Link to="/auth">
              <SlidingButton btn_name="LogIn">LogIn</SlidingButton>
            </Link>
          )
        }

      </div>
    </Nav>
    </>
  );
};

export default Navbar;



import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { BiUserCircle } from "react-icons/io";
import styled from "styled-components";
import Navbar from "../../components/helper/Navbar";
import LogIn from "./LogIn";
import Register from "./Register";


const Auth = () => {

  const [state, setState] = useState(false);
  const stateHandler = () => {
    setState(!state);
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className="container">
          <div className="head">
            <BiUser/>
            { state ? "Member LogIn" : "Member Register" }
            <div className="background"></div>
          </div>
          <div className="form-container">
            {state ? <LogIn /> : <Register />}
            <div>
              {state ? (
                <article>
                  <p>
                    Not a member? <span onClick={stateHandler}> Register</span>
                  </p>
                </article>
              ) : (
                <article>
                  Already a member? <span onClick={stateHandler}> Log in</span>
                </article>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
--container-padding: 20px;
width: 100%;
display: flex;
justify-content: center;
padding: 50px 0px;
color: white;
font-size: 16px;
font-weight: 500;


.container{
  background: var(--thm-transparent-color);
  max-width: 600px;
  min-width: 350px;
  border-radius: 15px;
  overflow: hidden;
  
  .head{
    padding: var(--container-padding);
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    position: relative;
    font-size: 20px;
    font-weight: 700;
  
    svg{
      width: 100px;
      height: 100px;
    }

    .background{
      position: absolute;
      top: -90%;
      left: -25px;
      background: var(--thm-gradient);
      width: calc(100% + 50px);
      height: 200%;
      border-radius: 50%;
      z-index: -1;
    }
  }


  .form-container{
    margin-top: 30px;
    padding: var(--container-padding);

    article{
      font-style: italic;
      font-weight: lighter;
      font-size: 0.9em;
      margin-top: 10px;
      
      p{
        margin: 0;
      }
      
      span{
        color: var(--btn-color);
        cursor: pointer;
        font-style: normal;
        margin-left: 10px;
        text-decoration: underline;

        &:hover{
          font-weight: 500;
        }
      }
    } 
  }
}
`;
export default Auth;

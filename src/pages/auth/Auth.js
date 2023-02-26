import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/helper/Navbar";
import authImg from "./assets/auth-img-2.png";
// import Footer from "../../components/helper/Footer";
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
                <div className="left">
                    <h2>
                        REGISTER AND START CHATING ON <span> TRENDEST CHAT APP</span>{" "}
                    </h2>
                    <img src={authImg} alt="" />
                </div>
                <div className="right">
                    <img src={authImg} alt="" />
                    <div className="form-container">
                        {state ? <LogIn /> : <Register />}
                        <div>
                            {state ? (
                                <article>
                                    <p>
                                        not a member <span onClick={stateHandler}> register</span>
                                    </p>{" "}
                                </article>
                            ) : (
                                <article>
                                    already a member <span onClick={stateHandler}> log in</span>
                                </article>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
      </>
    );
};
const Wrapper = styled.section`
  background-color: #111827;
  min-height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 1rem 2rem; */
  .container {
    /* background-color: #402696; */
    min-height: 80vh;
    overflow: hidden;
    width: 80%;
    border-radius: 30px;
    background: rgb(135, 26, 227);
    background: linear-gradient(
      90deg,
      rgba(135, 26, 227, 1) 0%,
      rgba(62, 39, 148, 1) 100%,
      rgba(0, 212, 255, 1) 100%
    );
    display: flex;
    .right {
      display: flex;
      width: 50%;
      img {
        display: none;
      }
      .form-container {
        width: 80%;
        /* background-color:
        m= */
        margin: auto;
        border-radius: 20px;
        background-color: #f7f7ff;
        border-radius: 20px;
        padding: 1rem;
        form {
          padding: 1rem;
          border-radius: 20px;
        }
        span {
          color: #f5cc45;
          cursor: pointer;
        }
      }
    }
    .left {
      position: relative;
      width: 50%;

      h2 {
        color: white;
        padding: 1rem;
        margin-right: 5vw;
        font-size: 3rem;
      }
      img {
        position: absolute;
        bottom: 0;
      }
    }
    /* margin: 1rem auto; */
  }
  @media (max-width: 600px) {
    .container {
      .left {
        display: none;
      }
      .right {
        width: 100%;
        padding: 0;
        position: relative;
        flex-direction: column;
        img {
          position: absolute;
          height: 5rem;
          width: 7rem;
          display: flex;
          top: 1%;
          margin: 0 auto;
          position: relative;
        }
      }
    }
  }
`;
export default Auth;

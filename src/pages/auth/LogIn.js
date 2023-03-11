import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/userPageSlice";
import { Navigate, useNavigate } from "react-router-dom";

const LogIn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLogedIn } = useSelector((store) => store.user);

    console.log(isLogedIn);

    let initialState = {
        email: "",
        password: "",
    };
    const [values, setValue] = useState(initialState);
    console.log(values);


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        values[name] = value;
        setValue({...values});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        dispatch(loginUser({...values}));
    };

    // useEffect(() => {
    //     isLogedIn && navigate("/chat-page");
    // }, [isLogedIn]);

    return (
        <Wrapper>
            {
                isLogedIn && <Navigate to={"/chat-page"} replace/> 
            }
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                {/* <div className="form-row">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-input" />
                </div> */}
                <div className="form-row">
                    <label htmlFor="">Email</label>
                    <input
                        type="text"
                        className="form-input"
                        value={values.email}
                        onChange={handleChange}
                        name="email"
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="">Password</label>
                    <input
                        type="text"
                        className="form-input"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </div>
                <button>submit</button>
            </form>
        </Wrapper>
    );
};
const Wrapper = styled.section`
  button {
    background-color: #f5cc45;
    color: #000016;
    padding: 0.2rem 1rem;
    font-size: 1rem;
    border-radius: 10px 10px;
    border: none;
    font-weight: bold;
  }
`;
export default LogIn;

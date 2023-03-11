import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/userPageSlice";
import { Navigate, useNavigate } from "react-router-dom";
import SlidingButton from "../../components/functional/Button";

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
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="">Email</label>
                    <input
                        type="text"
                        className="form-input"
                        value={values.email}
                        onChange={handleChange}
                        name="email"
                        placeholder="Type Email"
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
                        placeholder="Type Password"
                    />
                </div>
                <SlidingButton btn_name="Continue" className="submit"/>
            </form>
        </Wrapper>
    );
};
const Wrapper = styled.section`
.form-row{
    label{
        display: block;
        padding-bottom: 5px;
    }
    input{
        border: none;
        outline: none;
        border-radius: 5px;
        background: var(--thm-transparent2-color);
        color: white;
        font-size: 15px;

        &::placeholder{
            color: var(--thm-transparent2-color);
            font-style: italic;
        }
    }
}
  .submit {
    width: 100%;
    font-size: 15px;
    margin-top: 30px;
  }
`;
export default LogIn;

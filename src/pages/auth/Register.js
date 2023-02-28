import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/userPageSlice";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';



const Register = () => {
    let initialState = {
        name: "",
        email: "",
        password: "",
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValue] = useState(initialState);
    const { isLogedIn } = useSelector((store) => store.user);


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
        dispatch(registerUser({...values, email: values.email}))
    };

    useEffect(() => {
        isLogedIn && navigate("/chat-page");
    }, [isLogedIn]);

    return (
        <Wrapper>
            <h1>register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="">Name</label>
                    <input
                        type="text"
                        className="form-input"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="">Email</label>
                    <input
                        type="text"
                        className="form-input"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
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
export default Register;

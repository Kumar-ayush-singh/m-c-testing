import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import UserCard from "./cards/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../util/localStorage";
import { logOutUser } from "../../../store/slices/userPageSlice";
import { HOST_URL, PORT } from "../../../util/hostDetails";


const SearchUsers = () => {
  const { user } = useSelector(state => state.user)
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getAllUser = async () => {
    const token = getToken();
      if(!token){
        dispatch(logOutUser());
        return;
      }
    const { data } = await axios.get(`${HOST_URL}:${PORT}/api/user/get-all/`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(data);
    console.log(users);
  };

  
  useEffect(() => {
    getAllUser();
  }, []);


  return (
    <Wrapper>
      {users.map(({name, _id}, i) => {
          return _id === user.userId ? null : <UserCard key={i} name={name} Id={_id} />
      })}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .search-bar-user {
    display: flex;
    /* background-color: red; */
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 1rem auto;

    input {
      border: none;
      border-radius: 2px 2px;
      padding: 0.2 1rem;
      font-size: 1.2rem;
    }
    button {
      padding: 0.2rem 1rem;
      border-radius: 10px 10px;
      border: none;
      font-size: 1rem;
    }
    button:hover {
    }
  }
`;
export default SearchUsers;

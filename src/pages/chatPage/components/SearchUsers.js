import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import UserCard from "./cards/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../util/localStorage";
import { logOutUser } from "../../../store/slices/userPageSlice";
import { HOST_URL, PORT } from "../../../util/hostDetails";
import Loading from "../../../components/helper/loading";
import { setAllUsers } from "../../../store/slices/chatSlice";


const SearchUsers = ({search}) => {
  const { user } = useSelector(state => state.user)
  const { allUsers } = useSelector(state => state.chat);
  const [dataFatching, setDataFatching] = useState(true);
  const dispatch = useDispatch();

  const getAllUser = async () => {
    const token = getToken();
      if(!token){
        dispatch(logOutUser());
        return;
      }
    const { data } = await axios.get(`${HOST_URL}/api/user/get-all/`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(setAllUsers(data));
    setDataFatching(false);
    console.log("All users : ")
    console.log(data);
  };

  
  useEffect(() => {
    getAllUser();
  }, []);


  return (
    <Wrapper>
      {
        dataFatching && !allUsers.length ? <div className="user404"><Loading height="100%"/></div> 
        :
        <>
        {allUsers.map(({name, _id, avatar}, i) => {
            return _id === user.userId ? 
              null 
              :  
              String(name).toLowerCase().includes(search.toLowerCase()) ? 
                <UserCard key={i} name={name} Id={_id} avatar={avatar}/> 
                : null
        })}
        </>
      }
    </Wrapper>
  );
};
const Wrapper = styled.section`
  height: 100%;
  .user404{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    border-radius: 15px;
    background: linear-gradient(var(--thm-transparent-color), transparent);
    font-weight: 500;
  }
`;
export default SearchUsers;

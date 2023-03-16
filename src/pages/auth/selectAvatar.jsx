import a from "./assets/1.svg";
import b from "./assets/2.svg";
import c from "./assets/3.svg";
import d from "./assets/4.svg";
import e from "./assets/5.svg";
import f from "./assets/6.svg";
import g from "./assets/7.svg";
import h from "./assets/8.svg";
import i from "./assets/9.svg";
import j from "./assets/10.svg";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from "../../store/slices/userPageSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const SelectAvatar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector( store => store.user );
    const avatar = Number(user.avatar);

    async function handleClick(num){
        const res = await dispatch(setAvatar(num));
        console.log(res.payload);
        console.log(num);
        if(res.payload.toString() === num.toString()){
            navigate("/");
        }
    }
    return (
        <Wrapper>
            <h2>Select an Avatar</h2>
            <div className="avatar-container">
                <div className={avatar===1?  "selected" : ""}>
                    <img src={a} alt="a" onClick={() => handleClick('1')}/>
                </div>
                <div className={avatar===2?  "selected" : ""}>
                    <img src={b} alt="b" onClick={() => handleClick('2')}/>
                </div>
                <div className={avatar===3?  "selected" : ""}>
                    <img src={c} alt="c" onClick={() => handleClick('3')}/>
                </div>
                <div className={avatar===4?  "selected" : ""}>
                    <img src={d} alt="a" onClick={() => handleClick('4')}/>
                </div>
                <div className={avatar===5?  "selected" : ""}>
                    <img src={e} alt="a" onClick={() => handleClick('5')}/>
                </div>
                <div className={avatar===6?  "selected" : ""}>
                    <img src={f} alt="a" onClick={() => handleClick('6')}/>
                </div>
                <div className={avatar===7?  "selected" : ""}>
                    <img src={g} alt="a" onClick={() => handleClick('7')}/>
                </div>
                <div className={avatar===8?  "selected" : ""}>
                    <img src={h} alt="a" onClick={() => handleClick('8')}/>
                </div>
                <div className={avatar===9?  "selected" : ""}>
                    <img src={i} alt="a" onClick={() => handleClick('9')}/>
                </div>
                {/* <div className={avatar===1?  "selected" : ""}>
                    <img src={j} alt="a" onClick={() => handleClick('10')}/>
                </div> */}
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.section`
width: 100vw;
height: 100vh;
height: var(--calculated-vh, 100vh);
color: white;
padding: 50px 100px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 20px;

@media(max-width: 800px){
    padding: 20px;
}


.avatar-container{
    display: grid;
    grid-template-columns: 200px 200px 200px;
    grid-column-gap: 10px;
    grid-row-gap: 10px;

    @media(max-width: 800px){
        width: 100%;
        grid-template-columns: 1fr 1fr 1fr;
    }

    &>div{
        cursor: pointer;
    }
    .selected{
        position: relative;
        border: 5px solid #7fff7f;
    }
}
`


export default SelectAvatar;
import { useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import styled from "styled-components"

export let showConnectionToast = ()=>{};

function Offline(){
    const [isShowing, setIsShowing] = useState(false);
    let timeoutRef;
    showConnectionToast = ()=>{
        if(timeoutRef){
            clearTimeout(timeoutRef);
        }
        setIsShowing(true);
        timeoutRef = setTimeout(() => {
            setIsShowing(false);
        }, 3000);
    };

    useEffect(()=>{
        window.addEventListener('online', showConnectionToast);
        window.addEventListener('offline', showConnectionToast);

        return (
            ()=>{
                window.removeEventListener('online', showConnectionToast);
                window.removeEventListener('offline', showConnectionToast);
            }
        )
    })
    return (
        <Wrapper>
            <div className={isShowing? `showing ${window.navigator.onLine ? "online": "offline"}` : null}>
                <div className="content">
                    You are {window.navigator.onLine ? "now online" : "offline"}
                </div>
                <IoMdClose/>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
width: 100%;

&>div{
    position: fixed;
    top: -50px;
    left: 50%;
    transform: translate(-50%);
    color: white;
    font-weight: 500;
    padding: 5px 10px;
    display: flex;
    border-radius: 0px 0px 5px 5px;
    transition: 0.2s ease;
    font-size: 14px;

    &.online{
        background: #28a745;
    }
    &.offline{
        background: #DC3545;
    }

    &>div{
        padding: 0px 20px;
    }

    &.showing{
        top: 0px
    }

    svg{
        height: 1.2em;
        width: 1.2em;
    }
}
`;

export default Offline;
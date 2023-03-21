import { useEffect, useState } from "react"
import styled from "styled-components";
import { formatDate } from "../../../../util/dateFormater";

export default function MsgDate({date, topDate}){

    const jsDate = new Date(date);

    return (
        <Wrapper topDate={topDate} display={date === "notDisplay" ? false : true}>
            <div className="msgDate">
                <div>
                    {
                        topDate ? date : formatDate(jsDate, true)   
                    }
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
margin-top: 5px;
position: ${props => props.topDate ? "sticky" : "initial"};
z-index: ${props => props.topDate ? "5" : "initial"};
display: ${props => !props.display ? "none" : "flex"};

top: 0px;


&>.msgDate{
    background: var(--thm-background-color);
    border-radius: 5px;

    &>div{
        padding: 5px;
        border-radius: 5px;
        font-size: 13px;
        background: var(--thm-transparent2-color);
    }
}
`;
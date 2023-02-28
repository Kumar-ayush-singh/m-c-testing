import styled from "styled-components"



const Loading = () => {
    return (
        <Wrapper>
            <div className="loading-contianer">
                <div className="loading-animation"></div>
                <div className="loading">Loading...</div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
position: fixed;
top: 0;
left: 0;
bottom: 0;
right: 0;
display: flex;
justify-content: center;
align-items: center;

&>loading-container{
    padding: 20px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: yellow;

    &::after, &::before{
        content: "";
        display: block;
        border: 20px solid blue;
        position: absolute;
    }
    &::before{
        top: 0;
        left: 0;
        border-right: 0px;
        border-bottom: 0px
    }
    &::after{
        bottom: 0;
        right: 0;
        border-left: 0px;
        border-top: 0px;
    }

    &>div.loading-animation{
        border: 3px solid gray;
        border-top: 5px solid black;
        border-radius: 50%;
        height: 50px;
        width: 50px;
    }
}
`


export default Loading;
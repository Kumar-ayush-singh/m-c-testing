import styled from "styled-components"



const Loading = ({height}) => {
    return (
        <Wrapper height={height}>
            <div className="loading-container">
                <div className="loading-animation"></div>
                <div className="loading">Loading...</div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
width: 100%;
height: ${props => props.height ? props.height: "var(--calculated-vh, 100vh)"};
display: flex;
justify-content: center;
align-items: center;

&>.loading-container{
    padding: 20px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    color: yellow;

    &>div.loading-animation{
        border-radius: 50%;
        border: 3px solid gray;
        border-top: 5px solid white;
        height: 30px;
        width: 30px;
        animation : spin 0.6s linear infinite;
    }

    @keyframes spin{
        0% {
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
}
`


export default Loading;
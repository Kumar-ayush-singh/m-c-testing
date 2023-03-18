import styled from "styled-components"

export default function PageNotFound(){
    return (
        <Wrapper>
            <h2>
                Page Not Found
            </h2>
        </Wrapper>
    )
}

const Wrapper = styled.section`
width: 100vw;
height: 100vh;
height: var(--calculated-vh, 100vh);
display: flex;
justify-content: center;
align-items: center;

h2{
    color: var(--thm-transparent2-color);
}
`
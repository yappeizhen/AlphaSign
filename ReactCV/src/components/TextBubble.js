// Import dependencies
import React from "react";
import styled from "styled-components"

const Bubble = styled.div`
    position: relative;
	background: ${prop => prop.backgroundColor};
	border-radius: .4em;
    width: 100%;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 10%;
        width: 0;
        height: 0;
        border: 40px solid transparent;
        border-top-color: ${props => props.backgroundColor};
        border-bottom: 0;
        border-left: 0;
        margin-left: -10px;
        margin-bottom: -40px;   
    }
    @media only screen and (max-width: 768px) {
        width: 100%;
        height: auto;
        padding: 20px;
    }
`;
function TextBubble({ children, backgroundColor = "rgb(196, 180, 328, 0.5)" }) {

    return (
        <Bubble backgroundColor={backgroundColor}>
            {children}
        </Bubble>
    );
}

export default TextBubble;

// Import dependencies
import React from "react";
import styled from "styled-components"

const Bubble = styled.div`
    position: relative;
	background: rgb(196, 180, 328, 0.5);
	border-radius: .4em;
    width: 100%;
    height: 250px;
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
        border-top-color: rgb(196, 180, 328, 0.5);
        border-bottom: 0;
        border-left: 0;
        margin-left: -10px;
        margin-bottom: -40px;   
    }
    @media only screen and (max-width: 768px) {
        width: 70%;
        height: auto;
        padding: 20px;
    }
`;
function TextBubble({ children }) {

    return (
        <Bubble>
            {children}
        </Bubble>
    );
}

export default TextBubble;

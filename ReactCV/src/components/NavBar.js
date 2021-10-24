// Import dependencies
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import closeIcon from "../../src/assets/icons/close.png"
import menuIcon from "../../src/assets/icons/menu.png"
import fistBump from "../../src/assets/images/peace.png";
import { NAV_ITEMS } from "../constants/navigation";

const StyledAppBar = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
    @media only screen and (max-width: 768px) {
        align-items: flex-start;
    }
`;
const StyledIntro = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const StyledH1 = styled.h1`
    font-size: 24px;
    padding: 0;
    margin: 0;
    font-family: "poppins";
    @media only screen and (max-width: 768px) {
        display: none;
    }
`;
const StyledPeaceSign = styled.img`
    height: 50px;
    width: 50px;
    padding: 0;
    margin-right: 12px;
    @media only screen and (max-width: 768px) {
        height: 30px;
        width: 30px
    }
`;
const StyledNameText = styled.div`
    text-align: left;
    margin: 4px;
    @media only screen and (max-width: 768px) {
        font-size: 8px;
        padding: 0;
    }
`;
const StyledNavToggle = styled.div`
    display: none;
    &:hover {
        opacity: 0.75;
    }
    @media only screen and (max-width: 768px) {
        display: inline;
        align-self: flex-end;
        cursor: pointer;
    }
`;
const StyledNavContainer = styled.div`
    display: flex;
    flex-direction: row;
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;
const StyledTabBar = styled.nav`
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    transition: all 0.5s;
    @media only screen and (max-width: 768px) {
        border-radius: 5%;
        background-color: rgb(240, 248, 255, 0.5);
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        display: ${props => props.showNav ? `flex` : `none`}
    }
`;
const StyledLink = styled(Link)`
    padding-left: 20px;
    padding-right: 20px;
    font-size: 15px;
    font-weight: 400;
    color: black;
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;
const StyledLinkBox = styled.div`
    padding-bottom: 12px;
    border-bottom: 2px solid black;
    &:hover {
        border-bottom: 3px solid rgb(139,0,139);
        ${StyledLink}{
            color: rgb(139,0,139)
;
            font-weight: 600;
        }
    }
    @media only screen and (max-width: 768px) {
        margin-top: 12px;
        border-bottom: 1px solid black;

        ${StyledLink}{
            font-size: 9px;
        }
    }
`;
const StyledIcon = styled.img`
    height: 1em;
    width: 1em;
    margin-right: 32px;
`;
function NavBar() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleToggleClick = () => setIsNavCollapsed(!isNavCollapsed);
    const collapseNav = () => setIsNavCollapsed(true);

    return (
        <StyledAppBar onBlur={collapseNav}>
            <StyledIntro>
                <StyledPeaceSign src={fistBump} alt="V Sign" />
                <div>
                    <StyledH1>Sign Language Game</StyledH1>
                    <StyledNameText>by Zhili and Pei Zhen</StyledNameText>
                </div>
            </StyledIntro>
            <StyledNavContainer>
                <StyledNavToggle onClick={handleToggleClick}>
                    {isNavCollapsed && <StyledIcon src={menuIcon} alt="Menu" />}
                    {!isNavCollapsed && <StyledIcon src={closeIcon} alt="Close menu" />}
                </StyledNavToggle>
                <StyledTabBar showNav={!isNavCollapsed} >
                    <StyledLinkBox>
                        <StyledLink
                            to={NAV_ITEMS.FOUR_CLASSES.to}>
                            {NAV_ITEMS.FOUR_CLASSES.text}
                        </StyledLink>
                    </StyledLinkBox>
                    <StyledLinkBox>
                        <StyledLink
                            to={NAV_ITEMS.ALL_CLASSES.to}>
                            {NAV_ITEMS.ALL_CLASSES.text}
                        </StyledLink>
                    </StyledLinkBox>
                </StyledTabBar>
            </StyledNavContainer>
        </StyledAppBar >
    );
}

export default NavBar;

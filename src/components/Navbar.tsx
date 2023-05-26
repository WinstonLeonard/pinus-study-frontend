import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { Colors } from "../constants";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { selectId, selectToken } from "../redux/features/users/userSlice";
import {toggleCreateAccount, toggleLogin, toggleSignup } from "../redux/features/modal/modal";
import { isLoggedIn } from "../utils";
import CombinedAuthenticationPage from "../pages/CombinedAuthenticationPage";
import { pfp } from "../assets";

// STYLED COMPONENTS

const NavbarContainer = styled.div`
    background: linear-gradient(${Colors.black}, ${Colors.dark_grey});
    color: white;
    width: calc(100% - 4rem);
    min-width: auto;
    max-width: auto;
    float: left;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem 2rem;
    position: fixed;
    z-index: 1020;
    top: 0;
    font-family: "Poppins", sans-serif;
    border-bottom: solid;
    border-bottom-width: 2px;
    border-bottom-color: ${Colors.light_grey};
    box-shadow: 0 0 7px 0 ${Colors.light_grey};
`;

const Logo = styled.img`
    width: 40px;
    height: 40px;
`;

const SubDivision = styled.div`
    display: flex;
    gap: 2rem;
    align-items: center;
`;

const Buttons = styled(SubDivision)`
    gap: 1rem;
`;

const LoginButton = styled.span`
  font-size: 15px;
  padding: 0.6rem 1.6rem;
  font-weight: 500;
  border-radius: 30px;
  background-color: ${Colors.white};
  color: ${Colors.black};
  text-decoration: "none";
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  
  &:hover {
    background-color: ${Colors.yellow};
    color:${Colors.white};
    animation: ${keyframes`
      0% {
        background-color: ${Colors.white_accent};
        color: ${Colors.black};
      }
      100% {
        background-color: ${Colors.yellow};
        color:${Colors.white};
      }
    `} 0.3s ease-in-out;
  }
`;

const SignUpButton = styled.span`
    font-size: 15px;
    padding: 0.6rem 1.6rem;
    background-color: ${Colors.red};
    font-weight: 500;
    border-radius: 30px;
    color: white;
    text-decoration: "none";
    cursor: pointer;
    width:60px;

    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  
    &:hover {
      background-color: ${Colors.yellow};
      color:${Colors.white};
      animation: ${keyframes`
        0% {
          background-color: ${Colors.white};
          color: ${Colors.black};
        }
        100% {
          background-color: ${Colors.yellow};
          color:${Colors.white};
        }
      `} 0.3s ease-in-out;
    }
`;

const SearchBarContainer = styled.span`
    padding: 0.5rem 1rem;
    background: ${Colors.white};
    border-radius: 25px;
    align-items: center;
    display: flex;
    gap: .5rem;
`;

const SearchBar = styled.input`
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    border: none;
    background: ${Colors.white};
    color: ${Colors.dark_grey};
    width: 30rem;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: ${Colors.light_grey};
        font-style: italic;
    }

    @media (max-width: 800px) {
        width: 45vw;
    }
`;

const ProfilePicture = styled.img`
    width: 3em;
    height: 3em;
    border-radius: 50%;
    cursor: pointer;
`;

/**
 * Navbar component for the web forum.
 * 
 * @returns A React Component to show a fixed Navbar on top of every page. Navbar is
 * implemented in the App component.
 */
const NavigationBar = () => {

    // State to store the value of search query in module search bar
    const [query, setQuery] = useState("");

    const userToken = useSelector(selectToken);
    const userId = useSelector(selectId);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const showSignUpModal = () => {
        dispatch(toggleLogin(false));
        dispatch(toggleSignup(true));
        dispatch(toggleCreateAccount(false));
    }

    const showLogInModal = () => {
        dispatch(toggleLogin(true));
        dispatch(toggleSignup(false));
        dispatch(toggleCreateAccount(false));
    }

    // Updates the query state upon data change in the module search bar
    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        console.log("Query is ", e.currentTarget.value)
        setQuery(e.currentTarget.value);
    };

    const navigateToSearchPage = () => {
        navigate(`/search/${query}`)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          navigateToSearchPage();
          setQuery("");
          event.stopPropagation();
          event.preventDefault();
        }
    };

    return (
        <NavbarContainer>
            <CombinedAuthenticationPage/>
            <SubDivision>
                <Link to="/">
                    <Logo src={logo} />
                </Link>
                <SearchBarContainer>
                    <SearchIcon color="disabled" />
                    <SearchBar
                        id="search-bar"
                        type="text"
                        value={query}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Search modules here..."
                    />
                </SearchBarContainer>
            </SubDivision>
            <Buttons>
                {isLoggedIn(userToken, userId) ? (
                    <Link to={`/profile/${userId}`} style={{ textDecoration: "none" }}>
                        <ProfilePicture src={pfp} />
                    </Link>
                ) : (
                    <>
                        <LoginButton onClick={showLogInModal}>Login</LoginButton>
                        <SignUpButton onClick={showSignUpModal}>Sign Up</SignUpButton>
                    </>
                )}
            </Buttons>
        </NavbarContainer>
    );
};

export default NavigationBar;

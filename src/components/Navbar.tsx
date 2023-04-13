import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { Colors } from "../constants";
import SearchIcon from "@mui/icons-material/Search";
import { CreateAccountModal, LoginModal, SignUpModal } from "./authentication_modal"
import { useSelector, useDispatch } from "react-redux";
import { selectId, selectToken } from "../redux/features/users/userSlice";
import { selectCreateAccountModal, selectLoginModal, selectSignupModal, toggleCreateAccount, toggleLogin, toggleSignup } from "../redux/features/modal/modal";

// STYLED COMPONENTS

const NavbarContainer = styled.div`
    background-color: ${Colors.dark_grey};
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
    border-color: ${Colors.white};
    border-width: 1px;
    border-style: solid;
    color: ${Colors.white};
    text-decoration: "none";
`;

const SignUpButton = styled.span`
    font-size: 15px;
    padding: 0.6rem 1.6rem;
    background-color: ${Colors.red};
    font-weight: 500;
    border-radius: 30px;
    color: white;
    text-decoration: "none";
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
`;

const ProfilePicture = styled.button`
    background: ${Colors.red};
    width: 3em;
    height: 3em;
    border-radius: 50%;
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

    // States for login / signup / create account modals
    const [signUpEmail, setSignUpEmail] = useState<string>("");

    const showLogin = useSelector(selectLoginModal);
    const showSignup = useSelector(selectSignupModal);
    const showCreateAccount = useSelector(selectCreateAccountModal);
    const userToken = useSelector(selectToken);
    const userId = useSelector(selectId);
    const dispatch = useDispatch();

    const isLoggedIn = () => {
        return userToken !== "" && userId !== 0
    };

    const navigate = useNavigate();

    const hideAllModals = () => {
        dispatch(toggleLogin(false));
        dispatch(toggleSignup(false));
        dispatch(toggleCreateAccount(false));
    }

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

    const authoriseCreateAccountModal = (email: string) => {
        setSignUpEmail(email);
        dispatch(toggleLogin(false));
        dispatch(toggleSignup(false));
        dispatch(toggleCreateAccount(true));
    }

    // Updates the query state upon data change in the module search bar
    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setQuery(e.currentTarget.value);
    };

    const navigateToSearchPage = () => {
        navigate(`/search/${query}`)
    }

    const searchBar = document.getElementById('search-bar');

    searchBar?.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            navigateToSearchPage();
            setQuery("");
            event.stopPropagation();
            event.preventDefault();
        }
    })

    useEffect(() => {
        if (isLoggedIn()) {
            hideAllModals();
        }
    }, [userId])

    return (
        <NavbarContainer>
            { showLogin ? <LoginModal cancel={hideAllModals} showSignUpModal={showSignUpModal} /> : null }
            { showSignup ? <SignUpModal cancel={hideAllModals} showLogInModal={showLogInModal} authoriseCreateAccountModal={authoriseCreateAccountModal} /> : null }
            { showCreateAccount ? <CreateAccountModal cancel={hideAllModals} email={signUpEmail} showLogInModal={showLogInModal} /> : null }
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
                        placeholder="Search modules here..."
                    />
                </SearchBarContainer>
            </SubDivision>
            <Buttons>
                {isLoggedIn() ? (
                    <Link to={`/profile/${userId}`} style={{ textDecoration: "none" }}>
                        <ProfilePicture/>
                    </Link>
                    
                ) : (
                    <>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <LoginButton onClick={showLogInModal}>Login</LoginButton>
                    </Link>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <SignUpButton onClick={showSignUpModal}>Sign Up</SignUpButton>
                    </Link>
                    </>
                )}
            </Buttons>
        </NavbarContainer>
    );
};

export default NavigationBar;

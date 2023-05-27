import styled, { keyframes } from "styled-components";
import { Colors } from "../../constants";

const fadeIn = keyframes`
    from {
        opacity: 0;
    } 
    
    to {
        opacity: 1;
    }
`

export const BlurredBackground = styled.div`
    align-items: center;
    bottom: 0px;
    display: flex;
    justify-content: center;
    left: 0px;
    position: fixed;
    right: 0px;
    top: 0px;
    width: 100vw;
    backdrop-filter: blur(5px);
    background-color: #2D2D2F80;
    animation: ${fadeIn} 0.1s;
`;


export const CloseIconDiv = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    float: right;
`;

export const ModalBackground = styled.div`
    background-color: ${Colors.white};
    border-radius: 40px;
    min-height: 55vh;
    padding: 2em;
    width: 20vw;
    /* -webkit-box-shadow: 0 1px 4px ${Colors.light_grey};
    -moz-box-shadow: 0 1px 4px ${Colors.light_grey};
    box-shadow: 0 1px 4px ${Colors.light_grey}; */
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding-box;
    background-clip: padding-box;
`;

export const ModalDiv = styled.div<{
    direction?: string;
    justifyContent?: string;
}>`
    flex-direction: ${(props) => (props.direction ? props.direction : "row")};
    display: flex;
    justify-content: ${(props) =>
        props.justifyContent ? props.justifyContent : "flex-start"};
    padding-top: 1em;
    padding-bottom: 1em;
`;

export const ModalTitle = styled.span`
    color: ${Colors.dark_grey};
    font-family: "Poppins";
    font-weight: 600;
    font-size: 2em;
`;

export const ModalInput = styled.input<{ marginBottom?: string }>`
    background-color: ${Colors.light_grey_two};
    border: none;
    border-radius: 40px;
    color: ${Colors.dark_grey};
    flex-grow: 1;
    font-family: "Poppins";
    font-weight: 500;
    font-size: 1.15em;
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 0)};
    padding: 0.75em 1.5em 0.75em 1.5em;

    ::placeholder {
        color: ${Colors.light_grey};
    }

    :focus {
        outline: none;
    }
`;

export const ForgetPassword = styled.span`
    color: ${Colors.dark_grey};
    cursor: pointer;
    font-family: "Poppins";
    font-weight: 400;
    font-style: italic;
    font-size: 1em;
    text-align: center;
    text-decoration: underline;
`;

/**
 * Button for Log In, Sign Up, Create Account.
 */
export const AuthButton = styled.button`
    background-color: ${Colors.blue};
    border: none;
    border-radius: 40px;
    color: ${Colors.white};
    cursor: pointer;
    flex-grow: 1;
    font-family: "Poppins";
    font-weight: 700;
    font-size: 1.15em;
    padding: 0.75em 1.5em 0.75em 1.5em;
`;

/**
 * Small text on the bottom of the modals to switch across the log in and sign up modals.
 */
export const SwitchModalPrompt = styled.span<{
    textDecoration?: string;
    cursor?: string;
}>`
    color: ${Colors.dark_grey};
    cursor: ${(props) => (props.cursor ? props.cursor : "default")};
    font-family: "Poppins";
    font-weight: 400;
    font-size: 1em;
    text-decoration: ${(props) =>
        props.textDecoration ? props.textDecoration : "none"};
`;

export const ErrorMessage = styled.span`
    color: ${Colors.red};
    font-family: "Poppins";
    font-weight: 400;
    font-size: 1em;
    margin-top: 0.5em;
`;

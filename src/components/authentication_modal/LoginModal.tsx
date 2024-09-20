import { 
    AuthButton, 
    BlurredBackground, 
    CloseIconDiv, 
    ErrorMessage, 
    ForgetPassword, 
    ModalBackground, 
    ModalDiv, 
    ModalInput, 
    ModalTitle, 
    SwitchModalPrompt 
} from "./ModalComponents";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { login, selectToken } from '../../redux/features/users/userSlice';
import { LOGIN_URL, API_URL } from "../../constants";
import CloseIcon from '@mui/icons-material/Close';
import { Loader, WhiteLoader } from "../Loader";
import { getUserDetailsRequest } from "../../requests";

const LoginModal = ({cancel, showSignUpModal, showChangePasswordModal} : {cancel: () => void; showSignUpModal: () => void; showChangePasswordModal: () => void}) => {
    const [emailOrUsername, setEmailOrUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showError, setShowError] = useState<Boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Detects changes on the Email / Username input element.
     * @param event The change taking place
     */
    const handleEmailOrUsernameChange = (event: any) => {
        setEmailOrUsername(event.target.value);
    }

    /**
     * Detects changes on the Password input element.
     * @param event The change taking place
     */
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleEnter = (event: any) => {
        if (event.key === "Enter") {
            logIn();
        }
    }

    /**
     * Logs the user into the application. If the user inputs invalid 
     * credentials, an error message will be shown.
     */
    const logIn = () => {
        if (emailOrUsername.trim() === "" || password.trim() === "") {
            setShowError(true);
            setStatusMessage("Fields cannot be empty!")
            return;
        }

        setIsLoading(true)
        setStatusMessage("")

        fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: emailOrUsername.toLowerCase(),
                password: password,
            }),
        }).then(response => response.json())
        .then(data => {
            if (data.status === "failure") {
                setShowError(true);
                setStatusMessage(data.cause);
                return;
            }
            dispatch(login({
                Id: data.userid,
                Token: data.token
            }));
            cancel();
        })
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
    }

    /**
     * Hides error message upon input to the Email / Username or Password field.
     */
    useEffect(() => {
        setShowError(false);
    }, [emailOrUsername, password]);

    return (
        <BlurredBackground>
            <ModalBackground>
                <CloseIconDiv onClick={cancel}>
                    <CloseIcon/>
                </CloseIconDiv>
                <ModalDiv>
                    <ModalTitle>Log In</ModalTitle>
                </ModalDiv>
                <ModalDiv direction="column">
                    <ModalInput 
                        marginBottom="1em"
                        placeholder="Email / Username"
                        onChange={handleEmailOrUsernameChange}
                        value={emailOrUsername}
                        disabled={isLoading}/>
                    <ModalInput 
                        placeholder = "Password"
                        type="password"
                        onChange={handlePasswordChange}
                        value={password}
                        onKeyDown={handleEnter}
                        disabled={isLoading}/>
                    { showError ? <ErrorMessage>{statusMessage}</ErrorMessage> : null }
                </ModalDiv>
                
                <ModalDiv>
                    <AuthButton onClick={logIn} disabled={isLoading}>
                        {isLoading ? <WhiteLoader /> : "Log In"}
                    </AuthButton>
                </ModalDiv>
                
                <ModalDiv justifyContent="center">
                    <ForgetPassword onClick={() => showChangePasswordModal()}>Forget Password?</ForgetPassword>
                </ModalDiv>
               
                <ModalDiv/>
                <ModalDiv/>
                <ModalDiv/>
                <ModalDiv justifyContent="center">
                    <SwitchModalPrompt>Don't have an account?&nbsp;</SwitchModalPrompt>
                    <SwitchModalPrompt 
                        textDecoration="underline" 
                        onClick={() => showSignUpModal()}
                        cursor="pointer">Sign Up here.</SwitchModalPrompt>
                </ModalDiv>
            </ModalBackground>
        </BlurredBackground>
    )
}

export default LoginModal;

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
import { login, selectToken } from '../../features/users/userSlice';
import { API_URL } from "../../constants";
import CloseIcon from '@mui/icons-material/Close';

const LoginModal = ({cancel, showSignUpModal} : {cancel: () => void; showSignUpModal: () => void}) => {
    const userToken = useSelector(selectToken);
    const [emailOrUsername, setEmailOrUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showError, setShowError] = useState<Boolean>(false);
    const dispatch = useDispatch();

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

    /**
     * Logs the user into the application. If the user inputs invalid 
     * credentials, an error message will be shown.
     */
    const logIn = () => {
        if (emailOrUsername.trim() === "" || password === "") {
            setShowError(true);
            return;
        }
        fetch(API_URL + `/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: emailOrUsername,
                password: password,
            }),
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === "failure" || data.token === '') {
                setShowError(true);
                return;
            }
            dispatch(login({
                Id: data.userid,
                Token: data.token
            }));
        })
        .catch(error => console.log(error));
    }

    /**
     * #TODO: Implement when backend is ready
     */
    const forgetPassword = () => {
        // Implement code here
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
                        value={emailOrUsername}/>
                    <ModalInput 
                        placeholder = "Password"
                        type="password"
                        onChange={handlePasswordChange}
                        value={password}/>
                    { showError ? <ErrorMessage>Invalid login credentials!</ErrorMessage> : null }
                </ModalDiv>
                <ModalDiv justifyContent="center">
                    <ForgetPassword onClick={forgetPassword}>Forget Password?</ForgetPassword>
                </ModalDiv>
                <ModalDiv>
                    <AuthButton onClick={logIn}>Log In</AuthButton>
                </ModalDiv>
                <ModalDiv/>
                <ModalDiv/>
                <ModalDiv/>
                <ModalDiv justifyContent="center">
                    <SwitchModalPrompt>Don't have an account?&nbsp;</SwitchModalPrompt>
                    <SwitchModalPrompt 
                        textDecoration="underline" 
                        onClick={showSignUpModal}
                        cursor="pointer">Sign Up here.</SwitchModalPrompt>
                </ModalDiv>
            </ModalBackground>
        </BlurredBackground>
    )
}

export default LoginModal;

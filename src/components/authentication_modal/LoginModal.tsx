import { AuthButton, BlurredBackground, CloseIconDiv, ErrorMessage, ForgetPassword, ModalBackground, ModalDiv, ModalInput, ModalTitle, SwitchModalPrompt } from "./ModalComponents";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import CloseIcon from '@mui/icons-material/Close';

const LoginModal = () => {

    const [emailOrUsername, setEmailOrUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showError, setShowError] = useState<Boolean>(false);

    const handleEmailOrUsernameChange = (event: any) => {
        setEmailOrUsername(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const logIn = () => {
        if (emailOrUsername.trim() === "" || password === "") {
            setShowError(true);
        } else {
            fetch(API_URL + `/login`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: emailOrUsername,
                    email: emailOrUsername,
                    password: password,
                }),
            }).then(response => response.json())
            .then(data => {
                if (data.status === "failure" || data.token === '') {
                    setShowError(true);
                } else {
                    // #TODO: redux functions here
                    sessionStorage.setItem("token", data.token);
                }
            })
            .catch(error => console.log(error));
        }
    }

    /**
     * #TODO: Implement when backend is ready
     */
    const forgetPassword = () => {
        // Implement code here
    }

    /**
     * #TODO : Implement when router is implemented.
     */
    const navigateToSignUpModal = () => {
        // Navigate here
    }

    useEffect(() => {
        setShowError(false);
    }, [emailOrUsername, password]);

    return (
        <BlurredBackground>
            <ModalBackground>
                <CloseIconDiv>
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
                        onClick={navigateToSignUpModal}
                        cursor="pointer">Sign Up here.</SwitchModalPrompt>
                </ModalDiv>
            </ModalBackground>
        </BlurredBackground>
    )
}

export default LoginModal;
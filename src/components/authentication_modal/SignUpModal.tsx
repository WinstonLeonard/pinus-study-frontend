import { useEffect, useState } from "react";
import { AuthButton, BlurredBackground, ErrorMessage, ModalBackground, ModalDiv, ModalInput, ModalTitle, SwitchModalPrompt } from "./ModalComponents";

const SignUpModal = () => {

    const [email, setEmail] = useState<string>("");
    const [showError, setShowError] = useState<Boolean>(false); 

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    } 

    /**
     * Email RegEx taken from https://www.w3resource.com/javascript/form/email-validation.php.
     * The email can contain uppercase (A-Z) and lowercase (a-z) English letters, digits (0-9),
     * characters ! # $ % & ' * + - / = ? ^ _ ` { | } ~, character . ( period, dot or fullstop) 
     * provided that it is not the first or last character and it will not come one after the other.
     */
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const validateEmail = (email: string) => {
        return emailRegex.test(email.toLowerCase());
    }

    const navigateToCreateAccountModal = () => {
        if (validateEmail(email)) {
            // navigate code here
        } else {
            setShowError(true);
        }
    }

    useEffect(() => {
        setShowError(false);
    }, [email])

    return (
        <BlurredBackground>
            <ModalBackground>
                <ModalDiv>
                    <ModalTitle>Sign Up</ModalTitle>
                </ModalDiv>
                <ModalDiv direction="column">
                    <ModalInput 
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}/>
                    { showError? <ErrorMessage>You have entered an invalid email.</ErrorMessage> : null }
                </ModalDiv>
                <ModalDiv>
                    <AuthButton onClick={navigateToCreateAccountModal}>Sign Up</AuthButton>
                </ModalDiv>
                <ModalDiv/>
                <ModalDiv/>
                <ModalDiv/>
                <ModalDiv/>
                <ModalDiv justifyContent="center">
                    <SwitchModalPrompt>Already a member?&nbsp;</SwitchModalPrompt>
                    <SwitchModalPrompt 
                        textDecoration="underline" 
                        onClick={() => {}}
                        cursor="pointer">Log In here.</SwitchModalPrompt>
                </ModalDiv>
            </ModalBackground>
        </BlurredBackground>
    )
}

export default SignUpModal;
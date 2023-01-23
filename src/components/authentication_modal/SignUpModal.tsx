import { useEffect, useState } from "react";
import { AuthButton, BlurredBackground, CloseIconDiv, ErrorMessage, ModalBackground, ModalDiv, ModalInput, ModalTitle, SwitchModalPrompt } from "./ModalComponents";
import CloseIcon from '@mui/icons-material/Close';

const SignUpModal = () => {

    const [email, setEmail] = useState<string>("");
    const [showError, setShowError] = useState<Boolean>(false); 

    /**
     * Detects change in the email input element.
     * @param event The change taking place
     */
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

    /**
     * Validates email according to the RegEx.
     * @param email Email value inputted by the user
     * @returns Boolean value whether the email matches the RegEx
     */
    const validateEmail = (email: string) => {
        return emailRegex.test(email.trim().toLowerCase());
    }

    /**
     * #TODO: Implement when router has been implemented.
     */
    const navigateToCreateAccountModal = () => {
        if (validateEmail(email)) {
            // navigate code here
        } else {
            setShowError(true);
        }
    }

    /**
     * #TODO: Implement when router has been implemented.
     */
    const navigateToLoginModal = () => {
        // navigate code here
    }

    /**
     * Hides error message upon user input to email field.
     */
    useEffect(() => {
        setShowError(false);
    }, [email])

    return (
        <BlurredBackground>
            <ModalBackground>
                <CloseIconDiv>
                    <CloseIcon/>
                </CloseIconDiv>
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
                <ModalDiv/>
                <ModalDiv justifyContent="center">
                    <SwitchModalPrompt>Already a member?&nbsp;</SwitchModalPrompt>
                    <SwitchModalPrompt 
                        textDecoration="underline" 
                        onClick={navigateToLoginModal}
                        cursor="pointer">Log In here.</SwitchModalPrompt>
                </ModalDiv>
            </ModalBackground>
        </BlurredBackground>
    )
}

export default SignUpModal;
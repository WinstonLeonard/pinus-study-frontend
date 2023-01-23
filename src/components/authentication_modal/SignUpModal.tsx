import { AuthButton, BlurredBackground, ModalBackground, ModalDiv, ModalInput, ModalTitle, SwitchModalPrompt } from "./ModalComponents";

const SignUpModal = () => {
    return (
        <BlurredBackground>
            <ModalBackground>
                <ModalDiv>
                    <ModalTitle>Sign Up</ModalTitle>
                </ModalDiv>
                <ModalDiv direction="column">
                    <ModalInput placeholder="Email"/>
                </ModalDiv>
                <ModalDiv>
                    <AuthButton>Sign Up</AuthButton>
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
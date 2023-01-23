import { AuthButton, BlurredBackground, CloseIconDiv, ForgetPassword, ModalBackground, ModalDiv, ModalInput, ModalTitle, SwitchModalPrompt } from "./ModalComponents";
import CloseIcon from '@mui/icons-material/Close';

const LoginModal = () => {
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
                        placeholder="Email"/>
                    <ModalInput 
                        placeholder = "Password"
                        type="password"/>
                </ModalDiv>
                <ModalDiv justifyContent="center">
                    <ForgetPassword onClick={()=>{}}>Forget Password?</ForgetPassword>
                </ModalDiv>
                <ModalDiv>
                    <AuthButton>Log In</AuthButton>
                </ModalDiv>
                <ModalDiv/>
                <ModalDiv/>
                <ModalDiv/>
                <ModalDiv justifyContent="center">
                    <SwitchModalPrompt>Don't have an account?&nbsp;</SwitchModalPrompt>
                    <SwitchModalPrompt 
                        textDecoration="underline" 
                        onClick={() => {}}
                        cursor="pointer">Sign Up here.</SwitchModalPrompt>
                </ModalDiv>
            </ModalBackground>
        </BlurredBackground>
    )
}

export default LoginModal;

import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { 
    AuthButton, 
    BlurredBackground, 
    CloseIconDiv, 
    VerificationSentMessage, 
    ModalBackground, 
    ModalDiv, 
    ModalInput, 
    ModalTitle, 
    SwitchModalPrompt 
} from "./ModalComponents";

const VerifyAccountModal = ({
    cancel,
    email,
    showLogInModal,
} : {cancel: () => void; email: string; showLogInModal: () => void}) => {

    return (
        <BlurredBackground>
            <ModalBackground>
                <CloseIconDiv onClick={cancel}>
                    <CloseIcon/>
                </CloseIconDiv>
                <ModalDiv>
                    <ModalTitle>Verification Sent!</ModalTitle>
                </ModalDiv>
                <ModalDiv direction="column">
                    <VerificationSentMessage>
                        A verification link has been sent to {email}!
                        Click the link to activate your account.
                    </VerificationSentMessage>
                </ModalDiv>
                <ModalDiv/>
                <ModalDiv/>
                <ModalDiv/>
                <ModalDiv/>
                <ModalDiv/>
                <ModalDiv justifyContent="center">
                    <SwitchModalPrompt>Didn't get the email?&nbsp;</SwitchModalPrompt>
                    <SwitchModalPrompt 
                        textDecoration="underline" 
                        onClick={() => console.log("RESEND")}
                        cursor="pointer">Resend.</SwitchModalPrompt>
                </ModalDiv>
            </ModalBackground>
        </BlurredBackground>
    )
}

export default VerifyAccountModal;
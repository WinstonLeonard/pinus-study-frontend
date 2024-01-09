import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { 
    AuthButton, 
    BlurredBackground, 
    CloseIconDiv, 
    VerificationSentMessage, 
    ModalBackground, 
    ModalDiv, 
    ModalTitle, 
    VerificationResendSuccess,
    VerificationResendError
} from "./ModalComponents";
import { VERIFICATION_URL } from "../../constants";
import { WhiteLoader } from "../Loader";

const VerifyAccountModal = ({
    cancel,
    email,
    userId,
} : {cancel: () => void; email: string; userId: number}) => {

    const [isResending, setIsResending] = useState<boolean>(false);
    const [resendError, setResendError] = useState<boolean>(false);
    const [resendSuccess, setResendSuccess] = useState<boolean>(false);

    const resendVerification = () => {
        setIsResending(true);

        fetch(`${VERIFICATION_URL}/${userId}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'failure') {
                setResendError(true);
                setResendSuccess(false);
            } else {
                setResendError(false);
                setResendSuccess(true);
            }

            setIsResending(false);
        })
        .catch((err) => {
            console.log(err);
            setResendError(true);
            setResendSuccess(false);
        });
    }

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
                <ModalDiv justifyContent="center" direction="column">
                    <VerificationSentMessage>Didn't get the email?</VerificationSentMessage>
                    <ModalDiv>
                        <AuthButton onClick={resendVerification} disabled={isResending}>
                            {
                                isResending
                                ? <WhiteLoader />
                                : "Resend"
                            }
                        </AuthButton>
                    </ModalDiv>
                    {resendSuccess ? (
                        <VerificationResendSuccess>Resend success!</VerificationResendSuccess>
                    ) : (
                        null
                    )}
                    {resendError ? (
                        <VerificationResendError>Resend error</VerificationResendError>
                    ) : (
                        null
                    )}
                </ModalDiv>
            </ModalBackground>
        </BlurredBackground>
    )
}

export default VerifyAccountModal;
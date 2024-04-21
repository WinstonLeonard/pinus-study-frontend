import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { 
    AuthButton, 
    BlurredBackground, 
    CloseIconDiv, 
    ModalBackground, 
    ModalDiv, 
    ModalTitle,
    ModalInput,
    VerificationResendSuccess,
    VerificationResendError
} from "./ModalComponents";
import { API_URL } from "../../constants";
import { WhiteLoader } from "../Loader";

const ChangePasswordModal = ({
    cancel,
} : {cancel: () => void}) => {
    const [isSending, setIsSending] = useState<boolean>(false);
    const [sendError, setSendError] = useState<string>("");
    const [sendSuccess, setSendSuccess] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const sendLink = () => {
        setIsSending(true);
        setSendError("");
        setSendSuccess(false);

        fetch(`${API_URL}/forgot_password/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'failure') {
                setSendError(data.cause);
                setSendSuccess(false);
            } else {
                setSendError("");
                setSendSuccess(true);
            }
        })
        .catch((err) => {
            console.log(err);
            setSendError(err);
            setSendSuccess(false);
        })
        .finally(() => setIsSending(false));
    }

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    }

    return (
        <BlurredBackground>
            <ModalBackground>
                <CloseIconDiv onClick={cancel}>
                    <CloseIcon/>
                </CloseIconDiv>
                <ModalDiv>
                    <ModalTitle>Enter Email</ModalTitle>
                </ModalDiv>
                <ModalInput 
                        marginBottom="1em"
                        placeholder="Email"
                        onChange={handleEmailChange}
                        value={email}
                        disabled={isSending}
                />
                <ModalDiv>
                    <AuthButton onClick={sendLink} disabled={isSending}>
                        {
                            isSending
                            ? <WhiteLoader />
                            : "Send"
                        }
                    </AuthButton>
                </ModalDiv>

                {sendSuccess ? (
                    <VerificationResendSuccess>Sent succesfully!</VerificationResendSuccess>
                ) : (
                    null
                )}
                {sendError !== "" ? (
                    <VerificationResendError>{sendError}</VerificationResendError>
                ) : (
                    null
                )}
            </ModalBackground>
        </BlurredBackground>
    )
}

export default ChangePasswordModal;
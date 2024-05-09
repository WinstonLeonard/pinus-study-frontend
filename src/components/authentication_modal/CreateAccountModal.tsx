/* eslint-disable */
import {
    AuthButton,
    BlurredBackground,
    CloseIconDiv,
    ErrorMessage,
    // ForgetPassword,
    ModalBackground,
    ModalDiv,
    ModalInput,
    ModalTitle,
    SwitchModalPrompt,
    VerificationResendText,
    VerificationResendTextDisabled,
} from "./ModalComponents";
import { useEffect, useState } from "react";
import { API_URL, VERIFICATION_URL } from "../../constants";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/users/userSlice";
import { WhiteLoader } from "../Loader"
import styled from "styled-components";

const CreateAccountModal = ({
    cancel,
    showLogInModal,
    showVerificationModal,
}: {
    email: string;
    cancel: () => void;
    showLogInModal: () => void;
    showVerificationModal: (email: string, userid: number) => void;
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showError, setShowError] = useState<Boolean>(false);
    const [backendResponse, setBackendResponse] = useState<string>("");
    const [userId, setUserId] = useState<number>(-1);
    const [isResending, setIsResending] = useState<boolean>(false);
    const [resendError, setResendError] = useState<boolean>(false);
    const [showPasswordMismatchError, setShowPasswordMismatchError] =
        useState<Boolean>(false);

    const dispatch = useDispatch();

    /**
     * Detects change in the email input element.
     * @param event The change taking place
     */
    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    } 

    /**
     * Detects changes on the Username input element.
     * @param event The change taking place
     */
    const handleUsernameChange = (
        event: React.FormEvent<HTMLInputElement>
    ): void => {
        setUsername(event.currentTarget.value);
    };

    /**
     * Detects changes on the Password input element.
     * @param event The change taking place
     */
    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    /**
     * Detects changes on the Confirm Password input element.
     * @param event The change taking place
     */
    const handleConfirmPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setConfirmPassword(event.currentTarget.value);
    };

    /**
     * Checks if the confirm password field matches the password field.
     * Toggles whether to show the password mismatch error accordingly.
     * @param event The change taking place
     * @return true if the confirm password matches the password, false otherwise.
     */
    const checkPassword = () : Boolean => {
        if (confirmPassword.trim() === password.trim()) {
            setShowPasswordMismatchError(false);
            return true;
        } else {
            setShowPasswordMismatchError(true);
            return false;
        }
    }

    /**
     * Logs the user into the application. If the user inputs invalid
     * credentials, an error message will be shown.
     */
    const signUp = () => {
        setResendError(false);
        setIsResending(false);

        if (!checkPassword()) {
            return;
        }
        if (username.trim() === "" || password === "") {
            setShowError(true);
            return;
        }
        setIsLoading(true)
        fetch(API_URL + `/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email.toLowerCase(),
                password: password,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === "failure") {
                setBackendResponse(data.cause);
                setShowError(true);
                setUserId(data.cause === "email has been registered but not verified" ? data.userid : -1);
            } else {
                showVerificationModal(email, data.userid);
                setUserId(-1);
            }
        })
        .catch((error) => console.log(error))
        .finally(() => {
            setIsLoading(false);
        });
    };

    /**
     * Resends verification email to an email that
     * has been registered but not yet verified.
     */
    const resendVerification = () => {
        setIsLoading(true);
        setIsResending(true);
        setResendError(false);

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
            } else {
                showVerificationModal(email, userId);
            }
        })
        .catch((err) => {
            console.log(err);
            setResendError(true);
        })
        .finally(() => {
            setIsLoading(false);
            setIsResending(false);
        });
    }

    // /**
    //  * #TODO: Implement when backend is ready
    //  */
    // const forgetPassword = () => {
    //     // Implement code here
    // };

    /**
     * Hides error message upon input to the Username or Password field.
     */
    useEffect(() => {
        setShowError(false);
    }, [username, password]);

    return (
        <BlurredBackground>
            <ModalBackground>
                <CloseIconDiv onClick={cancel}>
                    <CloseIcon />
                </CloseIconDiv>
                <ModalDiv>
                    <ModalTitle>Create Account</ModalTitle>
                </ModalDiv>
                <ModalDiv direction="column">
                    <ModalInput
                        marginBottom="1em"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <ModalInput
                        marginBottom="1em"
                        placeholder="Username"
                        onChange={handleUsernameChange}
                        value={username}
                        disabled={isLoading}
                    />
                    <ModalInput
                        marginBottom="1em"
                        placeholder="Password"
                        type="password"
                        onChange={handlePasswordChange}
                        value={password}
                        disabled={isLoading}
                    />
                    <ModalInput
                        placeholder="Confirm Password"
                        type="password"
                        onChange={handleConfirmPasswordChange}
                        value={confirmPassword}
                        disabled={isLoading}
                    />
                    {showError ? (
                        <ErrorMessage> { backendResponse !== "" ? backendResponse : "Invalid signup credentials!" }</ErrorMessage>
                    ) : null}
                    {showError && backendResponse == "email has been registered but not verified" ? (
                        <ErrorMessage>
                            resend verification?
                            {!isResending ? (
                                <VerificationResendText onClick={resendVerification}>resend</VerificationResendText>
                            ) : (
                                <VerificationResendTextDisabled>resending...</VerificationResendTextDisabled>
                            )}
                        </ErrorMessage>
                    ) : null}
                    {resendError ? (
                        <ErrorMessage>Resend verification error!</ErrorMessage>
                    ) : null}
                    {showPasswordMismatchError ? (
                        <ErrorMessage>Passwords do not match!</ErrorMessage>
                    ) : null}
                </ModalDiv>
                <ModalDiv>
                    <AuthButton onClick={signUp} disabled={isLoading}>
                        {
                            isLoading
                            ? <WhiteLoader />
                            : "Sign Up"
                        }
                    </AuthButton>
                </ModalDiv>
                <ModalDiv />
                <ModalDiv />
                <ModalDiv />
                <ModalDiv justifyContent="center">
                    <SwitchModalPrompt>
                        Already a member?&nbsp;
                    </SwitchModalPrompt>
                    <SwitchModalPrompt
                        textDecoration="underline"
                        onClick={showLogInModal}
                        cursor="pointer"
                    >
                        Log In here.
                    </SwitchModalPrompt>
                </ModalDiv>
            </ModalBackground>
        </BlurredBackground>
    );
};

export default CreateAccountModal;

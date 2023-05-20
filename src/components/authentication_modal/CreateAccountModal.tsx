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
} from "./ModalComponents";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/users/userSlice";

const CreateAccountModal = ({
    email,
    cancel,
    showLogInModal,
}: {
    email: string;
    cancel: () => void;
    showLogInModal: () => void;
}) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showError, setShowError] = useState<Boolean>(false);
    const [backendResponse, setBackendResponse] = useState<string>("");
    const [showPasswordMismatchError, setShowPasswordMismatchError] =
        useState<Boolean>(false);

    const dispatch = useDispatch();

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
        if (!checkPassword()) {
            return;
        }
        if (username.trim() === "" || password === "") {
            setShowError(true);
            return;
        }
        fetch(API_URL + `/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === "failure" || data.token === "") {
                setBackendResponse(data.cause);
                setShowError(true);
            } else {
                dispatch(login({
                    Id: data.userid,
                    Token: data.token
                }));
            }
        })
        .catch((error) => console.log(error));
    };

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
                        placeholder="Username"
                        onChange={handleUsernameChange}
                        value={username}
                    />
                    <ModalInput
                        marginBottom="1em"
                        placeholder="Password"
                        type="password"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                    <ModalInput
                        placeholder="Confirm Password"
                        type="password"
                        onChange={handleConfirmPasswordChange}
                        value={confirmPassword}
                    />
                    {showError ? (
                        <ErrorMessage> { backendResponse !== "" ? backendResponse : "Invalid signup credentials!" }</ErrorMessage>
                    ) : null}
                    {showPasswordMismatchError ? (
                        <ErrorMessage>Passwords do not match!</ErrorMessage>
                    ) : null}
                </ModalDiv>
                <ModalDiv>
                    <AuthButton onClick={signUp}>Sign Up</AuthButton>
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

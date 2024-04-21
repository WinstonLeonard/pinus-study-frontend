import { useEffect, useState } from "react";
import styled from "styled-components";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import { Colors, ScreenSizes } from "../constants";
import { API_URL } from "../constants";
import { WhiteLoader } from "../components/Loader";

const PageWrapper = styled.div`
    padding: 2em;

    ${ScreenSizes.medium_below} {
        display: flex;
        flex-direction: column;
    }
`

const TextContainer = styled.div`
    margin-top: 0.5em;

    ${ScreenSizes.medium_below} {
        margin-top: 1em;
    }
`

const HeaderText = styled.span`
    font-family: "Poppins", "sans-serif";
    font-size: 2em;
    font-weight: 600;
    color: ${Colors.dark_grey};
    background: linear-gradient(to bottom, transparent 50%, ${Colors.blue_2_75} 50%);
    padding: 2.5px 5px 2.5px 5px;
    margin-bottom: 5px;

    ${ScreenSizes.medium_below} {
       font-size: 1.75em;
    }
`

const MessageText = styled.p`
    font-family: "Poppins", "sans-serif";
    font-size: 1em;
    font-weight: 400;
    color: ${Colors.dark_grey};
    padding: 2.5px 5px 2.5px 5px;

    ${ScreenSizes.medium_below} {
        font-size: 1em;
    }
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 0;
`

const Input = styled.input<{ marginBottom?: string }>`
    width: 400px;
    background-color: ${Colors.light_grey_two};
    border: none;
    border-radius: 40px;
    color: ${Colors.dark_grey};
    flex-grow: 1;
    font-family: "Poppins";
    font-weight: 500;
    font-size: 1.15em;
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 0)};
    padding: 0.75em 1.5em 0.75em 1.5em;

    ${ScreenSizes.medium_below} {
        width: 320px;
        font-size: 1em;
    }

    ::placeholder {
        color: ${Colors.light_grey};
    }

    :focus {
        outline: none;
    }
`;

export const AuthButton = styled.button`
    background-color: ${Colors.blue_3};
    border: 2px solid ${Colors.dark_grey};
    border-radius: 40px;
    color: ${Colors.dark_grey};
    cursor: pointer;
    height: 60px;
    width: 400px;
    flex-grow: 1;
    font-family: "Poppins";
    font-weight: 700;
    font-size: 1.15em;
    padding: 0.75em 1.5em 0.75em 1.5em;
    box-shadow: 0px 5px 0 -2.5px ${Colors.blue_2},
        0px 5px 0 -0.5px ${Colors.dark_grey};

    ${ScreenSizes.medium_below} {
        width: 320px;
    }

    :hover {
        background-color: ${Colors.blue_accent};
        color: ${Colors.black};
        position: relative;
        top: 3px;
        // left: 3px;
        box-shadow: 0px 2px 0 -2.5px ${Colors.blue_2},
            0px 2px 0 -0.5px ${Colors.dark_grey};
      }
`;

const ChangePasswordPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [linkError, setLinkError] = useState(false);
    const [recoveryId, setRecoveryId] = useState(0);
    const [secretCode, setSecretCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    useEffect(() => {
        const urlParams = window.location.search.substring(1);
        const id = parseInt(urlParams.split("&")[0].split("=")[1]);
        const code = urlParams.split("&")[1].split("=")[1];
        
        setRecoveryId(id);
        setSecretCode(code);
        checkLink(id, code);
    }, [])

    const checkLink = (recoveryId: number, code: string) => {
        setIsLoading(true);

        fetch(`${API_URL}/password_recovery/${recoveryId}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                secretcode: code
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'failure') {
                setLinkError(true);
            } else {
                setLinkError(false);
            }
        })
        .catch((err) => {
            console.log(err);
            setLinkError(true);
        })
        .finally(() => setIsLoading(false));
    }
    
    const changePassword = (password: string, confirmPassword: string, code: string) => {
        if (password !== confirmPassword) {
            setError("Password doesn't match!");
            return;
        }

        setIsLoading(true);

        fetch(`${API_URL}/password_recovery/${recoveryId}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                secretcode: code
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'failure') {
                setError(data.cause);
            } else {
                setError("");
            }
        })
        .catch((err) => {
            console.log(err);
            setError("Something went wrong!");
        })
        .finally(() => setIsLoading(false));
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event: any) => {
        setConfirmPassword(event.target.value);
    }

    return (
        <div>
            <NavigationBar/>
            <Background>
                <PageWrapper>
                    { !isLoading ? 
                    <TextContainer >
                        {!linkError ? (
                            <HeaderText>Enter Your New Password!</HeaderText>
                        ) : (
                            <HeaderText>Something Went Wrong!</HeaderText>
                        )}
                        {linkError ? (
                            <MessageText> This link has expired or doesn't exist </MessageText>
                        ) : (
                            <FormContainer>
                                <Input
                                    marginBottom="1em"
                                    placeholder="Password"
                                    type="password"
                                    onChange={handlePasswordChange}
                                    value={password}
                                    disabled={isLoading}
                                />
                                <Input
                                    marginBottom="1em"
                                    placeholder="Confirm Password"
                                    type="password"
                                    onChange={handleConfirmPasswordChange}
                                    value={confirmPassword}
                                    disabled={isLoading}
                                />
                                <AuthButton onClick={() => changePassword(password, confirmPassword, secretCode)} disabled={isLoading}>
                                    {isLoading ? <WhiteLoader /> : "Change Password"}
                                </AuthButton>
                                <MessageText>{error}</MessageText>
                            </FormContainer>
                        )}
                        
                    </TextContainer> : null }
                </PageWrapper>
            </Background>
        </div>
    )
}

export default ChangePasswordPage;

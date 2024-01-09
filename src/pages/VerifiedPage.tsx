import { useEffect, useState } from "react";
import styled from "styled-components";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import { Colors, ScreenSizes } from "../constants";
import { VERIFICATION_URL } from "../constants";

const VerifiedPageWrapper = styled.div`
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

const VerifiedPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const urlParams = window.location.search.substring(1);
        const emailId = parseInt(urlParams.split("&")[0].split("=")[1]);
        const secretCode = urlParams.split("&")[1].split("=")[1];

        verifyEmail(emailId, secretCode);
    }, [])

    const verifyEmail = (emailId: number, token: string) => {
        setIsLoading(true);
        
        fetch(`${VERIFICATION_URL}/${emailId}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                secretcode: token
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'failure') {
                setError(true);
            } else {
                setError(false);
            }
        })
        .catch((err) => {
            console.log(err);
            setError(true);
        })
        .finally(() => setIsLoading(false));
    }
    

    return (
        <div>
            <NavigationBar/>
            <Background>
                <VerifiedPageWrapper>
                    { !isLoading ? <TextContainer >
                        {!error ? (
                            <HeaderText>Your Account Has Been Verified!</HeaderText>
                        ) : (
                            <HeaderText>Something Went Wrong!</HeaderText>
                        )}
                        {!error ? (
                            <MessageText> Congratulations! You have verified your account.</MessageText>
                        ) : (
                            <MessageText> This verification link is either expired or doesn't exist </MessageText>
                        )}
                    </TextContainer> : null }
                </VerifiedPageWrapper>
            </Background>
        </div>
    )
}

export default VerifiedPage;

import { useEffect } from "react";
import styled from "styled-components";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import { Colors, ScreenSizes } from "../constants";
import { selectUser } from "../redux/features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsRequest } from "../requests";

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
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        getUserDetailsRequest(user.Id, dispatch);
    }, [])

    return (
        <div>
            <NavigationBar/>
            <Background>
                <VerifiedPageWrapper>
                    <TextContainer >
                        <HeaderText>Your Account Has Been Verified!</HeaderText>
                        <MessageText onClick={() => console.log(user)}>Congratulations!</MessageText>
                    </TextContainer>
                </VerifiedPageWrapper>
            </Background>
        </div>
    )
}

export default VerifiedPage;

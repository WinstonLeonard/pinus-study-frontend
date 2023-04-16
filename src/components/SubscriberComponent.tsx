import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../constants';

const SubscriberComponentBackground = styled.div`
    width: 18vw;
    height: 4vw;
    border: none;
    border-radius: 20px;
    background-color: ${Colors.white};
    color: ${Colors.dark_grey};
    font-family: 'Poppins', 'sans-serif';
    font-weight: 600;
    font-size: 1.60em;
    padding: 0.5vw 1vw 0.5vw 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
    :hover {
        background-color: ${Colors.white_accent};
    }
`

const ProfilePicDiv = styled.div`
    width: 20%;
    display: grid;
    place-items: center;
`

const TempProfilePic = styled.div`
    background-color: ${Colors.red};
    border-radius: 50%;
    width: 35px;
    height: 35px;
`

const NameDiv = styled.div`
    margin-left: 12px;
    width: 80%;
    padding: 6px 0px;
    vertical-align: middle;
    text-align: left;
`

const SubscriberComponent = ({ subscriberId, subscriberUsername }: { subscriberId: string, subscriberUsername: string }) => {

    const navigate = useNavigate();

    const navigateToProfilePage = () => {
        navigate(`/profile/${subscriberId}`)
    }

    return (
        <SubscriberComponentBackground>
            <ProfilePicDiv>
                <TempProfilePic/>
            </ProfilePicDiv>
            <NameDiv onClick={navigateToProfilePage}>
                @{subscriberUsername}
            </NameDiv>
        </SubscriberComponentBackground>
    )
}

export default SubscriberComponent;
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../constants';
import pfp from '../assets/default_pfp.png';

const SubscriberComponentBackground = styled.div`
    width: 18vw;
    height: 4vw;
    border: 2px solid ${Colors.dark_grey};
    border-radius: 20px;
    background-color: ${Colors.blue_3};
    color: ${Colors.dark_grey};
    font-family: 'Poppins', 'sans-serif';
    font-weight: 600;
    font-size: 1.60em;
    padding: 0.5vw 1vw 0.5vw 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 5px 5px 0px ${Colors.green_2},
        5px 5px 0px 2px ${Colors.dark_grey};
    
    :hover {
        background-color: ${Colors.blue_accent};
        position: relative;
        top: 3px;
        left: 3px;
        box-shadow: 2px 2px 0px ${Colors.green_2},
            2px 2px 0px 2px ${Colors.dark_grey};
    }
`

const ProfilePicDiv = styled.div`
    width: 20%;
    display: grid;
    place-items: center;
`

const TempProfilePic = styled.img`
    background-color: ${Colors.white_1};
    border: 2px solid ${Colors.dark_grey};
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

const Name = styled.span`
    font-size: 0.875em;
`

const SubscriberComponent = ({ subscriberId, subscriberUsername }: { subscriberId: string, subscriberUsername: string }) => {

    const navigate = useNavigate();

    const navigateToProfilePage = () => {
        navigate(`/profile/${subscriberId}`)
    }

    return (
        <SubscriberComponentBackground>
            <ProfilePicDiv>
                <TempProfilePic src={pfp}/>
            </ProfilePicDiv>
            <NameDiv onClick={navigateToProfilePage}>
                <Name>@{subscriberUsername}</Name>
            </NameDiv>
        </SubscriberComponentBackground>
    )
}

export default SubscriberComponent;
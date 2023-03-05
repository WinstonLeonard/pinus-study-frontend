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
    vertical-align: middle;
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

const SubscriberComponent = ({ subscriberName }: { subscriberName: string }) => {
    return (
        <SubscriberComponentBackground>
            <ProfilePicDiv>
                <TempProfilePic/>
            </ProfilePicDiv>
            <NameDiv>
                @{subscriberName}
            </NameDiv>
        </SubscriberComponentBackground>
    )
}

export default SubscriberComponent;
import { useEffect } from "react";
import styled from "styled-components";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import ProfileComponent from "../components/ProfileComponent";
import ThreadComponent from "../components/ThreadComponent";
import { Colors, ScreenSizes } from "../constants";
import { selectUser } from "../redux/features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsRequest } from "../requests";
import { RightSide } from "./ModulePage";
import MyModules from "../components/MyModules";

const ProfilePageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 8.5fr 1.5fr;
    grid-column-gap: 2em;
    padding: 2em;

    ${ScreenSizes.medium_below} {
        display: flex;
        flex-direction: column;
    }
`

const ThreadWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;


const ThreadComponentWrapper = styled.span`
    margin-top: 1em;
`

const MostRecentPosts = styled.span`
    font-family: "Poppins", "sans-serif";
    font-size: 2em;
    font-weight: 600;
    margin-top: 0.5em;
    color: ${Colors.white};
`

const ProfilePage = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        getUserDetailsRequest(user.Id, dispatch);
    }, [])

    return (
        <div>
            <NavigationBar/>
            <Background>
                <ProfilePageWrapper>
                    <ProfileComponent user={user} userId={user.Id}/>
                    <ThreadWrapper>
                        <MostRecentPosts>Most Recent Posts</MostRecentPosts>
                        {user.RecentThreads.map(thread => {
                            return (
                            <ThreadComponentWrapper>
                                <ThreadComponent threadId={thread.Id} type="MODULE_PAGE"/>
                            </ThreadComponentWrapper>
                            )
                        })}
                    </ThreadWrapper>
                    <RightSide>
                        <MyModules />
                    </RightSide>
                </ProfilePageWrapper>
            </Background>
        </div>
    )
}

export default ProfilePage;

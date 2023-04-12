import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import ProfileComponent from "../components/ProfileComponent";
import ThreadComponent from "../components/ThreadComponent";
import { API_URL, Colors } from "../constants";
import { User, UserInitialState } from "../redux/features/users/userSlice";

const ProfilePageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 8.5fr;
    grid-column-gap: 2em;
    padding: 2em;
`

const ThreadWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const ThreadComponentWrapper = styled.span`
    margin-top: 1em;
`

const MostRecentPosts = styled.span`
    font-family: Poppins-Bold;
    font-size: 2em;
    color: ${Colors.white};
`

const ProfilePage = () => {

    const [user, setUser] = useState<User>(UserInitialState);
    
    const { userId } = useParams();

    const getUserDetails = () => {
        fetch(API_URL + `/user/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUser(data);
            });
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    return (
        <div>
            <NavigationBar/>
            <Background>
                <ProfilePageWrapper>
                    <ProfileComponent user={user} userId={userId}/>
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
                </ProfilePageWrapper>
            </Background>
        </div>
    )
}

export default ProfilePage;
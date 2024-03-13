import { useEffect, useState } from "react";
import styled from "styled-components";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import ProfileComponent from "../components/ProfileComponent";
import ThreadComponent from "../components/ThreadComponent";
import { API_URL, Colors, ScreenSizes } from "../constants";
import { UserInitialState } from "../redux/features/users/userSlice";
import { RightSide } from "./ModulePage";
import MyModules from "../components/MyModules";
import { useParams } from "react-router-dom";

const ProfilePageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 8.5fr 1.5fr;
  grid-column-gap: 2em;
  padding: 2em;

  ${ScreenSizes.medium_below} {
    display: flex;
    flex-direction: column;
  }
`;

const ThreadWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThreadComponentWrapper = styled.span`
  margin-top: 1em;
`;

const TextContainer = styled.div`
  margin-top: 0.5em;

  ${ScreenSizes.medium_below} {
    margin-top: 1em;
  }
`;

const MostRecentPosts = styled.span`
  font-family: "Poppins", "sans-serif";
  font-size: 2em;
  font-weight: 600;
  color: ${Colors.dark_grey};
  background: linear-gradient(
    to bottom,
    transparent 50%,
    ${Colors.blue_2_75} 50%
  );
  padding: 2.5px 5px 2.5px 5px;

  ${ScreenSizes.medium_below} {
    font-size: 1.75em;
  }
`;

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState(UserInitialState);
  const [threads, setThreads] = useState(user.RecentThreads);

  useEffect(() => {
    const userIdNum = userId ? parseInt(userId, 10) : null;
    if (userIdNum) {
      fetchUser(userIdNum);
    }
  }, [userId]);
  const fetchUser = (userId: Number) => {
    fetch(API_URL + `/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setThreads(user.RecentThreads);
  }, [user])
  if (user == UserInitialState) {
    return (
      <div>
        <NavigationBar />
      </div>
    )
  }
  return (
    <div>
      <NavigationBar />
      <Background>
        <ProfilePageWrapper>
          <ProfileComponent user={user} userId={userId?+userId:0} />
          <ThreadWrapper>
            <TextContainer>
              <MostRecentPosts>Most Recent Posts</MostRecentPosts>
            </TextContainer>
            {threads.map((thread) => {
              return (
                <ThreadComponentWrapper>
                  <ThreadComponent threadId={thread.Id} type="MODULE_PAGE" threadComponent = {thread} />
                </ThreadComponentWrapper>
              );
            })}
          </ThreadWrapper>
          <RightSide>
            <MyModules />
          </RightSide>
        </ProfilePageWrapper>
      </Background>
    </div>
  );
};

export default ProfilePage;
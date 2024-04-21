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
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Review, ReviewInitialState } from '../redux/features/reviews/reviewSlice';
import ReviewComponent from '../components/ReviewComponent';
import { userInfo } from "os";

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

const TitleContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

  const Button = styled.button<{subscribed?: boolean, mobilePadding?: string}>`
  border-radius: 50px;
  border: 2px solid ${Colors.dark_grey};
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  font-size: 1em;
  padding: 0px 40px;
  color: ${Colors.dark_grey};
  background-color: ${props => props.subscribed? Colors.white_1: Colors.blue_3};
  box-shadow: 0px 5px 0 -2.5px ${Colors.blue_2},
    0px 5px 0 -0.5px ${Colors.dark_grey};

  :hover {
    cursor: pointer;
    background-color: ${props => props.subscribed? Colors.blue_3 : Colors.blue_accent};
    position: relative; 
    top: 3px;
    box-shadow: 0px 2px 0 -2.5px ${Colors.blue_2},
        0px 2px 0 -0.5px ${Colors.dark_grey};
  }

  ${ScreenSizes.medium_below} {
    padding: ${props => props.mobilePadding? props.mobilePadding : '0px 20px'};
    font-size: 0.875em;
    border: 1px solid ${Colors.dark_grey};
    box-shadow: 0px 5px 0 -2.5px ${Colors.blue_2},
    0px 5px 0 -1.5px ${Colors.dark_grey};

    :hover {
      background-color: ${props => props.subscribed? Colors.blue_3 : Colors.blue_accent};
      position: relative; 
      top: 3px;
      box-shadow: 0px 2px 0 -2.5px ${Colors.blue_2},
          0px 2px 0 -1.5px ${Colors.dark_grey};
    }
  }
`;

const ReviewListContainer = styled.div`
  margin-left: 8px;
`;

const ReviewComponentWrapper = styled.span`
    margin-top: 1em;
`

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState(UserInitialState);
  const [threads, setThreads] = useState(user.RecentThreads);
  const [viewPost, setViewPost] = useState<boolean>(true)
  const [reviews, setReviews] = useState<Review[]>([ReviewInitialState]);


  useEffect(() => {
    const userIdNum = userId ? parseInt(userId, 10) : null;
    if (userIdNum) {
      fetchUser(userIdNum);
      fetchReviews();
    }
  }, [userId]);

  const fetchUser = (userId: Number) => {
    fetch(API_URL + `/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUser(data)
        if (data.Username === '') {
          navigate('/PageNotFound');
        }
      })
      .catch((error) => {
        console.log(error);
        navigate('/PageNotFound');
      });
  };
  
  useEffect(() => {
    console.log("REVIEWS:")
    console.log(reviews)
  }, [reviews])

  const fetchReviews = () => {
    fetch(API_URL + `/review/user/${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log("REVIEW fetch: ");
            console.log(data)
            setReviews(data.review.map((r: any) => ({
                ...r,
                Comments: []
            })))
        })
        .catch(error => console.log(error))
}

  const showReviews = () => {
    setViewPost(!viewPost);
    console.log("loll");
  }

  useEffect(() => {
    setThreads(user.RecentThreads);
  }, [user])
  if (user === UserInitialState) {
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
          <ProfileComponent user={user} userId={userId?+userId:0} fetchUser={fetchUser} />
          <ThreadWrapper>
          {viewPost ? (
            <>
              <TitleContainer>
                <TextContainer>
                  <MostRecentPosts>Most Recent Posts</MostRecentPosts>
                </TextContainer>
                <Button onClick={showReviews} mobilePadding="10px 20px">
                  See My Reviews
                </Button>
              </TitleContainer>
              {threads.map((thread) => (
                <ThreadComponentWrapper key={thread.Id}>
                  <ThreadComponent
                    threadId={thread.Id}
                    type="MODULE_PAGE"
                    threadComponent={thread}
                  />
                </ThreadComponentWrapper>
              ))}
            </>
          ) : (
            <>
            <TitleContainer>
              <TextContainer>
                <MostRecentPosts>Most Recent Reviews</MostRecentPosts>
              </TextContainer>
              <Button onClick={showReviews} mobilePadding="10px 20px">
                See My Posts
              </Button>
            </TitleContainer>
            {reviews.map((review) => (
                <ReviewComponentWrapper >
                  <ReviewComponent
                      review = {review}
                  />
                </ReviewComponentWrapper>
              ))}
            </>
          )}
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
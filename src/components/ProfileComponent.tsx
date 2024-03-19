import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Colors, ScreenSizes } from "../constants";
import { User, selectId, logout, updateUser, selectToken } from "../redux/features/users/userSlice";
import { isLoggedIn } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { pfp } from "../assets";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { USER_URL } from "../constants";

const ProfileContainer = styled.div`
  background-color: ${Colors.green_2};
  border: 2px solid ${Colors.dark_grey};
  width: 12.5vw;
  padding-top: 4vw;
  padding-bottom: 4vw;
  padding-right: 2.5vw;
  padding-left: 2.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  flex-direction: column;
  max-height: 70vh;


  ${ScreenSizes.extra_small} {
    border: 1px solid;
    box-shadow: 3px 3px 0 ${Colors.blue_3},
        3px 3px 0 1px ${Colors.dark_grey};
  }

  ${ScreenSizes.small_up} {
      border: 2px solid ${Colors.dark_grey};
      box-shadow: 7px 7px 0 ${Colors.blue_3},
          7px 7px 0 2px ${Colors.dark_grey};
  }

  ${ScreenSizes.medium_below} {
    width: auto;
  }
`;

const ProfilePicture = styled.div<{ notMyProfile?: boolean }>`
  width: 11vw;
  height: 11vw;
  background-color: ${(props) =>
    props.notMyProfile ? Colors.yellow : Colors.red};
  border: none;
  border-radius: 20vw;

  ${ScreenSizes.medium_below} {
    width: 20vw;
    height: 20vw;
  }

  ${ScreenSizes.extra_small} {
    width: 30vw;
    height: 30vw;
  }
`;

const ProfilePictureImage = styled.img`
  border: 2px solid ${Colors.dark_grey};
  border-radius: calc(11vw / 2);
  background-color: ${Colors.white_1};
  width: 11vw;
  height: 11vw;
  box-shadow: 0px 0px 0 5px ${Colors.blue_2},
    0px 0px 0 7px ${Colors.dark_grey};

  ${ScreenSizes.medium_below} {
    border-radius: calc(20vw / 2);
    width: 20vw;
    height: 20vw;
  }

  ${ScreenSizes.extra_small} {
    border-radius: calc(30vw / 2);
    width: 30vw;
    height: 30vw;
  }
`;

const NameDiv = styled.div<{ paddingTop?: string, isChanging?: Boolean }>`
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : "0em")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.span`
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  color: ${Colors.dark_grey};
  font-size: 1.75em;

  ${ScreenSizes.large_below} {
    font-size: 1em;
  }

  ${ScreenSizes.medium_below} {
    font-size: 1.25em;
  }

  ${ScreenSizes.extra_small} {
    font-size: 1.5em;
  }
`;

const ChangeUsernameInputBar = styled.span`
  padding: 0.5rem 1rem;
  background: ${Colors.white};
  border-radius: 25px;
  border: 2px solid ${Colors.dark_grey};
  width: 100%;
  align-items: center;
  display: flex;
  gap: 0.5rem;
`;

const ChangeUsernameInput = styled.input`
  font-family: "Poppins", sans-serif;
  border: none;
  width: 100%;
  background: ${Colors.white};
  color: ${Colors.dark_grey};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${Colors.light_grey};
    font-style: italic;
  }

  ${ScreenSizes.medium_below} {
    width: 100%;
  } 
`;

const IconButton = styled.div`
  background-color: ${Colors.blue_3};
  color: ${Colors.dark_grey};
  cursor: pointer;
  border-radius: 50px;
  border: 2px solid ${Colors.dark_grey};
  padding: 0.2em;
  margin: 0 0.2em;
  box-shadow: 0px 5px 0 -2.5px ${Colors.blue_2},
    0px 5px 0 -0.5px ${Colors.dark_grey};

  :hover {
    background-color: ${Colors.blue_accent};
    color: ${Colors.black};
    position: relative;
    top: 3px;
    // left: 3px;
    box-shadow: 0px 2px 0 -2.5px ${Colors.blue_2},
        0px 2px 0 -0.5px ${Colors.dark_grey};
  }

  ${ScreenSizes.extra_small} {
    border: 1px solid;
    box-shadow: 3px 3px 0 ${Colors.blue_2},
        3px 3px 0 1px ${Colors.dark_grey};
      
    :hover {
      top: 2px;
      left: 2px;
      box-shadow: 1px 1px 0 ${Colors.blue_2},
        1px 1px 0 1px ${Colors.dark_grey};
    }
  }
`

const Button = styled.div<{ marginTop?: string }>`
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0em")};
  background-color: ${Colors.blue_3};
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  color: ${Colors.dark_grey};
  cursor: pointer;
  width: 100%;
  text-align: center;
  border-radius: 50px;
  border: 2px solid ${Colors.dark_grey};
  padding-top: 0.375em;
  padding-bottom: 0.375em;
  box-shadow: 0px 5px 0 -2.5px ${Colors.blue_2},
    0px 5px 0 -0.5px ${Colors.dark_grey};

  :hover {
    background-color: ${Colors.blue_accent};
    color: ${Colors.black};
    position: relative;
    top: 3px;
    // left: 3px;
    box-shadow: 0px 2px 0 -2.5px ${Colors.blue_2},
        0px 2px 0 -0.5px ${Colors.dark_grey};
  }

  ${ScreenSizes.extra_small} {
    border: 1px solid;
    box-shadow: 3px 3px 0 ${Colors.blue_2},
        3px 3px 0 1px ${Colors.dark_grey};
      
    :hover {
      top: 2px;
      left: 2px;
      box-shadow: 1px 1px 0 ${Colors.blue_2},
        1px 1px 0 1px ${Colors.dark_grey};
    }
  }

  ${ScreenSizes.medium_below} {
    width: 75%;
  }
`;

const PostAndLikes = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: row;
`;

const NumberAndDescription = styled.div`
  text-align: center;
`;

const Number = styled.div`
  font-family: "Poppins", "sans-serif";
  font-size: 2em;
  font-weight: 500;

  ${ScreenSizes.medium_below} {
    font-size: 1.5em;
  }
`;

const Description = styled.div`
  font-family: "Poppins", "sans-serif";
  font-size: 1em;
  font-weight: 500;
  text-align: center;

  ${ScreenSizes.medium_below} {
    font-size: 1em;
  }
`;

const VerticalLine = styled.div`
  background-color: ${Colors.light_grey_50};
  margin-left: 1.5em;
  margin-right: 1.5em;
  width: 0.05vw;
  height: 10vh;
`;

export const ErrorMessage = styled.p`
    color: ${Colors.red};
    font-family: "Poppins";
    font-weight: 400;
    font-size: 0.9em;
    margin-top: 0.5em;
`;

const ProfileComponent = ({
  user,
  userId,
  fetchUser,
}: {
  user: User;
  userId?: number;
  fetchUser: (userId: Number) => void;
}) => {
  const [isChangingUsername, setIsChangingUsername] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>(user.Username);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const currUserId = useSelector(selectId);

  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const bookmarkButtonHandler = () => {
    navigate("/bookmarked");
  }

  /**
   * Change the username of the user.
   *
   * @param newUsername The new username
   * @returns The status of the request
   */
  const changeUsername = (newUsername: string): string => {
    setIsLoading(true);
    setError("");

    fetch(USER_URL + '/change_username/' + userId, {
      method: "PUT",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
          username: username
      }),
    }).then(response => response.json())
    .then(data => {
        if (data.status === "failure") {
            setError(data.cause);
            console.log(data.cause);
            return "fail";
        }

        fetchUser(userId ? userId:0);
        setError("");
        setIsChangingUsername(false);
        return "success";
    })
    .catch(error => console.log(error))
    .finally(() => setIsLoading(false));

    return "success";
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      changeUsername(username);
    }
  };

  return (
    <ProfileContainer>
      <ProfilePicture>
        <ProfilePictureImage src={pfp} />
      </ProfilePicture>

      <NameDiv paddingTop="1em" isChanging={isChangingUsername}>
        {!isChangingUsername && !isLoading ? (
          <Name>@{user.Username}</Name>
        ) : (
          <ChangeUsernameInputBar>
            <ChangeUsernameInput onChange={(e) => setUsername(e.target.value)} placeholder="Change Username?" value={username} onKeyDown={handleKeyPress}></ChangeUsernameInput>
          </ChangeUsernameInputBar>
        )}
        {!isChangingUsername ? isLoggedIn(token, user.Id) && currUserId === userId && (
          <IconButton onClick={() => setIsChangingUsername(true)}>
            <EditIcon></EditIcon>
          </IconButton>
        ) : (
          <>
            <IconButton onClick={() => {
              changeUsername(username);
            }}>
              <CheckIcon></CheckIcon>
            </IconButton>
            <IconButton onClick={() => {
              setUsername(user.Username);
              setIsChangingUsername(false);
              setError("");
            }}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </>
        )}
        
      </NameDiv>

      {error ? <ErrorMessage>{error}</ErrorMessage> : <></>}

      {/* <Button marginTop='1em'>View My Modules</Button> */}
      {/* <Button marginTop='0.5em'>Edit My Profile</Button> */}
      {
        isLoggedIn(token, user.Id) && currUserId === userId &&
         (<Button marginTop="0.5em" onClick={logOut}>
            Log Out
          </Button>)
      }
      <PostAndLikes>
        <NumberAndDescription>
          <Number>{user.NumberOfQuestionsAsked}</Number>
          <Description>
            Questions
            <br />
            Asked
          </Description>
        </NumberAndDescription>
        <VerticalLine />
        <NumberAndDescription>
          <Number>{user.NumberOfLikesReceived}</Number>
          <Description>
            Likes
            <br />
            Received
          </Description>
        </NumberAndDescription>
      </PostAndLikes>
      {
        isLoggedIn(token, user.Id) && currUserId === userId &&
        <Button marginTop="1em" onClick={bookmarkButtonHandler}>
          Bookmarked
        </Button>
      }
    </ProfileContainer>
  );
};

export default ProfileComponent;

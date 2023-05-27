import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Colors, ScreenSizes } from "../constants";
import { User } from "../redux/features/users/userSlice";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/users/userSlice";
import { pfp } from "../assets";

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
  background-color: ${Colors.white};
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

const NameDiv = styled.div<{ paddingTop?: string }>`
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : "0em")};
  display: flex;
  justify-content: center;
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

const ProfileComponent = ({
  user,
  userId,
}: {
  user: User;
  userId?: number;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <ProfileContainer>
      <ProfilePicture>
        <ProfilePictureImage src={pfp} />
      </ProfilePicture>

      <NameDiv paddingTop="1em">
        <Name>@{user.Username}</Name>
      </NameDiv>
      {/* <Button marginTop='1em'>View My Modules</Button> */}
      {/* <Button marginTop='0.5em'>Edit My Profile</Button> */}
      <Button marginTop="0.5em" onClick={logOut}>
        Log Out
      </Button>
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
    </ProfileContainer>
  );
};

export default ProfileComponent;

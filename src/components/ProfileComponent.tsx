import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Colors, ScreenSizes } from "../constants";
import { User } from "../redux/features/users/userSlice";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/users/userSlice";
import { pfp } from "../assets";

const ProfileContainer = styled.div`
  background-color: ${Colors.white};
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
`;

const ProfilePictureImage = styled.img`
  background-color: ${Colors.white};
  width: 11vw;
  height: 11vw;
`;

const NameDiv = styled.div<{ paddingTop?: string }>`
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : "0em")};
  display: flex;
  justify-content: center;
`;

const Name = styled.span`
  font-family: "Poppins", "sans-serif";
  color: ${Colors.dark_grey};
  font-size: 1.75em;
`;

const Button = styled.div<{ marginTop?: string; red?: boolean }>`
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0em")};
  background-color: ${(props) => (props.red ? Colors.red : Colors.blue)};
  font-family: "Poppins", "sans-serif";
  color: ${Colors.white};
  cursor: pointer;
  width: 100%;
  text-align: center;
  border-radius: 50px;
  padding-top: 0.375em;
  padding-bottom: 0.375em;

  :hover {
    background-color: ${(props) =>
      props.red ? Colors.red_accent : Colors.blue_accent};
    color: ${Colors.white_accent};
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
`;

const Description = styled.div`
  font-family: "Poppins", "sans-serif";
  font-size: 1em;
  text-align: center;
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
      <Button red marginTop="0.5em" onClick={logOut}>
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

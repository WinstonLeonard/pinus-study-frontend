import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Colors, ScreenSizes } from "../../constants";
import pfp from "../../assets/default_pfp.png";

const UserComponentBackground = styled.div`
  border: 2px solid ${Colors.dark_grey};
  border-radius: 20px;
  background-color: ${Colors.blue_3};
  color: ${Colors.dark_grey};
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  font-size: 1.6em;
  padding: 0.5vw 1vw 0.5vw 1vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 0.5em;
  box-shadow: 5px 5px 0px ${Colors.green_2}, 5px 5px 0px 2px ${Colors.dark_grey};
  margin-bottom: 10px;

  :hover {
    background-color: ${Colors.blue_accent};
    position: relative;
    top: 3px;
    left: 3px;
    box-shadow: 2px 2px 0px ${Colors.green_2},
      2px 2px 0px 2px ${Colors.dark_grey};
  }

  ${ScreenSizes.medium_below} {
    border: 1px solid ${Colors.dark_grey};
    box-shadow: 5px 5px 0px ${Colors.green_2},
      5px 5px 0px 1px ${Colors.dark_grey};

    :hover {
      box-shadow: 2px 2px 0px ${Colors.green_2},
        2px 2px 0px 1px ${Colors.dark_grey};
    }
  }
`;

const ProfilePicDiv = styled.div`
  width: 25%;
  display: grid;
  place-items: center;
`;

const TempProfilePic = styled.img`
  background-color: ${Colors.white_1};
  border: 2px solid ${Colors.dark_grey};
  border-radius: 50%;
  width: 35px;
  height: 35px;

  ${ScreenSizes.medium_below} {
    border: 1px solid ${Colors.dark_grey};
  }
`;

const NameDiv = styled.div`
  display: flex;
`;

const Name = styled.span`
  font-size: 0.75em;

  ${ScreenSizes.medium_below} {
    font-size: 0.625em;
  }
`;

const UserComponent = ({
  userId,
  username,
  close,
}: {
  userId: number;
  username: string;
  close: () => void;
}) => {
  const navigate = useNavigate();

  const navigateToProfilePage = () => {
    close();
    navigate(`/profile/${userId}`);
  };

  return (
    <UserComponentBackground onClick={navigateToProfilePage}>
      <ProfilePicDiv>
        <TempProfilePic src={pfp} />
      </ProfilePicDiv>
      <NameDiv>
        <Name>@{username}</Name>
      </NameDiv>
    </UserComponentBackground>
  );
};

export default UserComponent;

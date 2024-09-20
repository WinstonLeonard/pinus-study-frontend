import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Colors } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin } from "../redux/features/modal/modal";
import {
  selectId,
  selectToken,
  selectUser,
} from "../redux/features/users/userSlice";
import { getUserDetailsRequest } from "../requests";
import { isLoggedIn } from "../utils";
import { ScreenSizes } from "../constants";

export const ModuleComponent = styled.div`
  cursor: pointer;
  width: 12.5vw;
  height: 7.5vw;
  border: 2px solid ${Colors.dark_grey};
  border-radius: 20px;
  background-color: ${Colors.blue_3};
  color: ${Colors.dark_grey};
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  font-size: 1.25em;
  padding: 0.5vw 1vw 0.5vw 1vw;
  display: flex; /* Added display property */
  justify-content: center; /* Center text horizontally */
  align-items: center; /* Center text vertically */
  transition: background-color 0.3s ease, color 0.3s ease; /* Added transition property */

  ${ScreenSizes.extra_small} {
    width: 125px;
    height: 67.6px;
    font-size: 20px;
    box-shadow: 2px 2px 0 ${Colors.blue_2}, 2px 2px 0 1px ${Colors.dark_grey};
    border: 1px solid ${Colors.dark_grey};

    :hover {
      background-color: ${Colors.blue_accent};
      color: ${Colors.black};
      position: relative;
      top: 1px;
      left: 1px;
      box-shadow: 1px 1px 0 ${Colors.blue_2}, 1px 1px 0 1px ${Colors.dark_grey};
    }
  }

  ${ScreenSizes.small_up} {
    width: 150px;
    height: 81px;
    font-size: 24px;
    box-shadow: 2px 2px 0 ${Colors.blue_2}, 2px 2px 0 2px ${Colors.dark_grey};
    :hover {
      background-color: ${Colors.blue_accent};
      color: ${Colors.black};
      position: relative;
      top: 1px;
      left: 1px;
      box-shadow: 1px 1px 0 ${Colors.blue_2}, 1px 1px 0 2px ${Colors.dark_grey};
    }
  }

  ${ScreenSizes.medium_up} {
    width: 150px;
    height: 81px;
    font-size: 24px;
  }

  ${ScreenSizes.large_up} {
    width: 175px;
    height: 95px;
    font-size: 24px;
    box-shadow: 4px 4px 0 ${Colors.blue_2}, 4px 4px 0 2px ${Colors.dark_grey};
    :hover {
      background-color: ${Colors.blue_accent};
      color: ${Colors.black};
      position: relative;
      top: 2px;
      left: 2px;
      box-shadow: 2px 2px 0 ${Colors.blue_2}, 2px 2px 0 2px ${Colors.dark_grey};
    }
  }

  ${ScreenSizes.extra_large_up} {
    width: 270px;
    height: 108px;
    font-size: 36px;
  }

  // animation: ${keyframes`

      //   5% {
      //     top: 2px;
      //     left: 2px;
      //     background-color: ${Colors.white_accent};
      //     color:${Colors.black};
      //   }
      // `} 0.3s ease-in-out;
`;

const MyModulesContainer = styled.div<{ mobileDisplay?: string }>`
  background-color: ${Colors.green_2};
  border: 2px solid;
  border-color: ${Colors.dark_grey};
  border-radius: 20px;
  min-height: 70vh;
  max-height: 70vh;
  max-width: 25vw;
  min-width: 25vw;
  padding: 1.5em 1.5em 1.5em 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-shadow: 7px 7px 0 ${Colors.blue_3}, 7px 7px 0 2px ${Colors.dark_grey};
  position: -webkit-sticky;
  position: sticky;
  top: 100px;

  @media only screen and (max-width: 992px) {
    display: ${(props) => (props.mobileDisplay ? props.mobileDisplay : "flex")};
  }
`;

const MyModulesHeading = styled.span`
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  color: ${Colors.dark_grey};
  padding: 1.5px 5px 1.5px 5px;
  font-size: 1.625em;
  display: flex; /* Added property to enable flexbox */
  align-items: flex-start; /* Added property to align items to flex-start */
`;

const MyModulesText = styled.span`
  padding-top: 1.25em;
  display: flex;
  font-family: "Poppins", "sans-serif";
  font-weight: 500;
  font-size: 1.25em;
  font-style: italic;
  justify-content: center;
`;

const MyModulesChildren = styled.div<{ marginTop?: string }>`
  background: ${Colors.blue_3};
  border-radius: 20px;
  border: 2px solid ${Colors.dark_grey};
  color: ${Colors.dark_grey};
  cursor: pointer;
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  font-size: 2.25em;
  padding: 0.25em 0.5em 0.25em 0.5em;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0.1em")};
  margin-bottom: 0.1em;
  width: 12.5vw;
  display: flex; /* Added property to enable flexbox */
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
  box-shadow: 4px 4px 0 ${Colors.blue_2}, 4px 4px 0 2px ${Colors.dark_grey};

  :hover {
    background-color: ${Colors.blue_accent};
    color: ${Colors.black};
    position: relative;
    top: 2px;
    left: 2px;
    box-shadow: 2px 2px 0 ${Colors.blue_2}, 2px 2px 0 2px ${Colors.dark_grey};
  }

  ${ScreenSizes.extra_small} {
    font-size: 18px;
  }

  ${ScreenSizes.small_up} {
    font-size: 24px;
  }

  ${ScreenSizes.medium_up} {
    font-size: 24px;
  }

  ${ScreenSizes.large_up} {
    font-size: 24px;
  }

  ${ScreenSizes.extra_large_up} {
    font-size: 36px;
  }
`;

const Scrollable = styled.div`
  margin-top: 0.75em;
  padding-right: 7px; // ensure box shadow of children is not cut
  overflow-y: scroll;
  align-content: start;
  gap: 12px 0px;
  height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  ::-webkit-scrollbar {
    display: none; //hide
  }
`;

const ScrollableItem = styled.div`
  flex-basis: 100%;
`;

export const MyModulesDiv = styled.div`
  display: grid;
  align-items: center;
  padding-right: 0;
  padding-top: 0;
`;

export const ModuleComponentWrapper = ({
  moduleCode,
}: {
  moduleCode: string;
}) => {
  const handleButtonClick = () => {
    // Redirect to the desired URL on button click
    window.location.href = "/module/" + moduleCode;
  };

  return (
    <ModuleComponent onClick={handleButtonClick}>{moduleCode}</ModuleComponent>
  );
};

const MyModulesChildrenWrapper = ({ moduleCode }: { moduleCode: string }) => {
  const handleButtonClick = () => {
    // Redirect to the desired URL on button click
    window.location.href = "/module/" + moduleCode;
  };

  return (
    <MyModulesChildren onClick={handleButtonClick}>
      {moduleCode}
    </MyModulesChildren>
  );
};

const LoginText = styled.span`
  color: ${Colors.hyperlink};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${Colors.hyperlink_hover};
  }
`;

const MyModulesGuest = () => {
  const dispatch = useDispatch();

  return (
    <MyModulesContainer mobileDisplay="none">
      <MyModulesHeading>My Modules</MyModulesHeading>
      <MyModulesText>
        <div>
          <LoginText onClick={() => dispatch(toggleLogin(true))}>
            Log in
          </LoginText>{" "}
          to post and reply to threads and access your subscribed modules.
        </div>
      </MyModulesText>
    </MyModulesContainer>
  );
};

const MyModulesLoggedIn = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserDetailsRequest(user.Id, dispatch);
  }, []);

  return (
    <MyModulesContainer mobileDisplay="none">
      <MyModulesHeading>My Modules</MyModulesHeading>
      <Scrollable>
        {user.Modules.map((moduleCode) => (
          <MyModulesChildrenWrapper moduleCode={moduleCode} />
        ))}
      </Scrollable>
    </MyModulesContainer>
  );
};

const MyModules = () => {
  const userId = useSelector(selectId);
  const token = useSelector(selectToken);

  return (
    <MyModulesDiv>
      {isLoggedIn(token, userId) ? <MyModulesLoggedIn /> : <MyModulesGuest />}
    </MyModulesDiv>
  );
};

export default MyModules;

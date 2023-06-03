import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_URL, Colors } from "../constants";
import {
  Module,
  ModuleInitialState,
} from "../redux/features/modules/moduleSlice";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useSelector, useDispatch } from "react-redux";
import {
  selectId,
  selectToken,
  addSubscription,
  deleteSubscription,
} from "../redux/features/users/userSlice";
import { WhiteLoader } from "./Loader";
import { isLoggedIn } from "../utils";
import { toggleLogin } from "../redux/features/modal/modal";
import { useNavigate } from "react-router-dom";

export const Button = styled.button<{subscribed?: boolean}>`
  border-radius: 50px;
  border: 2px solid ${Colors.dark_grey};
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  font-size: 1em;
  height: 60px;
  padding: 0px 40px;
  color: ${Colors.dark_grey};
  background-color: ${props => props.subscribed? Colors.white_1: Colors.blue_3};
  box-shadow: 0px 5px 0 -2.5px ${Colors.blue_2},
    0px 5px 0 -0.5px ${Colors.dark_grey};

  :hover {
    background-color: ${props => props.subscribed? Colors.blue_3 : Colors.blue_accent};
    position: relative; 
    top: 3px;
    box-shadow: 0px 2px 0 -2.5px ${Colors.blue_2},
        0px 2px 0 -0.5px ${Colors.dark_grey};
  }
`;

const ForumBackground = styled.div`
  border-radius: 20px;
  padding: 1.5em;
  border: 2px solid ${Colors.dark_grey};
  border-radius: 20px;
  background-color: ${Colors.green_2};
  color: ${Colors.black};
  font-family: "Poppins", "sans-serif";
  box-shadow: 7px 7px 0 ${Colors.blue_3},
            7px 7px 0 2px ${Colors.dark_grey};
`;

const Top = styled.div`
  height: 50%;
  vertical-align: top;
`;

const Bottom = styled.div`
  display: grid;
  margin-top: 3em;
  height: 50%;
  vertical-align: bottom;
  align-content: end;
  gap: 8px;
`;

const ForumHeading = styled.div`
  color: ${Colors.black};
  font-weight: 700;
  font-size: 1.8em;
  text-decoration: underline;
  cursor: pointer;
`;

const ForumDesc = styled.span`
  display: inline;
  whitespace: nowrap;
  color: ${Colors.black};
  font-weight: 500;
  font-size: 1em;
`;

const SubscriberDiv = styled.div`
  display: flex;
`;

const SubscriberDesc = styled.a`
  color: ${Colors.black};
  font-weight: 500;
  font-size: 1em;
  text-decoration: underline;
  margin-left: 0.5em;
`;

const ModuleForumDiv = styled.div`
  display: grid;
  align-items: center;
  padding-bottom: 2em;
  padding-right: 0;
  padding-top: 0;
`;

const ModuleForum = ({ selectedModule }: { selectedModule: string }) => {
  const [module, setModule] = useState<Module>(ModuleInitialState);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userId = useSelector(selectId);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchMod = () => {
    fetch(API_URL + `/module/${selectedModule.toUpperCase()}`)
      .then((response) => response.json())
      .then((data) => {
        setModule(data.module);
      })
      .catch((error) => console.log(error));
  };

  const fetchIsSubscribed = () => {
    fetch(API_URL + `/subscribes/${selectedModule.toUpperCase()}/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setIsSubscribed(data.subscribed);
      })
      .catch((error) => console.log(error));
  };

  const handleButtonClick = () => {
    if (!isLoggedIn(token, userId)) {
      dispatch(toggleLogin(true));
    } else {
      setIsLoading(true)
      fetch(API_URL + `/subscribes/${selectedModule.toUpperCase()}/${userId}`, {
        method: isSubscribed ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          fetchMod();
          if (isSubscribed) {
            dispatch(deleteSubscription(selectedModule));
          } else {
            dispatch(addSubscription(selectedModule));
          }
          setIsSubscribed(!isSubscribed);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  };

  const navigateToModulePage = () => {
    navigate(`/module/${module.Id}`);
  }

  // useEffect(() => {
  //     fetchMod();
  //     fetchIsSubscribed();
  // }, [module, isSubscribed]);

  useEffect(() => {
    fetchMod();
    fetchIsSubscribed();
  }, []);

  return (
    <ModuleForumDiv>
      <ForumBackground>
        <Top>
          <ForumHeading onClick={navigateToModulePage}>{module.Id} Forum</ForumHeading>
          <div>
            <ForumDesc>{module.Name}</ForumDesc>
          </div>
        </Top>
        <Bottom>
          <SubscriberDiv>
            <PeopleAltIcon />
            <SubscriberDesc href={`/subscribers/${selectedModule}`}>
              {module.SubscriberCount === 1? "1 subscriber" : `${module.SubscriberCount} subscribers`}
            </SubscriberDesc>
          </SubscriberDiv>
          <Button subscribed={isSubscribed} onClick={handleButtonClick} disabled={isLoading}>
            { isLoading
              ? <WhiteLoader />
              : isSubscribed 
              ? <p>Unsubscribe</p> 
              : <p>Subscribe</p>
            }
          </Button>
        </Bottom>
      </ForumBackground>
    </ModuleForumDiv>
  );
};

export default ModuleForum;

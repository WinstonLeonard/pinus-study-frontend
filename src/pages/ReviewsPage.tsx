import styled from "styled-components";
import { useParams } from "react-router-dom";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import { API_URL, Colors, ScreenSizes } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum, { Button } from "../components/ModuleForum";
import ReviewList from "../components/ReviewList";
import { useSelector } from "react-redux";
import { selectId, selectToken } from "../redux/features/users/userSlice";
import ReviewEditor from "../components/editor/ReviewEditor";
import { useState } from "react";
import { ErrorMessage } from "../components/authentication_modal/ModalComponents"

import { isLoggedIn } from "../utils";

const ModulePageWrapper = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  grid-column-gap: 2em;
  padding: 2em;

  ${ScreenSizes.medium_below} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;


  ${ScreenSizes.extra_large_below} {
    padding-right: 2em;
  }
`;

const HeadingDiv = styled.div`
  display: flex;
  vertical-align: middle;
  margin-bottom: 1em;
  width: 100%;

  ${ScreenSizes.medium_below} {
    display: flex;
    flex-direction: column;
  }
`;

const ForumHeadingDiv = styled.div`
  width: 50%;

  ${ScreenSizes.medium_below} {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }
`
const Heading = styled.span`
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  font-size: 2em;
  color: ${Colors.black};
  background: linear-gradient(to bottom, transparent 50%, ${Colors.blue_2_75} 50%);
  padding: 2.5px 5px 2.5px 5px;

  ${ScreenSizes.medium_below} {
    font-size: 1.5em;
  }
`;

const ButtonDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;

  ${ScreenSizes.medium_below} {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const ReviewListContainer = styled.div`
  margin-left: 8px;
`;

const ReviewsPage = () => {
const { mod } = useParams();
const userId = useSelector(selectId);
const token = useSelector(selectToken);
const [openReviewEditor, setOpenReviewEditor] = useState(false);
const [setError, setErrorMessage] = useState<string | null>(null);

// ...

const showReviewEditor = () => {
  // Open the review editor only if the user has not reviewed the module
  fetch(API_URL + `/review/${mod}/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.review === null) {
        setOpenReviewEditor(true);
        setErrorMessage(null);
      } else {
        setErrorMessage('You have already reviewed this module.');
        setOpenReviewEditor(false);
      }
    })
    .catch((error) => {
      setErrorMessage('Error during fetch. Please try again.');
      console.error(error);
    });
};

  
  const closeReviewEditor = () => {
    setOpenReviewEditor(false);
  };

  return (
    <div>
      {openReviewEditor ? <ReviewEditor closeReviewEditor={closeReviewEditor} /> : null}
      <NavigationBar />
      <Background>
        <ModulePageWrapper>
          <div>
            <HeadingDiv>
              <ForumHeadingDiv>
                <Heading>Reviews</Heading>
              </ForumHeadingDiv>
              <div style={{display:'flex', alignItems:'center'}}>
                <ErrorMessage style={{whiteSpace:'nowrap'}}>
                  {setError}
                </ErrorMessage>
              </div>
              <ButtonDiv>
                {isLoggedIn(token, userId) ? (
                  <Button onClick={showReviewEditor} mobilePadding="10px 20px">Add Review</Button>
                ) : (
                  <></>
                )}
              </ButtonDiv>
            </HeadingDiv>
            <ReviewListContainer>
              <ReviewList selectedModule={mod ? mod.toString() : ""} />
            </ReviewListContainer>
          </div>
          <RightSide>
            <ModuleForum selectedModule={mod ? mod.toString() : ""} />
            <MyModules />
          </RightSide>
        </ModulePageWrapper>
      </Background>
    </div>
  );
};

export default ReviewsPage;

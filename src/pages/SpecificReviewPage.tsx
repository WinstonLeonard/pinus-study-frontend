import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Navbar, Background} from "../components";
import { Colors, ScreenSizes } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum from "../components/ModuleForum";
import { API_URL } from "../constants";
import {
  Review,
  ReviewInitialState,
} from "../redux/features/reviews/reviewSlice";
import CommentList from "../components/comments/CommentList";
import { selectId, selectToken } from "../redux/features/users/userSlice";
import { isLoggedIn } from "../utils";
import { useSelector } from "react-redux";
import ReviewComponent from "../components/ReviewComponent";

// Uncomment display grid once my module component is done
const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  grid-column-gap: 2em;
  padding: 2em;

  ${ScreenSizes.medium_below} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const HeadingDiv = styled.div`
  padding-bottom: 0.5em;
`;

const Heading = styled.span`
  color: ${Colors.dark_grey};
  background: linear-gradient(to bottom, transparent 50%, ${Colors.blue_2_75} 50%);
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  font-size: 2.25em;
  padding: 2.5px 5px 2.5px 5px;

  ${ScreenSizes.medium_below} {
    font-size: 1.5em;
  }
`
const SpacingEmptyDiv = styled.div`
  padding-top: 2em;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
`;

/** REVIEW-PAGE REVIEW ONLY Å*/
const ReviewContainerDiv = styled.div`
  background-color: ${Colors.white_1};
  width: calc(100% - 2em);
  border-radius: 20px;
  padding: 1.5em;
  text-align: left;
  font-size: 12px;
  margin: 1em 0;
  border: 2px solid ${Colors.dark_grey};
  box-shadow: 4px 4px 0 ${Colors.green_2},
          4px 4px 0 2px ${Colors.dark_grey};
`;

const EditorContainerDiv = styled.div`
  background-color: ${Colors.white_1};
  width: calc(100% - 2em);
  border-radius: 20px;
  border: 2px solid ${Colors.dark_grey};
  padding: 0.5em 1.5em;
  text-align: left;
  font-size: 12px;
  margin: 1.5em 0;
  box-shadow: 4px 4px 0 ${Colors.green_2},
          4px 4px 0 2px ${Colors.dark_grey};
`;

const MediumText = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: ${Colors.light_grey};
  font-size: 1.6em;
  padding-left: 0.5em;

  ${ScreenSizes.medium_below} {
    font-size: 1.2em;
  }
`;

// const GuestBoxDiv = styled.div`
//   text-align: center;
//   -moz-user-select: -moz-none;
//   -khtml-user-select: none;
//   -webkit-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
// `;

// const GuestBox = () => {
//   return (
//     <GuestBoxDiv>
//       <MediumText style={{ color: Colors.white, fontSize: "1.25em" }}>
//         Please log in to reply.
//       </MediumText>
//     </GuestBoxDiv>
//   );
// };

const SpecificReviewPage = () => {
  const { reviewId } = useParams();
  const token = useSelector(selectToken);
  const userId = useSelector(selectId);
  const [review, setReview] = useState<Review>(ReviewInitialState);

//   if (!reviewId) {
//     return <div></div>; // Handle invalid question page here. Probly some 404 page or such
//   }

  return (
    <>
      <Navbar />
      <Background>
        <MainContainer>
          <div>
            <HeadingDiv>
              <Heading>Review Forum</Heading>
            </HeadingDiv>
            <ReviewComponent
              review={review}
              type="SPECIFIC_REVIEW_PAGE"
            />
            <SpacingEmptyDiv />
            {/* <HeadingDiv>
              <Heading>Replies</Heading>
            </HeadingDiv>
            {review.Comments && review.Comments?.length > 0 ? (
              <>
                <CommentList
                  comments={review.Comments}
                  reviewId={review.Id}
                  level={0}
                />
                {isLoggedIn(token, userId) ?
                <EditorContainerDiv>
                  <ReplyTextEditor id={0} reviewId={review.Id} />
                </EditorContainerDiv>
                : <GuestBox />}
              </>
            ) : isLoggedIn(token, userId) ? (
              <ReviewContainerDiv>
                <MediumText>No replies yet. Be the first to reply!</MediumText>
                <ReplyTextEditor id={0} reviewId={review.ModuleId} />
              </ReviewContainerDiv>
            ) : (
              <GuestBox />
            )} */}
          </div>
          <RightSide>
            {review !== ReviewInitialState ? (
              <ModuleForum selectedModule={review.ModuleId} />
            ) : null}
            <MyModules />
          </RightSide>
        </MainContainer>
      </Background>
    </>
  );
};

export default SpecificReviewPage;

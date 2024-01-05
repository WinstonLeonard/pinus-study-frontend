// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useParams } from "react-router-dom";
// import Background from "../components/Background";
// import NavigationBar from "../components/Navbar";
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import { API_URL, Colors, ScreenSizes } from "../constants";
// import ModuleForum, { Button } from "../components/ModuleForum";
// import ReviewList from "../components/ReviewList";
// import { useSelector } from "react-redux";
// import { selectId, selectToken } from "../redux/features/users/userSlice";
// import ReviewEditor from "../components/editor/ReviewEditor";
// import MyModules from "../components/MyModules";
// import { isLoggedIn } from "../utils";

// const ReviewsPageWrapper = styled.div`
//     display: grid;
//     grid-template-columns: 8.5fr 1.5fr;
//     grid-column-gap: 2em;
//     padding: 2em;

//     ${ScreenSizes.medium_below} {
//         display: flex;
//         flex-direction: column-reverse;
//     }
// `;

// const ButtonDiv = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: end;

//   ${ScreenSizes.medium_below} {
//     width: 100%;
//     display: flex;
//     justify-content: center;
//   }
// `;

// const RightSide = styled.div`
//     display: flex;
//     flex-direction: column;
// `;

// const HeadingDiv = styled.div`
//     display: flex;
//     vertical-align: middle;
//     margin-bottom: 1em;
//     color: white;
//     height: fit;
// `;

// const IconDiv = styled.div`
//     margin-left: 16px;
//     font-size: 2.25em;
//     display: flex;
//     place-items: center;
//     color: ${Colors.black};
// `;

// const ReviewsCountDiv = styled.div`
//     font-size: 1.2em;
//     margin-left: 8px;
//     display: flex;
//     place-items: center;
//     color: ${Colors.black};
// `;

// const Heading = styled.span`
//     font-family: "Poppins", "sans-serif";
//     font-weight: 600;
//     font-size: 2.25em;
//     color: ${Colors.dark_grey};
//     background: linear-gradient(to bottom, transparent 50%, ${Colors.blue_2_75} 50%);
//     padding: 2.5px 5px 2.5px 5px;

//     ${ScreenSizes.medium_below} {
//         font-size: 1.75em;
//     }
// `;

// const ReviewsContainer = styled.div`
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;
//     grid-column-gap: 1em;
//     grid-row-gap: 1em;

//     ${ScreenSizes.medium_below} {
//         display: flex;
//         flex-direction: column;
//     }
// `;

// const ReviewsPage = () => {
//     const { mod } = useParams();
//     const userId = useSelector(selectId);
//     const token = useSelector(selectToken);
//     const [openReviewEditor, setOpenReviewEditor] = useState(false);
//     const [reviews, setReviews] = useState([{ "Id": "0", "Content": "Loading" }]);

//     const showReviewEditor = () => {
//         setOpenReviewEditor(true);
//       };
    
//       const closeReviewEditor = () => {
//         setOpenReviewEditor(false);
//       };

//     const fetchReviews = () => {
//         fetch(API_URL + `/reviews/${mod?.toUpperCase()}`)
//             .then(response => response.json())
//             .then(data => {
//                 console.log("reviews", data);
//                 setReviews(data.reviews);
//             })
//             .catch(error => console.log(error));
//     };

//     useEffect(() => {
//         fetchReviews();
//     }, []);

//     return (
//         <div>
//             {openReviewEditor ? <ReviewEditor closeReviewEditor={closeReviewEditor} /> : null}
//             <NavigationBar />
//             <Background>
//                 <ReviewsPageWrapper>
//                     <div>
//                         <HeadingDiv>
//                             <Heading>
//                                 Reviews
//                             </Heading>
//                             <IconDiv>
//                                 <PeopleAltIcon />
//                             </IconDiv>
//                             <ReviewsCountDiv>
//                                 {reviews ? reviews.length : 0}
//                             </ReviewsCountDiv>
//                             <ButtonDiv>
//                                 {isLoggedIn(token, userId) ? (
//                                     <Button onClick={showReviewEditor} mobilePadding="10px 20px">Add a review</Button>
//                                     ) : (
//                                     <></>
//                                     )}
//                             </ButtonDiv>
//                         </HeadingDiv>
//                         <ReviewsContainer>
//                             <ReviewList selectedModule={mod ? mod.toString() : ""} />
//                         </ReviewsContainer>
//                     </div>
//                     <RightSide>
//                         <ModuleForum selectedModule={mod ? mod.toString() : ""} />
//                         <MyModules />
//                     </RightSide>
//                 </ReviewsPageWrapper>
//             </Background>
//         </div>
//     );
// };

// export default ReviewsPage;
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Background from "../components/Background";
import NavigationBar from "../components/Navbar";
import { Colors, ScreenSizes } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum, { Button } from "../components/ModuleForum";
import ReviewList from "../components/ReviewList";
import { useSelector } from "react-redux";
import { selectId, selectToken } from "../redux/features/users/userSlice";
import ReviewEditor from "../components/editor/ReviewEditor";
import { useState } from "react";

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

  const showReviewEditor = () => {
    setOpenReviewEditor(true);
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

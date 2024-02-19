/* eslint-disable */
import { useState, useEffect } from "react";
import styled from "styled-components";
import { API_URL, Colors, ScreenSizes } from "../constants";
import {
  Review,
  ReviewInitialState,
} from "../redux/features/reviews/reviewSlice";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ModuleForum";
import { selectId, selectToken } from "../redux/features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../utils";
import {
  toggleCreateAccount,
  toggleLogin,
} from "../redux/features/modal/modal";
import CombinedAuthenticationPage from "../pages/CombinedAuthenticationPage";
import { deserialize } from "./editor/serializer";

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

/** TODO: Add POST methods for likes (change functions in `<ThumbButton onClick={...}`) and upon submitting comment */

type ReviewType = "REVIEW_PAGE" | "SPECIFIC_REVIEW_PAGE";
//type LikedStatus = "NEUTRAL" | "LIKED" | "DISLIKED";

/** SHARED COMPONENTS */
const ReviewTitle = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1.7em;

  ${ScreenSizes.medium_below} {
    font-size: 1.375em;
  }
`;

const Text = styled.span`
  font-size: 1.25em;
  ${ScreenSizes.medium_below} {
    font-size: 1em;
  }
`;

export const RegularText = styled(Text)`
  font-family: "Poppins", sans-serif;
`;

const Content = styled.span`
  //display: inline-block;
  font-family: "Poppins", sans-serif
  font-weight: 500;
  font-size: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  width: 100%;
  word-wrap: break-word;

  ${ScreenSizes.medium_below} {
    font-size: 1em;
  }
`;

const ContentTitle = styled.span`
  //display: inline-block;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  width: 100%;
  word-wrap: break-word;

  ${ScreenSizes.medium_below} {
    font-size: 1em;
  }
`;

const DeleteButton = styled.button`
  border: none;
  background-color: ${Colors.blue_3};
  float: right;
  margin-right: 5px;
  margin-bottom: 5px;
  :hover {
    background-color: ${Colors.blue_accent};
  }
`;

export const PostedSince = styled(RegularText)`
  float: right;
`;

const VerticalCenterAlignLayout = styled.div`
  display: flex;
  align-items: center;
`;

const SeparatorLine = styled.div`
  width: 100%;
  height: 5px;
  background-color: #502060;
  margin: 10px 0;
`;

/** REVIEW-PAGE REVIEW ONLY */
const ReviewContainerButton = styled.button`
  background-color: ${Colors.blue_3};
  width: 100%;
  border-radius: 20px;
  border: 2px solid ${Colors.dark_grey};
  padding: 1.5em;
  text-align: left;
  font-size: 12px;
  cursor: pointer;

  :hover {
    background-color: ${Colors.blue_accent};
  }

  ${ScreenSizes.extra_small} {
    border: 1px solid;
    box-shadow: 3px 3px 0 ${Colors.blue_2},
        3px 3px 0 1px ${Colors.dark_grey};

    :hover {
        position: relative;
        top: 2px;
        left: 2px;
        box-shadow: 1px 1px 0 ${Colors.blue_2},
            1px 1px 0 2px ${Colors.dark_grey};
    }
      
}

  ${ScreenSizes.small_up} {
      border: 2px solid ${Colors.dark_grey};
      box-shadow: 6px 6px 0 ${Colors.blue_2},
          6px 6px 0 2px ${Colors.dark_grey};
      :hover {
        position: relative;
        top: 4px;
        left: 4px;
        box-shadow: 3px 3px 0 ${Colors.blue_2},
            3px 3px 0 2px ${Colors.dark_grey};
      }
  }
`;

/** REVIEW-PAGE REVIEW ONLY Å*/
export const ReviewContainerDiv = styled.div<{margin?: string}>`
  background-color: ${Colors.blue_3};
  width: calc(100% - 2em);
  border-radius: 20px;
  border: 2px solid ${Colors.dark_grey};
  padding: 1.5em;
  text-align: left;
  font-size: 12px;
  box-shadow: 4px 4px 0 ${Colors.green_2},
          4px 4px 0 2px ${Colors.dark_grey};
  margin: ${props => props.margin? props.margin : "0"};

  ${ScreenSizes.medium_below} {
    border: 1px solid ${Colors.dark_grey};
    box-shadow: 4px 4px 0 ${Colors.green_2},
          4px 4px 0 1px ${Colors.dark_grey};
    max-width: 100%;
    width: calc(100% - 3em); // ini klo diuncomment, aligns with qn page, but if commented, aligns with the text editor (MOBILE VIEW)
    margin-right: 2em;
  }

`;

const MediumText = styled(Text)`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
`;

const ReplyText = styled(MediumText)`
  :hover {
    text-decoration: underline;
  }
`;

const ThumbButton = styled.button`
  border: none;
  background-color: ${Colors.blue_3};
  :hover {
    background-color: ${Colors.blue_accent};
  }
`;

const Username = styled.span`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`
/**
 * Review component for the web forum.
 *
 * @param review The review of type Review to fetch the data.
 * @param type The type of review to be rendered. The only valid values are "SPECIFIC_REVIEW_PAGE" or "REVIEW_PAGE",
 *             or it can be omitted.
 */
const ReviewComponent = ({
  review,
  type,
}: {
  review: Review;
  type?: ReviewType;
}) => {
  // const [likesCount, setLikesCount] = useState<number>(review.LikesCount);
  // const [dislikesCount, setDislikesCount] = useState<number>(review.DislikesCount);
  const [openReply, setOpenReply] = useState<boolean>(false);
  //const [status, setStatus] = useState<LikedStatus>("NEUTRAL");
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleted, setIsDelete] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const userId = useSelector(selectId);

  let likeStatus = 0;

  const openReplyInputField = (): void => {
    setOpenReply(!openReply);
  };

  const handleReviewClick = () => {
    navigate(`/reviews/${review.ModuleId}/${review.UserId}`);
  };

  const handleDeleteButton = () => {
    const moduleId = review.ModuleId
    fetch(API_URL + `/review/${review.ModuleId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      if (response.ok) {
        setIsDelete(true);
      } else {
        throw new Error("Failed to delete review");
      }
    })
    navigate(`/reviews/${moduleId}`)
  }

  const showLogInModal = () => {
    dispatch(toggleLogin(true));
    dispatch(toggleCreateAccount(false));
  };

  // const handleLikeButton = () => {
  //   if (!isLoggedIn(token, userId)) {
  //     showLogInModal();
  //   } else if (review !== ReviewInitialState && !loading) {
  //     setLoading(true);
  //     switch (status) {
  //       case "LIKED":
  //         setLikesCount(likesCount - 1);
  //         setStatus("NEUTRAL");
  //         likeStatus = 0;
  //         break;
  //       case "DISLIKED":
  //         setLikesCount(likesCount + 1);
  //         setDislikesCount(dislikesCount - 1);
  //         setStatus("LIKED");
  //         likeStatus = 1;
  //         break;
  //       case "NEUTRAL":
  //         setLikesCount(likesCount + 1);
  //         setStatus("LIKED");
  //         likeStatus = 1;
  //         break;
  //     }

  //     handleLikesCount();
  //     setLoading(false);
  //   }
  // };

  // const handleDislikeButton = () => {
  //   if (!isLoggedIn(token, userId)) {
  //     showLogInModal();
  //   } else if (review !== ReviewInitialState && !loading) {
  //     setLoading(true);
  //     switch (status) {
  //       case "LIKED":
  //         setLikesCount(likesCount - 1);
  //         setDislikesCount(dislikesCount + 1);
  //         setStatus("DISLIKED");
  //         likeStatus = -1;
  //         break;
  //       case "DISLIKED":
  //         setDislikesCount(dislikesCount - 1);
  //         setStatus("NEUTRAL");
  //         likeStatus = 0;
  //         break;
  //       case "NEUTRAL":
  //         setDislikesCount(dislikesCount + 1);
  //         setStatus("DISLIKED");
  //         likeStatus = -1;
  //         break;
  //     }

  //     handleLikesCount();
  //     setLoading(false);
  //   }
  // };

  // const handleLikesCount = () => {
  //   console.log("likeStatus: " + likeStatus);
  //   if (review !== ReviewInitialState) {
  //     console.log();
  //     fetch(API_URL + `/likes/review/${moduleId}/${userId}/${likeStatus}`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         token: token,
  //         state: likeStatus,
  //       }),
  //     }).then((response) => console.log("success!"));
  //   }
  // };

  /**
   * Fetches liked status from the backend.
   */
  // const fetchLikeStatus = () => {
  //   fetch(API_URL + `/likes/review/${moduleId}/${userId}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.state);
  //       likeStatus = data.state;
  //       switch (data.state) {
  //         case 1:
  //           setStatus("LIKED");
  //           break;
  //         case -1:
  //           setStatus("DISLIKED");
  //           break;
  //         case 0:
  //           setStatus("NEUTRAL");
  //           break;
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };

  /**
   * Hook to fetch data.
   */
  useEffect(() => {
    setLoading(true);
  }, []);

  // useEffect(() => {
  //   if (type === "SPECIFIC_REVIEW_PAGE" && review !== ReviewInitialState) {
  //     fetchLikeStatus();
  //   }
  //   setLoading(false);
  // }, [review]);

  /**
   * Shortens the content to max. 150 characters to prevent the
   * post preview from being too long.
   *
   * @param content The full content of the review.
   * @returns The shortened content of the review.
   */
  const shortenLongPosts = (content: string): string => {
    if (content.length > 125) {
      return content.substring(0, 125) + "...";
    }
    return content;
  };

  /**
   * Strips the HTML tags from the provided content string, and shortens
   * the content to max. 150 characters by using the above `shortenLongPosts`
   * function.
   *
   * @param content The full content of the review
   * @returns The HTML-stripped, shortened content of the review
   */
  const shortenRemoveHtml = (content: string): string => {
    const div = document.createElement("div");
    div.innerHTML = content;
    const text = div.textContent || div.innerText || "";
    return shortenLongPosts(text);
  };

  /**
   * Parses the timestamp to produce the duration since the
   * review was made.
   *
   * @param timestamp The timestamp fetched from the database.
   * @returns The duration since the review.
   */
  const parseDuration = (timestamp: string): string => {
    const parsedTimestamp = Date.parse(timestamp);
    const datePosted = new Date(parsedTimestamp);
    const durationInMilliseconds = Date.now().valueOf() - datePosted.valueOf();
    const seconds = Math.floor(durationInMilliseconds / 1000);

    if (seconds < 60) return seconds + "s";

    const years = Math.floor(seconds / 31557600); // defined as 365 days + 1/4 days to account for leap year
    if (years >= 1) return years + "y";

    const months = Math.floor(seconds / 2628288); // standardized to 30 days
    if (months >= 1) return months + "mo";

    const days = Math.floor(seconds / 86400);
    if (days >= 1) return days + "d";

    const hours = Math.floor(seconds / 3600);
    if (hours >= 1) return hours + "h";

    const minutes = Math.floor(seconds / 60);
    if (minutes >= 1) return minutes + "m";

    return seconds + "s";
  };

  const parseLastModified = (date: string) => {
      dayjs.extend(relativeTime)
      return dayjs(date).fromNow()
  }

  /**
   * Renders the review in the Review Page.
   */
  const renderReviewPageReview = () => {
    console.log(review);
    if (isDeleted) {
      return null;
    }
    return (
      <div onClick={handleReviewClick}>
        <ReviewContainerButton>
          <PostedSince>{parseLastModified(review.Timestamp)}</PostedSince>
          {
            isLoggedIn(token, userId) && review.UserId === userId &&
            <DeleteButton onClick={handleDeleteButton}>
              <DeleteIcon sx={{ fontSize: 'large'}}/>
            </DeleteButton>
          }
          {/* <Button>hello</Button> */}
          <div><ContentTitle>Semester Taken: </ContentTitle><Content>{(review.SemesterTaken)}</Content></div>
          <div><ContentTitle>Difficulty: </ContentTitle><Content>{(review.Difficulty)}</Content></div>
          <div><ContentTitle>Workload: </ContentTitle><Content>{(review.Workload)}</Content></div>
          <br />
          <div><Content>{shortenRemoveHtml(review.Content)}</Content></div>
          <br />
          <div style={{float: 'right'}}><RegularText>Posted by @{review.Username} in {review.ModuleId}</RegularText></div>
          <br />
        </ReviewContainerButton>
      </div>
    );
  };

  const directToUserPage = () => {
    navigate(`/profile/${review.UserId}`);
  };

  /**
   * Renders the review in the Specific Review Page.
   */
  const renderSpecificReviewPageReview = () => {
    console.log(review)
    return (
      <ReviewContainerDiv>
        <CombinedAuthenticationPage />
        <PostedSince>{parseLastModified(review.Timestamp)}</PostedSince>
        {
            isLoggedIn(token, userId) && review.UserId === userId &&
            <DeleteButton onClick={handleDeleteButton}>
              <DeleteIcon sx={{ fontSize: 'large'}}/>
            </DeleteButton>
          }
        <br />
        <div><ContentTitle>Semester Taken: </ContentTitle><Content>{(review.SemesterTaken)}</Content></div>
        <div><ContentTitle>Difficulty: </ContentTitle><Content>{(review.Difficulty)}</Content></div>
        <div><ContentTitle>Workload: </ContentTitle><Content>{(review.Workload)}</Content></div>
        <div><ContentTitle>Expected Grade: </ContentTitle><Content>{(review.ExpectedGrade)}</Content></div>
        <div><ContentTitle>Actual Grade: </ContentTitle><Content>{(review.ActualGrade)}</Content></div>
        <div><ContentTitle>Lecturer Name: </ContentTitle><Content>{(review.Lecturer)}</Content></div>
        <div><ContentTitle>General Comments: </ContentTitle><Content>{deserialize(review.Content)}</Content></div>
        <div><ContentTitle>Suggestions: </ContentTitle><Content>{deserialize(review.Suggestion)}</Content></div>
        <br />
        <div style={{textAlign: 'right'}}>
          <RegularText>
            Posted by <Username onClick={directToUserPage}>@{review.Username}</Username>
          </RegularText>
        </div>
        {/* <VerticalCenterAlignLayout>
          <ThumbButton onClick={handleLikeButton}>
            {status === "LIKED" ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </ThumbButton>
          <MediumText>&#8196;{likesCount}&#8195;</MediumText>
          <ThumbButton onClick={handleDislikeButton}>
            {status === "DISLIKED" ? (
              <ThumbDownIcon />
            ) : (
              <ThumbDownOutlinedIcon />
            )}
          </ThumbButton>
          <MediumText>&#8196;{dislikesCount}&#8195;</MediumText>
          <ModeCommentOutlinedIcon />
          <MediumText>&#8196;</MediumText>
          <ReplyText onClick={isLoggedIn(token, userId) ? openReplyInputField : showLogInModal}>Reply</ReplyText>
        </VerticalCenterAlignLayout> */}
      </ReviewContainerDiv>
    );
  };

  switch (type) {
    case "SPECIFIC_REVIEW_PAGE":
      return renderSpecificReviewPageReview();
    case "REVIEW_PAGE":
      return renderReviewPageReview();
    default:
      return renderReviewPageReview();
  }
};

export default ReviewComponent;

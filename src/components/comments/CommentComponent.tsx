import { useState, useEffect } from "react";
import styled from "styled-components";
import { API_URL, Colors, ScreenSizes } from "../../constants";
import {
  Comment,
  CommentInitialState,
} from "../../redux/features/comments/commentSlice";
import {
  toggleLogin,
  toggleCreateAccount,
} from "../../redux/features/modal/modal";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReplyTextEditor from "../editor/ReplyTextEditor";
import CommentList from "./CommentList";
import { useDispatch, useSelector } from "react-redux";
import { selectId, selectToken } from "../../redux/features/users/userSlice";
import CombinedAuthenticationPage from "../../pages/CombinedAuthenticationPage";
import { isLoggedIn } from "../../utils";
import { deserialize } from "../editor/serializer";
import { PostedSince, RegularText, ThreadContainerDiv } from "../ThreadComponent";

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

/** TODO: Add POST methods for likes (change functions in `<ThumbButton onClick={...}`) and upon submitting comment */

type LikedStatus = "NEUTRAL" | "LIKED" | "DISLIKED";

interface MarginProps {
  level: number;
}
/** SHARED COMPONENTS */
const Text = styled.span`
  font-size: 1.25em;
  ${ScreenSizes.medium_below} {
    font-size: 1em;
  }
`;

const Content = styled.span`
  display: inline-block;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-block-start: 0;
  margin-block-end: 0;

  ${ScreenSizes.medium_below} {
    font-size: 1em;
  }
`;

const VerticalCenterAlignLayout = styled.div`
  display: flex;
  align-items: center;
`;

const LevelContainerDiv = styled.div<MarginProps>`
  background-color: ${Colors.blue_3};
  border-radius: 20px;
  border: none;
  padding: 1em 0;
  text-align: left;
  font-size: 12px;
  margin-left: 2em;
`;

const Line = styled.div`
  border-top: 1px solid ${Colors.light_grey};
  margin-top: 0.25em;
  margin-bottom: 1em;
  margin-left: -0.5em;
  margin-right: -0.5em;
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
    background-color: ${Colors.white_accent};
  }
`;

const ViewRepliesLink = styled.div`
  color: ${Colors.hyperlink};
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1.25em;
  cursor: pointer;
  display: flex;
  align-items: center;

  :hover {
    text-decoration: underline;
  }

  ${ScreenSizes.medium_below} {
    font-size: 1em;
  }
`;

/**
 * Comment component for the web forum.
 *
 * @param threadId The comment id to fetch the data.
 * @param level The level of indentation of the comment (for nested comments purposes)
 */
const CommentComponent = ({
  commentId,
  level,
  threadId,
}: {
  commentId: number;
  level: number;
  threadId: number;
}) => {
  const [comment, setComment] = useState<Comment>(CommentInitialState);
  const [openReply, setOpenReply] = useState<Boolean>(false);
  const [viewReplies, setViewReplies] = useState<Boolean>(false);
  const [status, setStatus] = useState<LikedStatus>("NEUTRAL");
  const [loading, setLoading] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [dislikesCount, setDislikesCount] = useState<number>(0);
  const userId = useSelector(selectId);
  const token = useSelector(selectToken);

  const openReplyInputField = (): void => {
    setOpenReply(!openReply);
  };

  const dispatch = useDispatch();

  let likeStatus = 0;

  const showLogInModal = () => {
    dispatch(toggleLogin(true));
    dispatch(toggleCreateAccount(false));
  };

  const handleLikeButton = () => {
    if (!isLoggedIn(token, userId)) {
      showLogInModal();
    } else if (comment !== CommentInitialState && !loading) {
      setLoading(true);
      switch (status) {
        case "LIKED":
          setLikesCount(likesCount - 1);
          setStatus("NEUTRAL");
          likeStatus = 0;
          break;
        case "DISLIKED":
          setLikesCount(likesCount + 1);
          setDislikesCount(dislikesCount - 1);
          setStatus("LIKED");
          likeStatus = 1;
          break;
        case "NEUTRAL":
          setLikesCount(likesCount + 1);
          setStatus("LIKED");
          likeStatus = 1;
          break;
      }

      handleLikesCount();
      setLoading(false);
    }
  };

  const handleDislikeButton = () => {
    if (!isLoggedIn(token, userId)) {
      showLogInModal();
    } else if (comment !== CommentInitialState && !loading) {
      setLoading(true);
      switch (status) {
        case "LIKED":
          setLikesCount(likesCount - 1);
          setDislikesCount(dislikesCount + 1);
          setStatus("DISLIKED");
          likeStatus = -1;
          break;
        case "DISLIKED":
          setDislikesCount(dislikesCount - 1);
          setStatus("NEUTRAL");
          likeStatus = 0;
          break;
        case "NEUTRAL":
          setDislikesCount(dislikesCount + 1);
          setStatus("DISLIKED");
          likeStatus = -1;
          break;
      }

      handleLikesCount();
      setLoading(false);
    }
  };

  const handleLikesCount = () => {
    if (comment !== CommentInitialState) {
      fetch(API_URL + `/likes/comment/${commentId}/${userId}/${likeStatus}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token: token,
          state: likeStatus,
        }),
      }).then((response) => console.log("success!"));
    }
  };

  /**
   * Fetches comment data from the backend.
   */
  const fetchCommentData = () => {
    fetch(API_URL + `/comment/${commentId}`)
      .then((response) => response.json())
      .then((data) => {
        setComment(data);
        setLikesCount(data.Likes);
        setDislikesCount(data.Dislikes);
        console.log(likesCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Fetches liked status from the backend.
   */
  const fetchLikeStatus = () => {
    fetch(API_URL + `/likes/comment/${commentId}/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        likeStatus = data.state;
        switch (data.state) {
          case 1:
            setStatus("LIKED");
            break;
          case -1:
            setStatus("DISLIKED");
            break;
          case 0:
            setStatus("NEUTRAL");
            break;
        }
      })
      .catch((error) => console.log(error));
  };

  /**
   * Hook to fetch data.
   */
  useEffect(() => {
    setLoading(true);
    fetchCommentData();
  }, []);

  useEffect(() => {
    fetchLikeStatus();
    setLoading(false);
  }, [comment]);

  /**
   * Parses the timestamp to produce the duration since the
   * comment was made.
   *
   * @param timestamp The timestamp fetched from the database.
   * @returns The duration since the comment.
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

  if (level === 0) {
    return (
      <ThreadContainerDiv margin="1em 0em">
        <CombinedAuthenticationPage />
        <PostedSince>{parseLastModified(comment.Timestamp)}</PostedSince>
        <RegularText>Replied by @{comment.Username}</RegularText>
        <br />
        <Content>{deserialize(comment.Content)}</Content>
        <br />
        <VerticalCenterAlignLayout>
          <ThumbButton onClick={handleLikeButton}>
            {status === "LIKED" ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </ThumbButton>
          {/* &#8195; (Em Space) and &#8196; (Three-Per-Em Space) are Unicode spaces. */}
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
          <ReplyText onClick={() => openReplyInputField()}>Reply</ReplyText>
        </VerticalCenterAlignLayout>
        {openReply ? (
          <ReplyTextEditor id={commentId} threadId={threadId} />
        ) : null}
        {comment.CommentChilds &&
        comment.CommentChilds.length > 0 &&
        !viewReplies ? (
          <ViewRepliesLink onClick={() => setViewReplies(true)}>
            <KeyboardArrowDownIcon style={{ fill: Colors.hyperlink }} />
            View More Replies
          </ViewRepliesLink>
        ) : viewReplies ? (
          <ViewRepliesLink onClick={() => setViewReplies(false)}>
            <KeyboardArrowUpIcon style={{ fill: Colors.hyperlink }} />
            Hide Replies
          </ViewRepliesLink>
        ) : null}
        {comment.CommentChilds && viewReplies ? (
          <>
            <CommentList
              comments={comment.CommentChilds}
              level={level + 1}
              threadId={threadId}
            />
          </>
        ) : null}
      </ThreadContainerDiv>
    );
  } else {
    return (
      <LevelContainerDiv level={level}>
        <CombinedAuthenticationPage />
        <Line />
        <PostedSince>{parseLastModified(comment.Timestamp)}</PostedSince>
        <RegularText>Replied by @{comment.Username}</RegularText>
        <br />
        <Content>{deserialize(comment.Content)}</Content>
        <br />
        <VerticalCenterAlignLayout>
          <ThumbButton onClick={handleLikeButton}>
            {status === "LIKED" ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </ThumbButton>
          {/* &#8195; (Em Space) and &#8196; (Three-Per-Em Space) are Unicode spaces. */}
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
          <ReplyText onClick={() => openReplyInputField()}>Reply</ReplyText>
        </VerticalCenterAlignLayout>
        {openReply ? (
          <ReplyTextEditor id={commentId} threadId={threadId} />
        ) : null}
        {comment.CommentChilds &&
        comment.CommentChilds.length > 0 &&
        !viewReplies ? (
          <ViewRepliesLink onClick={() => setViewReplies(true)}>
            <KeyboardArrowDownIcon style={{ fill: Colors.hyperlink }} />
            View More Replies
          </ViewRepliesLink>
        ) : viewReplies ? (
          <ViewRepliesLink onClick={() => setViewReplies(false)}>
            <KeyboardArrowUpIcon style={{ fill: Colors.hyperlink }} />
            Hide Replies
          </ViewRepliesLink>
        ) : null}
        {comment.CommentChilds && viewReplies ? (
          <>
            <CommentList
              comments={comment.CommentChilds}
              level={level + 1}
              threadId={threadId}
            />
          </>
        ) : null}
      </LevelContainerDiv>
    );
  }
};

export default CommentComponent;

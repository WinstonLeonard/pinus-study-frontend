import { useState, useEffect } from "react";
import styled from "styled-components";
import { API_URL, Colors } from "../../constants";
import {
  Comment,
  CommentInitialState,
} from "../../features/comments/commentSlice";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReplyTextEditor from "../editor/ReplyTextEditor";
import CommentList from "./CommentList";

/** TODO: Add POST methods for likes (change functions in `<ThumbButton onClick={...}`) and upon submitting comment */

type ThreadType = "MODULE_PAGE" | "QUESTION_PAGE";

interface MarginProps {
  level: number;
}
/** SHARED COMPONENTS */
const QuestionTitle = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1.875em;
`;

const Text = styled.span`
  font-size: 1.25em;
`;

const RegularText = styled(Text)`
  font-family: "Poppins", sans-serif;
`;

const Content = styled.span`
  display: inline-block;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

const PostedSince = styled(RegularText)`
  float: right;
`;

const VerticalCenterAlignLayout = styled.div`
  display: flex;
  align-items: center;
`;

/** MODULE-PAGE THREAD ONLY */
const ThreadContainerButton = styled.button`
  background-color: ${Colors.white};
  width: 50vw;
  border-radius: 20px;
  border: none;
  padding: 1.5em;
  text-align: left;
  font-size: 12px;

  :hover {
    background-color: ${Colors.white_accent};
  }
`;

/** THREAD-PAGE THREAD ONLY Å*/
const ThreadContainerDiv = styled.div`
  background-color: ${Colors.white};
  width: 50vw;
  border-radius: 20px;
  border: none;
  padding: 1.5em;
  text-align: left;
  font-size: 12px;
  margin: 1em 0;
`;

const LevelContainerDiv = styled.div<MarginProps>`
  background-color: ${Colors.white};
  width: ${100% - `2em`};
  border-radius: 20px;
  border: none;
  padding: 1em 0;
  text-align: left;
  font-size: 12px;
  margin-left: 2em;
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

  :hover {
    background-color: ${Colors.white_accent};
  }
`;

const ReplyInputField = styled.input`
  margin-top: 0.75em;
  width: calc(50vw - 3em);
  font-family: "Poppins", sans-serif;
  font-style: italic;
  font-size: 1.25em;
  border-radius: 20px;
  border: none;
  background-color: ${Colors.light_grey_75};
  padding: 0.5em 1.25em 0.5em 1.25em;
`;

const ViewRepliesLink = styled.div`
  color: ${Colors.red};
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1.25em;

  display: flex;
  align-items: center;
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
}: {
  commentId: number;
  level: number;
}) => {

  const [comment, setComment] = useState<Comment>(CommentInitialState);
  const [liked, setLiked] = useState<Boolean>(false);
  const [disliked, setDisliked] = useState<Boolean>(false);
  const [openReply, setOpenReply] = useState<Boolean>(false);
  const [viewReplies, setViewReplies] = useState<Boolean>(false);

  const openReplyInputField = (): void => {
    setOpenReply(!openReply);
  };

  /**
   * Fetches comment data from the backend.
   */
  const fetchThreadData = () => {
      fetch(API_URL + `/comment/${commentId}`)
          .then((response) => response.json())
          .then((data) => {
              setComment(data);
          })
          .catch((error) => {
              console.log(error);
          });
  };

  /**
   * Fetches liked status from the backend.
   */
  const fetchLikeStatus = () => {
      fetch(API_URL + `/likes/comment/${commentId}/${comment.AuthorId}`)
          .then((response) => response.json())
          .then((data) => {
              switch (data.state) {
                  case 1:
                      setLiked(true);
                      break;
                  case -1:
                      setDisliked(true);
                      break;
                  case 0:
                  default:
                      break;
              }
          })
          .catch((error) => console.log(error));
  };

  /**
   * Hook to fetch data.
   */
  useEffect(() => {
      fetchThreadData();
      fetchLikeStatus();
  }, []);

  /**
   * Parses the timestamp to produce the duration since the
   * comment was made.
   *
   * @param timestamp The timestamp fetched from the database.
   * @returns The duration since the comment.
   */
  const parseDuration = (timestamp: string): string => {
    const parsedTimestamp = Date.parse(timestamp);
    console.log(parsedTimestamp);
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

  if (level == 0) {
    return (
      <ThreadContainerDiv>
        <PostedSince>{parseDuration(comment.Timestamp)}</PostedSince>
        <RegularText>Replied by @{comment.Username}</RegularText>
        <br />
        <Content>{comment.Content}</Content>
        <br />
        <VerticalCenterAlignLayout>
          <ThumbButton onClick={() => setLiked(!liked)}>
            {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </ThumbButton>
          {/* &#8195; (Em Space) and &#8196; (Three-Per-Em Space) are Unicode spaces. */}
          <MediumText>&#8196;{comment.Likes}&#8195;</MediumText>
          <ThumbButton onClick={() => setDisliked(!disliked)}>
            {disliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
          </ThumbButton>
          <MediumText>&#8196;{comment.Dislikes}&#8195;</MediumText>
          <ModeCommentOutlinedIcon />
          <MediumText>&#8196;</MediumText>
          <ReplyText onClick={() => openReplyInputField()}>Reply</ReplyText>
        </VerticalCenterAlignLayout>
        {openReply ? <ReplyTextEditor id={commentId} /> : null}
        {comment.Children && !viewReplies ? (
          <ViewRepliesLink onClick={() => setViewReplies(true)}>
            <KeyboardArrowDownIcon style={{ fill: Colors.red }} />
            View More Replies
          </ViewRepliesLink>
        ) : viewReplies ? (
          <ViewRepliesLink onClick={() => setViewReplies(false)}>
            <KeyboardArrowUpIcon style={{ fill: Colors.red }} />
            Hide Replies
          </ViewRepliesLink>
        ) : null}
        {comment.Children && viewReplies ? (
          <>
            <CommentList comments={comment.Children} level={level + 1} />
          </>
        ) : null}
      </ThreadContainerDiv>
    );
  } else {
    return (
      <LevelContainerDiv level={level}>
        <PostedSince>{parseDuration(comment.Timestamp)}</PostedSince>
        <RegularText>Replied by @{comment.Username}</RegularText>
        <br />
        <Content>{comment.Content}</Content>
        <br />
        <VerticalCenterAlignLayout>
          <ThumbButton onClick={() => setLiked(!liked)}>
            {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </ThumbButton>
          {/* &#8195; (Em Space) and &#8196; (Three-Per-Em Space) are Unicode spaces. */}
          <MediumText>&#8196;{comment.Likes}&#8195;</MediumText>
          <ThumbButton onClick={() => setDisliked(!disliked)}>
            {disliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
          </ThumbButton>
          <MediumText>&#8196;{comment.Dislikes}&#8195;</MediumText>
          <ModeCommentOutlinedIcon />
          <MediumText>&#8196;</MediumText>
          <ReplyText onClick={() => openReplyInputField()}>Reply</ReplyText>
        </VerticalCenterAlignLayout>
        {openReply ? <ReplyTextEditor id={commentId} /> : null}
        {comment.Children && !viewReplies ? (
          <ViewRepliesLink onClick={() => setViewReplies(true)}>
            <KeyboardArrowDownIcon style={{ fill: Colors.red }} />
            View More Replies
          </ViewRepliesLink>
        ) : viewReplies ? (
          <ViewRepliesLink onClick={() => setViewReplies(false)}>
            <KeyboardArrowUpIcon style={{ fill: Colors.red }} />
            Hide Replies
          </ViewRepliesLink>
        ) : null}
        {comment.Children && viewReplies ? (
          <>
            <CommentList comments={comment.Children} level={level + 1} />
          </>
        ) : null}
      </LevelContainerDiv>
    );
  }
};

export default CommentComponent;

import React from "react";
import CommentComponent from "./CommentComponent";
import { Comment } from "../../features/comments/commentSlice";

const CommentList = ({ comments, level }: { comments: Comment[], level: number }) => {
  return (
    <>
      {comments.map((comment: Comment) => (
        <div>
          <CommentComponent commentPass={comment} level={level} />
        </div>
      ))}
    </>
  );
};

export default CommentList;

import React from "react";
import CommentComponent from "./CommentComponent";
import { Comment } from "../../features/comments/commentSlice";

const CommentList = ({ comments, level }: { comments: number[], level: number }) => {
  return (
    <>
      {comments.map((comment: number) => (
        <div>
          <CommentComponent commentId={comment} level={level} />
        </div>
      ))}
    </>
  );
};

export default CommentList;

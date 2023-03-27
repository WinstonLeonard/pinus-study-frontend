import CommentComponent from "./CommentComponent";

/**
 * Generates a List of Comments for the Web Forum
 * 
 * @param param0 an object with comments and level attributes, both number[] and number respectively
 * @returns a JSX component that represents a list of comments
 */
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

import React from "react";
import CommentList from "./CommentList";
import { Comment } from "../../features/comments/commentSlice";

const comments: Comment[] = [
  {
    Content: "hello",
    AuthorId: 1,
    Username: "author1",
    Likes: 10,
    Dislikes: 20,
    IsDeleted: false,
    Timestamp: "01-01-2023",
  },

  {
    Content: "hi",
    AuthorId: 1,
    Username: "author1",
    Likes: 10,
    Dislikes: 20,
    IsDeleted: false,
    Timestamp: "01-01-2022",
    Children: [
      {
        Content: "konnichiwa",
        AuthorId: 1,
        Username: "author1",
        Likes: 10,
        Dislikes: 20,
        IsDeleted: false,
        Timestamp: "01-01-2023",
      },

      {
        Content: "ohisashiburi",
        AuthorId: 1,
        Username: "author1",
        Likes: 10,
        Dislikes: 20,
        IsDeleted: false,
        Timestamp: "01-01-2023",
        Children: [
          {
            Content: "konnichiwa",
            AuthorId: 1,
            Username: "author1",
            Likes: 10,
            Dislikes: 20,
            IsDeleted: false,
            Timestamp: "01-01-2023",
          },
    
          {
            Content: "ohisashiburi",
            AuthorId: 1,
            Username: "author1",
            Likes: 10,
            Dislikes: 20,
            IsDeleted: false,
            Timestamp: "01-01-2023",
          },
    
          {
            Content: "saranghae",
            AuthorId: 1,
            Username: "author1",
            Likes: 10,
            Dislikes: 20,
            IsDeleted: false,
            Timestamp: "01-02-2023",
          },
        ]
      },

      {
        Content: "saranghae",
        AuthorId: 1,
        Username: "author1",
        Likes: 10,
        Dislikes: 20,
        IsDeleted: false,
        Timestamp: "01-02-2023",
      },
    ],
  },

  {
    Content: "ohayo",
    AuthorId: 1,
    Username: "author1",
    Likes: 10,
    Dislikes: 20,
    IsDeleted: false,
    Timestamp: "03-01-2023",
  },
];

const TestComments = () => {
  return (
    <div>
      <CommentList comments={comments} level={0} />
    </div>
  );
};

export default TestComments;

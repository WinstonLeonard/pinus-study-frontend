export interface Comment {
    Content: string,
    AuthorId: number,
    Username: string,
    Likes: number,
    Dislikes: number,
    IsDeleted: boolean,
    Timestamp: string,
    CommentChilds?: number[],
}

export const CommentInitialState : Comment = {
    Content: "",
    AuthorId: 0,
    Username: "", 
    Likes: 0,
    Dislikes: 0,
    IsDeleted: false,
    Timestamp: "",
    CommentChilds: undefined
}
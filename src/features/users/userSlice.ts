import { Thread } from "../threads/threadSlice";

export interface User {
    Username: string;
    NumberOfQuestionsAsked: number;
    NumberOfLikesReceived: number;
    RecentThreads: Thread[];
    Modules: string[];
}

export const UserInitialState : User = {
    Username: "",
    NumberOfQuestionsAsked: 999,
    NumberOfLikesReceived: 999,
    RecentThreads: [],
    Modules: []
}
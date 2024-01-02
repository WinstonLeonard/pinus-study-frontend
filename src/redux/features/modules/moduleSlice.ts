import { Thread } from "../threads/threadSlice";
import { Review } from "../reviews/reviewSlice";

export interface Module {
    Id: string;
    Name: string;
    Desc: string;
    SubscriberCount: number; 
    ReviewCount: number;
    Threads: Thread[];
    Reviews: Review[];
}

export const ModuleInitialState : Module = {
    Id: "",
	Name: "",
    Desc: "",
    SubscriberCount: 0,
    ReviewCount: 0,
    Threads: [],
    Reviews: [],
}
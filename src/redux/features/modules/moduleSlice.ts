import { Thread } from "../threads/threadSlice";

export interface Module {
    Id: string;
    Name: string;
    Desc: string;
    SubscriberCount: number; 
    ReviewCount: number;
    Threads: Thread[];
}

export const ModuleInitialState : Module = {
    Id: "",
	Name: "",
    Desc: "",
    SubscriberCount: 0,
    ReviewCount: 0,
    Threads: []
}
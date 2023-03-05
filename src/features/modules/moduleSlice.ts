import { Thread } from "../threads/threadSlice";

export interface Module {
    Id: string;
    Name: string;
    Desc: string;
    SubscriberCount: number; 
    Threads: Thread[];
}

export const ModuleInitialState : Module = {
    Id: "",
	Name: "",
    Desc: "",
    SubscriberCount: 0,
    Threads: []
}
export interface Module {
    Id: string;
    Name: string;
    Desc: string;
    SubscriberCount: number; 
    Threads: []
}

export const ModuleInitialState : Module = {
    Id: "",
	Name: "",
    Desc: "",
    SubscriberCount: 0,
    Threads: []
}
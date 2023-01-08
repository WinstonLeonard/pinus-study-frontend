export interface Thread {
    Id: number;
	Title: string;
	Content: string;
	AuthorId: number;
	Username: string;
	Timestamp: string;
	ModuleId: string;
	LikesCount: number;
	DislikesCount: number;
	Comments?: number[];
}

export const ThreadInitialState : Thread = {
    Id: 0,
	Title: "",
	Content: "",
	AuthorId: 0,
	Username: "",
	Timestamp: "",
	ModuleId: "",
	LikesCount: 0,
	DislikesCount: 0,
	Comments: undefined
}
export interface Review {
	ModuleId: string;
	UserId: number;
	Username: string;
	Timestamp: string;
	Workload: number;
	ExpectedGrade: string;
    ActualGrade: string;
    Difficulty: number;
    SemesterTaken: string;
    Lecturer: string;
    Content: string;
    Suggestion: string;
}

export const ReviewInitialState : Review = {
	ModuleId: "",
    UserId: 0,
    Username: "",
    Timestamp: "",
    Workload: 0,
    ExpectedGrade: "A+",
    ActualGrade: "A+",
    Difficulty: 0,
    SemesterTaken: "AY2023/2024 S2      ",
    Lecturer: "",
    Content: "",
    Suggestion: "",
}
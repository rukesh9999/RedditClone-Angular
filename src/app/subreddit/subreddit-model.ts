export interface SubredditModel {
    subredditId?: number;
    name: string;
    description: string;
    numberOfPosts?: number;
    createdDate?:Date;
	user?:string;
}
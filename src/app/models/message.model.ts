import Thread from "./thread.model";
import User from "./user.model";

export default interface Message {
    id: number;
    body: string;
    isVcf: boolean;
    mediaUrl: string;
    sender: User;
    receiver: User;
    createdAt: Date;
    thread: Thread;
}
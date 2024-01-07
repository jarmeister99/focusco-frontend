import Thread from "./thread.model";
import User from "./user.model";

export default interface Message {
    id: number;
    body: string;
    mediaUrl: string;
    sender: User;
    senderId: number;
    receiver: User;
    receiverId: number;
    createdAt: Date;
    updatedAt: Date;
    thread: Thread;
    isOwner?: boolean;
    isSent?: boolean;
    triggerAt?: Date;
}
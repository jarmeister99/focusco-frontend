import Message from "./message.model";
import User from "./user.model";

export default interface Thread {
    id: number;
    participants: User[];
    messages: Message[];
}
import Message from "./message.model";
import Thread from "./thread.model";

export default interface User {
    id: number,
    number: string
    name: string;
    messagesSent: Message[];
    messagesReceived: Message[];
    threads: Thread[];
    autoreply?: string;
    isOwner: boolean;
}
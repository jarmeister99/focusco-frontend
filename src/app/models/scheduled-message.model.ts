import Message from "./message.model";

export default interface ScheduledMessage {
    id: number;
    scheduledAt: Date;
    triggerAt: Date;
    messageId: number;
    message: Message;
}
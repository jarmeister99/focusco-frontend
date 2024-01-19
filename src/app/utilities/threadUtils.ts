import { ThreadModel } from "../models/models";

export function getContactName(thread: ThreadModel) {
    return thread.user.name || "No Contact";
}

export function getContactNumber(thread: ThreadModel) {
    return thread.user.number;
}

export function getLatestMessage(thread: ThreadModel) {
    return thread.messages.reduce((prev, current) => {
        return (prev.createdAt > current.createdAt) ? prev : current
    });
}

export function clientMarkThreadAsSeen(thread: ThreadModel) {
    const latestMessage = getLatestMessage(thread);
    window.localStorage.setItem(`thread-${thread.user.number}-LatestMessageId`, `${latestMessage.id}`);
}

export function clientHasUnreadMessage(thread: ThreadModel) {
    const latestMessage = getLatestMessage(thread);
    return window.localStorage.getItem(`thread-${thread.user.number}-LatestMessageId`) !== `${latestMessage.id}`;
}
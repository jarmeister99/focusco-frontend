import Thread from "../models/thread.model";

export function getContactName(thread: Thread) {
    // find this.thread.participant that does not have isOwner = True
    // return that participant's name
    // if no participant has isOwner = True, return "No Contact"

    let contact = thread.participants.find(p => p.isOwner == false);
    return contact?.name || contact?.number || "No Contact";
}

export function getContactNumber(thread: Thread) {
    // find this.thread.participant that does not have isOwner = True
    // return that participant's number
    // if no participant has isOwner = True, return "No Number"

    let contact = thread.participants.find(p => p.isOwner == false);
    return contact?.number || "No Number";
}

export function getLatestMessage(thread: Thread) {

    let latestMessage = thread.messages.reduce((prev, current) => {
        return (prev.createdAt > current.createdAt) ? prev : current
    });

    return latestMessage || null;
}

export function getLatestMessageText(thread: Thread) {

    let latestMessage = thread.messages.reduce((prev, current) => {
        return (prev.createdAt > current.createdAt) ? prev : current
    });

    return latestMessage?.body || "No Messages";
}
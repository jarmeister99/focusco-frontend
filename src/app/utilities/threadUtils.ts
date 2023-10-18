import Thread from "../models/thread.model";

export function getContactName(thread: Thread) {
    // find this.thread.participant that does not have isOwner = True
    // return that participant's name
    // if no participant has isOwner = True, return "No Contact"
    let contact = thread.participants.find(p => p.isOwner == false);
    return contact?.name || contact?.number || "No Contact";
}

export function getLatestMessage(thread: Thread) {
    // return the latest message's text
    // if no messages, return "No Messages"
    let latestMessage = thread.messages[thread.messages.length - 1];
    return latestMessage?.body || "No Messages";
}
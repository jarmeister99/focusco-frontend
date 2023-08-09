import { Contact, getRandomContact } from "./contact.model";

export class Message {
    constructor(public sender: Contact, public receiver: Contact, public body: string, public timestamp: number) { }
}

const randomMessages = [
    "hi buddy",
    "how are you?",
    "what's up?",
    "how's it going?",
    "what's new?",
    "how's life?",
    "this food is good",
    "this food is bad",
    "I'm hungry",
    "I'm tired",
    "I'm sleepy",
]

export const getRandomMessage = (existingOptions: any) => {
    // existing options may already contain a Sender, Receiver, Body, or Timestamp.
    // for any field that is not contained in existingOptions, generate a random value.
    const sender = existingOptions.sender || getRandomContact();
    const receiver = existingOptions.receiver || getRandomContact();

    const body = existingOptions.body || randomMessages[Math.floor(Math.random() * randomMessages.length)];
    const timestamp = existingOptions.timestamp || Date.now();
    return new Message(sender, receiver, body, timestamp);
}
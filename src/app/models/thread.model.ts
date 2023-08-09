import { Contact, getRandomContact, getSelfContact } from "./contact.model";
import { Message, getRandomMessage } from "./message.model";

export class Thread {
    constructor(public contact: Contact, public messages: Message[]) { }
}

export const getRandomThread = (existingOptions: any, factoryOptions: { n?: number }) => {
    // existing options may already contain a Contact or Messages.
    // for any field that is not contained in existingOptions, generate a random value.
    const contact = existingOptions.contact || getRandomContact();

    const numMessages = factoryOptions.n || Math.ceil(Math.random() * 10);

    // if existingOptions.messages is not defined, generate multiple random messages
    const messages = existingOptions.messages || [];
    if (messages.length === 0) {
        for (let i = 0; i < numMessages; i++) {
            if (i % 2 === 0) {
                messages.push(getRandomMessage({ sender: getSelfContact(), receiver: contact, timestamp: Date.now() - (i * Math.floor(Math.random() * 1000) * 60 * 60 * 24) }));
                continue;
            }
            else {
                messages.push(getRandomMessage({ sender: contact, receiver: getSelfContact(), timestamp: Date.now() - (i * Math.floor(Math.random() * 1000) * 60 * 60 * 24) }));
            }
        }
    }
    return new Thread(contact, messages);
}
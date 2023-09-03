import { Contact, getRandomContact } from './contact.model';
import { Thread } from './thread.model';

export class Message {
  constructor(
    public sender: Contact,
    public receiver: Contact,
    public body: string,
    public thread: Thread | undefined | string,
    public timestamp: number,
    public _id?: string
  ) {}
}

const randomMessages = [
  'hi buddy',
  'how are you?',
  "what's up?",
  "how's it going?",
  "what's new?",
  "how's life?",
  'this food is good',
  'this food is bad',
  "I'm hungry",
  "I'm tired",
  "I'm sleepy",
];

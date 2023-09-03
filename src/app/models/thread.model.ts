import { Contact, getRandomContact, getSelfContact } from './contact.model';
import { Message } from './message.model';

export class Thread {
  constructor(
    public contact: Contact,
    public messages: Message[],
    public _id?: string
  ) {}
}

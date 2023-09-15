import { Contact } from './contact.model';
import { Thread } from './thread.model';

export class Message {
  constructor(
    public sender: Contact,
    public receiver: Contact,
    public body: string,
    public thread: Thread | undefined | string,
    public timestamp: number,
    public link?: string,
    public _id?: string
  ) { }
}
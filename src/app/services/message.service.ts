import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor() { }

    sendMessage(message: Message) {
        console.log(`Sending message: ${message.body} to ${message.receiver.name}`)
    }
    sendMessages(messages: Message[]) {
        messages.forEach(message => {
            this.sendMessage(message);
        })
    }
}

import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SentMessage } from "../models/prisma.models";
import { MessagesService } from "../services/messages.service";

// ACTION STATES //
export interface SendMessageActionPayload {
    body: string;
    mediaUrl: string;
    receiverId: number;
    senderId: number;
}

// ACTIONS //
export class GetMessagesAction {
    static readonly type = '[Messages] Get All Threads';
}
export class SendMessageAction {
    static readonly type = '[Messages] Send Message';
    constructor(public payload: SendMessageActionPayload) { }
}

export class MessagesStateModel {
    messages: SentMessage[] = [];
}
@State<MessagesStateModel>({
    name: 'messages',
    defaults: {
        messages: [],
    }
})
@Injectable()
export class MessagesState {
    constructor(private messagesService: MessagesService) { };

    @Action(GetMessagesAction)
    getAllMessages(ctx: StateContext<MessagesStateModel>) {
        this.messagesService.getMessages().subscribe(messages => {
            ctx.patchState({ messages });
        });
    }

    @Selector()
    static messages(state: MessagesStateModel) {
        return state.messages;
    }

    @Action(SendMessageAction)
    sendMessage(ctx: StateContext<MessagesStateModel>, action: SendMessageAction) {
        return this.messagesService.sendMessage(action.payload);
    }
}



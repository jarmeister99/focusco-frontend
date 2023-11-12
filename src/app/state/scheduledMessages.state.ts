import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import Message from "../models/message.model";
import { MessagesService } from "../services/messages.service";
import { ScheduleMessagesService } from "../services/schedule.messages.service";
import { WebsocketService } from "../services/websocket.service";
import { SendMessageActionPayload } from "./threads.state";

export interface EditScheduledMessageActionPayload {
    body: string;
    mediaUrl: string;
    triggerAt: Date;
}
export class EditScheduledMessageAction {
    static readonly type = '[ScheduledMessages] Edit Scheduled Message';
    constructor(public messageId: number, public editScheduledMessageActionPayload: EditScheduledMessageActionPayload) { }
}

export class GetAllScheduledMessagesAction {
    static readonly type = '[ScheduledMessages] Get All Scheduled Messages';
}

export interface CreateScheduledMessageActionPayload {
    receiverIds: number[];
    triggerAt: Date;
    messagePayload: Omit<SendMessageActionPayload, 'senderId' | 'receiverId'>;
}
export class CreateScheduledMessageAction {
    static readonly type = '[ScheduledMessages] Create Scheduled Message';
    constructor(public createScheduledMessageActionPayload: CreateScheduledMessageActionPayload) { }
}

export class DeleteScheduledMessageAction {
    static readonly type = '[ScheduledMessages] Delete Scheduled Message';
    constructor(public messageId: number) { }
}

export class ScheduledMessagesStateModel {
    scheduledMessages: Message[] = [];
}
@State<ScheduledMessagesStateModel>({
    name: 'scheduledMessages',
    defaults: {
        scheduledMessages: [],
    }
})
@Injectable()
export class ScheduledMessagesState implements NgxsOnInit {
    constructor(private scheduledMessagesService: ScheduleMessagesService, private messagesService: MessagesService, private wss: WebsocketService) { };

    ngxsOnInit(ctx: StateContext<ScheduledMessagesStateModel>) {
        ctx.dispatch(new GetAllScheduledMessagesAction());
        this.wss.onMessage().subscribe(() => {
            ctx.dispatch(new GetAllScheduledMessagesAction());
        });
    }

    @Action(GetAllScheduledMessagesAction)
    getAllScheduledMessages(ctx: StateContext<ScheduledMessagesStateModel>) {
        return this.scheduledMessagesService.getScheduledMessages().subscribe(scheduledMessages => {
            ctx.patchState({ scheduledMessages });
        });
    }

    @Action(CreateScheduledMessageAction)
    createScheduledMessage(ctx: StateContext<ScheduledMessagesStateModel>, action: CreateScheduledMessageAction) {
        this.scheduledMessagesService.scheduleMessage(action.createScheduledMessageActionPayload).subscribe(() => {
            ctx.dispatch(new GetAllScheduledMessagesAction()).subscribe();
        });
    }

    @Selector()
    static scheduledMessages(state: ScheduledMessagesStateModel) {
        return state.scheduledMessages.sort((a, b) => {
            if (!a.triggerAt || !b.triggerAt) {
                return 0;
            }
            return new Date(a.triggerAt).getTime() - new Date(b.triggerAt).getTime();
        });
    }

    @Action(DeleteScheduledMessageAction)
    deleteScheduledMessage(ctx: StateContext<ScheduledMessagesStateModel>, action: DeleteScheduledMessageAction) {
        this.messagesService.deleteMessage(action.messageId).subscribe(() => {
            ctx.dispatch(new GetAllScheduledMessagesAction());
        });
    }

    @Action(EditScheduledMessageAction)
    editScheduledMessage(ctx: StateContext<ScheduledMessagesStateModel>, action: EditScheduledMessageAction) {
        this.messagesService.editScheduledMessage(action.messageId, action.editScheduledMessageActionPayload).subscribe(() => {
            ctx.dispatch(new GetAllScheduledMessagesAction());
        });
    }

}


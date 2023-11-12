import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import Thread from "../models/thread.model";
import { MessagesService } from "../services/messages.service";
import { ThreadsService } from "../services/threads.service";
import { WebsocketService } from "../services/websocket.service";

export class GetAllThreadsAction {
    static readonly type = '[Threads] Get All Threads';
}

export class SelectThreadAction {
    static readonly type = '[Threads] Select Thread';
    constructor(public thread: Thread) { }
}

export interface SendMessageActionPayload {
    body: string;
    mediaUrl: string;
    receiverId: number;
    senderId: number;
}
export class SendMessageAction {
    static readonly type = '[Threads] Send Message';
    constructor(public sendMessageActionPayload: SendMessageActionPayload) { }
}

export class ThreadsStateModel {
    threads: Thread[] = [];
    selectedThread?: Thread;
}

@State<ThreadsStateModel>({
    name: 'threads',
    defaults: {
        threads: [],
        selectedThread: undefined
    }
})
@Injectable()
export class ThreadsState implements NgxsOnInit {
    constructor(private threadsService: ThreadsService, private messagesService: MessagesService, private wss: WebsocketService) { };

    ngxsOnInit(ctx: StateContext<ThreadsStateModel>) {
        ctx.dispatch(new GetAllThreadsAction());
        this.wss.onMessage().subscribe(() => {
            ctx.dispatch(new GetAllThreadsAction());
        });
    }

    @Action(GetAllThreadsAction)
    getAllThreads(ctx: StateContext<ThreadsStateModel>) {
        this.threadsService.getThreads().subscribe(threads => {
            // refresh selectedThread
            const selectedThread = threads.find((thread) => thread.id === ctx.getState().selectedThread?.id);
            ctx.patchState({ threads, selectedThread });
        });
    }
    @Selector()
    static threads(state: ThreadsStateModel) {
        return state.threads;
    }

    @Action(SelectThreadAction)
    selectThread(ctx: StateContext<ThreadsStateModel>, action: SelectThreadAction) {
        ctx.patchState({ selectedThread: action.thread });
    }

    @Selector()
    static selectedThread(state: ThreadsStateModel) {
        return state.selectedThread;
    }

    @Action(SendMessageAction)
    sendMessage(ctx: StateContext<ThreadsStateModel>, action: SendMessageAction) {
        this.messagesService.sendMessage(action.sendMessageActionPayload).subscribe(() => {
            ctx.dispatch(new GetAllThreadsAction());
        });
    }
}


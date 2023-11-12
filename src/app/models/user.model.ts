import { Cohort } from "./cohort.model";
import Message from "./message.model";
import Thread from "./thread.model";

export interface UserCohort {
    userId: number;
    cohortId: number,
    cohort: Cohort;
}

export default interface User {
    some(arg0: (user: any) => boolean): unknown;
    id: number,
    number: string
    name: string;
    messagesSent: Message[];
    messagesReceived: Message[];
    threads: Thread[];
    autoreply?: string;
    isOwner: boolean;
    cohorts: UserCohort[];
    adminNote?: string;
}
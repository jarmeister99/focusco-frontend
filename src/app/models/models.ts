import { SentMessage, User } from "focusco-lib/dist/types/prisma.types";

export interface ThreadModel {
    messages: SentMessage[];
    user: User;
}
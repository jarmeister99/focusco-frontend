import { Cohort } from "../models/cohort.model";

export class GetAllUsersAction {
    static readonly type = '[Users] Get all users';
}

export interface CreateUserPayload {
    name: string;
    number: string;
    cohort?: Cohort;
}
export class CreateUserAction {
    constructor(public payload: CreateUserPayload) { }
    static readonly type = '[Users] Create user';
}
export class DeleteUserAction {
    constructor(public userId: number) { }
    static readonly type = '[Users] Delete user';
}
export interface EditUserPayload {
    name?: string;
    autoreply?: string;
    adminNote?: string;
}
export class EditUserAction {
    constructor(public userId: number, public payload: EditUserPayload) { }
    static readonly type = '[Users] Edit user';
}
export class EditUsersAction {
    // create a type that is an object mapping user ids to edit user payloads
    constructor(public payload: EditUserPayload[]) { }
    static readonly type = '[Users] Edit users';
}

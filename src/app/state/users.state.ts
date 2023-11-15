import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { mergeMap } from "rxjs";
import User from "../models/user.model";
import { UsersService } from "../services/users.service";
import { GetAllCohortsAction } from "./cohorts.state";
import { GetAllThreadsAction } from "./threads.state";
import { CreateUserAction, DeleteUserAction, EditUserAction, EditUsersAction, GetAllUsersAction } from "./users.actions";

export class UsersStateModel {
    users: User[] = [];
}

@State<UsersStateModel>({
    name: 'users',
    defaults: {
        users: []
    }
})
@Injectable()
export class UsersState implements NgxsOnInit {
    constructor(private usersService: UsersService) { };

    ngxsOnInit(ctx: StateContext<UsersStateModel>) {
        ctx.dispatch(new GetAllUsersAction());
    }

    @Action(GetAllUsersAction)
    getAllUsers(ctx: StateContext<UsersStateModel>) {
        return this.usersService.getAllUsers().subscribe(users => {
            ctx.patchState({ users });
            ctx.dispatch(new GetAllCohortsAction());
            ctx.dispatch(new GetAllThreadsAction());
        });
    }
    @Selector()
    static users(state: UsersStateModel) {
        return state.users;
    }
    @Selector()
    static owner(state: UsersStateModel) {
        return state.users.find(user => user.isOwner);
    }
    @Action(CreateUserAction)
    createUser(ctx: StateContext<UsersStateModel>, action: CreateUserAction) {
        return this.usersService.createUser(action.payload).pipe(
            mergeMap(() => ctx.dispatch(new GetAllUsersAction()))
        );
    }
    @Action(DeleteUserAction)
    deleteUser(ctx: StateContext<UsersStateModel>, action: DeleteUserAction) {
        return this.usersService.deleteUser(action.userId).pipe(
            mergeMap(() => ctx.dispatch(new GetAllUsersAction()))
        );
    }
    @Action(EditUserAction)
    editUser(ctx: StateContext<UsersStateModel>, action: EditUserAction) {
        return this.usersService.updateUser(action.userId, action.payload).pipe(
            mergeMap(() => ctx.dispatch(new GetAllUsersAction()))
        );
    }

    @Action(EditUsersAction)
    editUsers(ctx: StateContext<UsersStateModel>, action: EditUsersAction) {
        return this.usersService.updateUsers(action.payload).pipe(
            mergeMap(() => ctx.dispatch(new GetAllUsersAction()))
        );
    }
}
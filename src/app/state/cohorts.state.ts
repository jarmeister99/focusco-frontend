import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { Cohort } from "../models/cohort.model";
import User from "../models/user.model";
import { CohortsService } from "../services/cohorts.service";
import { WebsocketService } from "../services/websocket.service";
import { GetAllUsersAction } from "./users.actions";
import { UsersState, UsersStateModel } from "./users.state";

export class ExportCohortMessagesAction {
    static readonly type = '[Cohorts] Export Cohort Messages';
    constructor(public cohortId: number) { }
}

export class DeleteCohortAction {
    static readonly type = '[Cohorts] Delete Cohort';
    constructor(public cohortId: number) { }
}

export class UnselectCohortAction {
    static readonly type = '[Cohorts] Unselect Cohort';
}

export interface CreateCohortActionPayload {
    name: string;
    description: string;
    userIds: number[];
}
export class CreateCohortAction {
    static readonly type = '[Cohorts] Create Cohort';
    constructor(public payload: CreateCohortActionPayload) { }
}

export class AddUsersToCohortAction {
    static readonly type = '[Cohorts] Add Users To Cohort';
    constructor(public users: User[], public cohortId: number) { }
}

export class AddUserToCohortAction {
    static readonly type = '[Cohorts] Add User To Cohort';
    constructor(public userId: number, public cohortId: number) { }
}

export class RemoveUserFromCohortAction {
    static readonly type = '[Cohorts] Remove User From Cohort';
    constructor(public userId: number, public cohortId: number) { }
}

export class SelectCohortAction {
    static readonly type = '[Cohorts] Select Cohort';
    constructor(public cohort: Cohort | null) { }
}

export class GetAllCohortsAction {
    static readonly type = '[Cohorts] Get All Cohorts';
}

export class CohortsStateModel {
    cohorts: Cohort[] = [];
    selectedCohort: Cohort | null = null;;
}
@State<CohortsStateModel>({
    name: 'cohorts',
    defaults: {
        cohorts: [],
        selectedCohort: null
    }
})
@Injectable()
export class CohortsState implements NgxsOnInit {
    constructor(private wss: WebsocketService, private cohortsService: CohortsService) { };

    ngxsOnInit(ctx: StateContext<CohortsStateModel>) {
        ctx.dispatch(new GetAllCohortsAction());
        this.wss.onMessage().subscribe(() => {
            ctx.dispatch(new GetAllCohortsAction());
        });
    }

    @Action(GetAllCohortsAction)
    async getAllCohorts(ctx: StateContext<CohortsStateModel>) {
        this.cohortsService.getAllCohorts().subscribe((cohorts) => {
            const selectedCohort = ctx.getState().selectedCohort;
            if (selectedCohort) {
                const selectedCohortInNewCohorts = cohorts.find((cohort) => cohort.id === selectedCohort.id);
                if (selectedCohortInNewCohorts) {
                    ctx.patchState({
                        selectedCohort: selectedCohortInNewCohorts,
                    });
                }
            }
            ctx.patchState({
                cohorts: cohorts,
            });
        });
    }

    @Action(SelectCohortAction)
    selectCohort(ctx: StateContext<CohortsStateModel>, action: SelectCohortAction) {
        ctx.patchState({
            selectedCohort: action.cohort === ctx.getState().selectedCohort ? undefined : action.cohort,
        });
    }

    @Selector()
    static selectedCohort(state: CohortsStateModel) {
        return state.selectedCohort;
    }

    @Selector([UsersState])
    static selectedUsers(state: CohortsStateModel, userState: UsersStateModel) {
        return state.selectedCohort?.users.map((cohortUser) => cohortUser.user) || userState.users;
    }

    @Selector()
    static cohorts(state: CohortsStateModel) {
        return state.cohorts;
    }

    @Action(AddUserToCohortAction)
    addUserToCohort(ctx: StateContext<CohortsStateModel>, action: AddUserToCohortAction) {
        this.cohortsService.addUserToCohort(action.userId, action.cohortId).subscribe(() => {
            ctx.dispatch(new GetAllCohortsAction());
            ctx.dispatch(new GetAllUsersAction());
        });
    }

    @Action(AddUsersToCohortAction)
    addUsersToCohort(ctx: StateContext<CohortsStateModel>, action: AddUsersToCohortAction) {
        action.users.forEach((user) => {
            this.cohortsService.addUserToCohort(user.id, action.cohortId).subscribe(() => {
                ctx.dispatch(new GetAllCohortsAction());
                ctx.dispatch(new GetAllUsersAction());
            });
        });
    }

    @Action(CreateCohortAction)
    createCohort(ctx: StateContext<CohortsStateModel>, action: CreateCohortAction) {
        this.cohortsService.createCohort(action.payload).subscribe(() => {
            ctx.dispatch(new GetAllCohortsAction());
            ctx.dispatch(new GetAllUsersAction());
        });
    }

    @Action(RemoveUserFromCohortAction)
    removeUserFromCohort(ctx: StateContext<CohortsStateModel>, action: RemoveUserFromCohortAction) {
        this.cohortsService.removeUserFromCohort(action.userId, action.cohortId).subscribe(() => {
            ctx.dispatch(new GetAllCohortsAction())
            ctx.dispatch(new GetAllUsersAction());
        });
    }

    @Action(UnselectCohortAction)
    unselectCohort(ctx: StateContext<CohortsStateModel>) {
        ctx.patchState({
            selectedCohort: undefined,
        });
    }

    @Action(DeleteCohortAction)
    deleteCohort(ctx: StateContext<CohortsStateModel>, action: DeleteCohortAction) {
        this.cohortsService.deleteCohort(action.cohortId).subscribe(() => {
            ctx.dispatch(new GetAllCohortsAction());
            ctx.dispatch(new GetAllUsersAction());
        });
    }

    @Action(ExportCohortMessagesAction)
    exportCohortMessages(ctx: StateContext<CohortsStateModel>, action: ExportCohortMessagesAction) {
        this.cohortsService.exportCohortMessages(action.cohortId).subscribe((data) => {
            const blob = new Blob([data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
}


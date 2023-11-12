import User from "./user.model";

export interface CohortUser {
    userId: number;
    cohortId: number,
    user: User;
}

export interface Cohort {
    id: number;
    name: string;
    description: string;
    users: CohortUser[];
    startDate: Date;
    endDate: Date;
}
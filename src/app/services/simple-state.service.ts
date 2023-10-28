import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SimpleStateService {

    data: BehaviorSubject<any> = new BehaviorSubject({});

    constructor() { }

    set(data: any) {
        this.data.next(data);
    }

    get$() {
        return this.data.asObservable();
    }

    get() {
        return this.data.getValue();
    }

}

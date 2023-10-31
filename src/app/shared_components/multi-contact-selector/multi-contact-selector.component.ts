import { Component } from '@angular/core';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import User from 'src/app/models/user.model';
import { SimpleStateService } from 'src/app/services/simple-state.service';
import { UsersService } from 'src/app/services/users.service';

// create a type that extends ListItem with an _id property
// this is needed for the multiselect dropdown
interface ListItemWithId extends ListItem {
    _id: string;
}

@Component({
    selector: 'app-multi-contact-selector',
    templateUrl: './multi-contact-selector.component.html',
    styleUrls: ['./multi-contact-selector.component.scss'],
})
export class MultiContactSelectorComponent {
    dropdownList: User[] = [];
    selectedItems: ListItem[] = [];
    dropdownSettings: any;

    constructor(private usersService: UsersService, private simpleState: SimpleStateService) { }

    ngOnInit() {
        this.usersService.getUsersOnInterval$().subscribe((users) => {
            this.dropdownList = users;
        });

        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'Unselect All',
            itemsShowLimit: 3,
        };

    }

    onModelChange() {
        this.simpleState.set({ selectedItems: this.selectedItems });
    }
}
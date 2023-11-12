import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { Observable } from 'rxjs';
import User from 'src/app/models/user.model';

export interface MultiselectUserListItem {
  id: number;
  name: string;
}

@Component({
  selector: 'app-multiselect-users',
  templateUrl: './multiselect-users.component.html',
  styleUrls: ['./multiselect-users.component.scss']
})
export class MultiselectUsersComponent implements OnInit {

  @Input() users$!: Observable<User[]>;
  selectedUsers: User[] = [];
  userForm?: FormGroup;

  dropdownList: User[] = [];
  selectedItems: ListItem[] = [];
  dropdownSettings: any;

  @Input() showAddButton = true;

  @Output() addUserIds = new EventEmitter<number[]>();

  @Output() selectedUsersChange = new EventEmitter<User[]>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.users$.subscribe(users => {
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

  onClickAddUsers() {
    const userIds = this.selectedItems.map(item => item.id as number);
    this.addUserIds.emit(userIds);
    this.selectedItems = [];
  }

  onModelChange($event: MultiselectUserListItem[]) {
    // return a subset of this.dropdownList based off the ids in $event
    const selectedUsers = this.dropdownList.filter((user: User) => $event.some((selectedUser: MultiselectUserListItem) => selectedUser.id === user.id));
    this.selectedUsersChange.emit(selectedUsers);

  }
}

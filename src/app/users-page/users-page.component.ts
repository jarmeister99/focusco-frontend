import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import User from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getUsersOnInterval$().subscribe((users: User[]) => {
      this.users$.next(users);
    });
  }
}

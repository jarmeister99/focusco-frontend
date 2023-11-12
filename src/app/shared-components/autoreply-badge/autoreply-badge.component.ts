import { Component, Input, OnInit } from '@angular/core';
import User from 'src/app/models/user.model';

@Component({
  selector: 'app-autoreply-badge',
  templateUrl: './autoreply-badge.component.html',
  styleUrls: ['./autoreply-badge.component.scss']
})
export class AutoreplyBadgeComponent implements OnInit {
  @Input() user?: User;

  autoreply?: string;;

  constructor() { }
  ngOnInit(): void {
    if (this.user) {
      this.autoreply = this.user.autoreply;
    }
  }
}

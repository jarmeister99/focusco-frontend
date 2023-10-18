import { Component, Input } from '@angular/core';
import Thread from 'src/app/models/thread.model';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent {
  @Input() thread!: Thread;
}

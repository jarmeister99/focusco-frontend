import { Component } from '@angular/core';
import { ThreadSelectorService } from 'src/app/services/thread-selector.service';

@Component({
  selector: 'app-thread-selected-pane',
  templateUrl: './thread-selected-pane.component.html',
  styleUrls: ['./thread-selected-pane.component.scss']
})
export class ThreadSelectedPaneComponent {
  constructor(public readonly threadService: ThreadSelectorService) {
  }
}

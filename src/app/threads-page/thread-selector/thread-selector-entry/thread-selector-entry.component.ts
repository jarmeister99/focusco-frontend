import { Component, Input } from '@angular/core';
import { Thread } from 'src/app/models/thread.model';
import { ThreadSelectorService } from 'src/app/services/thread-selector.service';

@Component({
  selector: 'app-thread-selector-entry',
  templateUrl: './thread-selector-entry.component.html',
  styleUrls: ['./thread-selector-entry.component.scss']
})
export class ThreadSelectorEntryComponent {
  @Input() thread?: Thread = undefined;

  constructor(public readonly threadSelectorService: ThreadSelectorService) { }

  onThreadSelected() {
    this.threadSelectorService.selectThread(this.thread!);
  }
}

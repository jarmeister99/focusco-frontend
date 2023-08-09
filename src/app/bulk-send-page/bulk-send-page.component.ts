import { Component } from '@angular/core';
import { ContactSelectorService } from '../services/contact-selector.service';

@Component({
  selector: 'app-bulk-send-page',
  templateUrl: './bulk-send-page.component.html',
  styleUrls: ['./bulk-send-page.component.scss']
})
export class BulkSendPageComponent {
  constructor(public readonly contactSelectorService: ContactSelectorService) { }

}

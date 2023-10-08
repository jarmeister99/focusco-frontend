import { Component } from '@angular/core';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-threads-page',
  templateUrl: './threads-page.component.html',
  styleUrls: ['./threads-page.component.scss']
})
export class ThreadsPageComponent {
  onClickExportMessages() {
    this.exportService.getAllMessages().subscribe((data) => {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  constructor(private exportService: ExportService) {
  }
}

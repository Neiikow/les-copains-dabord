import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-sm',
  styleUrls: ['./pagination-sm.component.css'],
  templateUrl: './pagination-sm.component.html',
})
export class PaginationSmComponent {
  @Input() public pagin: any;
}

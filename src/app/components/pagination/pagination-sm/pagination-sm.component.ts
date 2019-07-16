import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-sm',
  styleUrls: ['./pagination-sm.component.css'],
  templateUrl: './pagination-sm.component.html',
})
export class PaginationSmComponent {
  @Input() public pagin: any;
  @Output() public options = new EventEmitter<any>();

  public setOptions(currentPage: number, pageSize: number): void {
    this.options.emit({currentPage, pageSize});
  }
}

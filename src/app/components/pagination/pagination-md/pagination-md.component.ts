import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-md',
  styleUrls: ['./pagination-md.component.css'],
  templateUrl: './pagination-md.component.html',
})
export class PaginationMdComponent {
  @Input() public pagin: any;
  @Output() public options = new EventEmitter<any>();

  public setOptions(currentPage: number, pageSize: number): void {
    this.options.emit({currentPage, pageSize});
  }
}

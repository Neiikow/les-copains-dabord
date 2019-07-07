import { Component, Input } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-pagination',
  styleUrls: ['./pagination.component.css'],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() public pagin: any;
  @Input() private items: any;
  private pageItems: any;

  constructor(private paginService: PaginationService) {}

  private setPage(page: number, pageSize: number): void {
    this.pagin = this.paginService.getPager(this.items.length, page, pageSize);
    this.pageItems = this.items.slice(this.pagin.startIndex, this.pagin.endIndex + 1);
  }
}

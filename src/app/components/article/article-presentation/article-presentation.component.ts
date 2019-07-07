import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/class/article';
import { ApiMcService } from 'src/app/services/api-mc.service';
import { ArticleService } from 'src/app/services/article.service';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-article-presentation',
  styleUrls: ['./article-presentation.component.css'],
  templateUrl: './article-presentation.component.html',
})
export class ArticlePresentationComponent implements OnInit {
  public players: any;
  public pageItems: any;
  public article: Article;
  private status: object;
  private version: object;
  private total: object;
  private pagin: any;

  constructor(
    private articleService: ArticleService,
    private apimcService: ApiMcService,
    private paginService: PaginationService) { }

  public ngOnInit(): void {
    this.getArticle();
    this.getServerData();
  }

  private getArticle(): void {
    const type = 'presentation';
    this.articleService.getArticleByType(type)
      .subscribe((article: Article) => this.article = article);
  }
  private getServerData(): void {
    this.apimcService.getStatus().subscribe(status => this.status = status);
    this.apimcService.getVersion().subscribe(version => this.version = version);
    this.apimcService.getTotal().subscribe(total => this.total = total);
    this.apimcService.getOnlinePlayers().subscribe(players => {
      this.players = players;
      this.setPage(1, 5);
    });
  }
  private setPage(page: number, pageSize: number): void {
    this.pagin = this.paginService.getPager(this.players.length, page, pageSize);
    this.pageItems = this.players.slice(this.pagin.startIndex, this.pagin.endIndex + 1);
  }
}

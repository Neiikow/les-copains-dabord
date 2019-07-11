import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/class/article';
import { ApiMcService } from 'src/app/services/api-mc.service';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-presentation',
  styleUrls: ['./article-presentation.component.css'],
  templateUrl: './article-presentation.component.html',
})
export class ArticlePresentationComponent implements OnInit {
  public players: any;
  public article: Article;
  private status: object;
  private version: object;
  private total: object;
  private pagin: any;

  constructor(
    private articleService: ArticleService,
    private apimcService: ApiMcService) { }

  public ngOnInit(): void {
    this.getArticle();
    this.getServerData();
    this.getPlayers(1, 6);
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
  }
  private getPlayers(currentPage: number, pageSize: number): void {
    this.apimcService.getOnlinePlayers(currentPage, pageSize)
    .subscribe(data => {
      this.pagin = data.options;
      this.players = data.members;
    });
  }
}

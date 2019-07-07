import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/class/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-article-list',
  styleUrls: ['./article-list.component.css'],
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnInit {
  public design: string;
  public pageItems: any;
  public pagin: any;
  private articles: Article[];
  private type: string;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private paginService: PaginationService) { }

  public ngOnInit(): void {
    this.design = this.route.snapshot.data['design'];
    this.type = this.route.snapshot.data['type'];
    this.getArticles();
  }
  public isAuth(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
  }
  private getArticles(): void {
    this.articleService.getArticlesByType(this.type)
      .subscribe(articles => {
        this.articles = articles;
        if (this.design === 'card') {
          this.setPage(1, 3);
        } else {
          this.setPage(1, 5);
        }
      });
  }
  private setPage(page: number, pageSize: number): void {
    this.pagin = this.paginService.getPager(this.articles.length, page, pageSize);
    this.pageItems = this.articles.slice(this.pagin.startIndex, this.pagin.endIndex + 1);
  }
}

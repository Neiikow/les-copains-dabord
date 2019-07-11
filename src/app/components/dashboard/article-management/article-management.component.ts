import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/class/article';
import { Types } from 'src/app/enum/types.enum';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataFormatService } from 'src/app/services/data-format.service';

@Component({
  selector: 'app-article-management',
  styleUrls: ['./article-management.component.css'],
  templateUrl: './article-management.component.html',
})
export class ArticleManagementComponent implements OnInit {
  public articles: Article[];
  private types = Types;
  private pagin: any;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private formatService: DataFormatService) { }

  public ngOnInit(): void {
    this.getArticles(1, 10);
  }
  private getArticles(currentPage: number, pageSize: number): void {
    this.articleService.getArticles(currentPage, pageSize)
      .subscribe(data => {
        const articles = data.articles;
        this.pagin = data.options;
        const tab = [];
        articles.forEach(article => {
          if (article.type !== 'presentation') {
            article.createDate = this.formatService.frenchDate(article['create_date']);
            tab.push(article);
          }
        });
        this.articles = tab;
      });
  }
  private delete(article: Article): void {
    if (this.authService.isAuthenticated()) {
      this.articleService.deleteArticle(article.id).subscribe(
        next => this.getArticles(this.pagin.currentPage, this.pagin.pageSize),
      );
    }
  }
}

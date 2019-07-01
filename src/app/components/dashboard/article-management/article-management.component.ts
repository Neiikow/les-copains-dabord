import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/class/article';
import { Types } from 'src/app/enum/types.enum';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-article-management',
  styleUrls: ['./article-management.component.css'],
  templateUrl: './article-management.component.html',
})
export class ArticleManagementComponent implements OnInit {
  private articles: Article[];
  private types = Types;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService) { }

  public ngOnInit(): void {
    this.getArticles();
  }
  private getArticles(): void {
    this.articleService.getArticles()
      .subscribe(articles => this.articles = articles);
  }
  private delete(article: Article): void {
    if (this.authService.isAuthenticated()) {
      this.articleService.deleteArticle(article.id).subscribe();
      this.getArticles();
    }
  }
}

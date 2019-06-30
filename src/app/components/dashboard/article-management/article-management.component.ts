import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/class/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-management',
  styleUrls: ['./article-management.component.css'],
  templateUrl: './article-management.component.html',
})
export class ArticleManagementComponent implements OnInit {
  private articles: Article[];

  constructor(
    private articleService: ArticleService) { }

  public ngOnInit(): void {
    this.getArticles();
  }
  private getArticles(): void {
    this.articleService.getArticles()
      .subscribe(articles => this.articles = articles);
  }
}

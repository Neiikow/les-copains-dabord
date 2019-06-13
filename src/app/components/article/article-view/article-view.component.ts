import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/class/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-view',
  styleUrls: ['./article-view.component.css'],
  templateUrl: './article-view.component.html',
})
export class ArticleViewComponent implements OnInit {
  private article: Article;
  private articles: Article[];

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location) { }

  public ngOnInit(): void {
    this.getArticles();
    this.route.params.subscribe((param: {id: number}) => this.getArticle(param.id));
  }

  private getArticles(): void {
    const type = this.route.snapshot.data['type'];
    this.articleService.getArticlesByType(type)
      .subscribe(articles => this.articles = articles);
  }
  private getArticle(id: number): void {
    this.articleService.getArticleById(id)
      .subscribe((article: Article) => this.article = article);
  }
  private delete(article: Article): void {
    this.articleService.deleteArticle(article.id).subscribe();
    this.location.back();
  }
  private goBack(): void {
    this.location.back();
  }
}

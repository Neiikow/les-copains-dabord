import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/class/article';
import { Types } from 'src/app/enum/types.enum';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-article-view',
  styleUrls: ['./article-view.component.css'],
  templateUrl: './article-view.component.html',
})
export class ArticleViewComponent implements OnInit {
  private article: Article;
  private articles: Article[];
  private types = Types;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location,
    private authService: AuthService) { }

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
    if (this.authService.isAuthenticated()) {
      this.articleService.deleteArticle(article.id).subscribe();
      this.location.back();
    }
  }
  private isAuth(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
    const payload = this.authService.getDecodedToken();
    if (this.article.author === payload.username) {
      return true;
    }
  }
  private goBack(): void {
    console.log(this.article);
    this.location.back();
  }
}

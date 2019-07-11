import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/class/article';
import { Types } from 'src/app/enum/types.enum';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataFormatService } from 'src/app/services/data-format.service';

@Component({
  selector: 'app-article-view',
  styleUrls: ['./article-view.component.css'],
  templateUrl: './article-view.component.html',
})
export class ArticleViewComponent implements OnInit {
  public article: Article;
  private articles: Article[];
  private types = Types;
  private pagin: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location,
    private authService: AuthService,
    private formatService: DataFormatService) { }

  public ngOnInit(): void {
    this.getArticles(1, 10);
    this.route.params.subscribe((param: {id: number}) => this.getArticle(param.id));
  }

  private getArticles(currentPage: number, pageSize: number): void {
    const type = this.route.snapshot.data['type'];
    this.articleService.getArticlesByType(type, currentPage, pageSize)
      .subscribe(data => {
        this.pagin = data.options;
        this.articles = data.articles;
      });
  }
  private getArticle(id: number): void {
    this.articleService.getArticleById(id)
      .subscribe((article: Article) => {
        article.createDate = this.formatService.frenchDate(article['create_date']);
        this.article = article;
      });
  }
  private delete(article: Article): void {
    if (this.authService.isAuthenticated()) {
      this.articleService.deleteArticle(article.id).subscribe(
        next => this.getArticles(this.pagin.currentPage, this.pagin.pageSize),
      );
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
    this.location.back();
  }
}

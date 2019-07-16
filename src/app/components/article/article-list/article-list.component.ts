import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/class/article';
import { Types } from 'src/app/enum/types.enum';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-article-list',
  styleUrls: ['./article-list.component.css'],
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnInit {
  public design: string;
  public pagin: any;
  public articles: Article[];
  private type: string;
  private types = Types;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.design = this.route.snapshot.data['design'];
    this.type = this.route.snapshot.data['type'];
    if (this.design === 'card') {
      this.getArticles(1, 3);
    } else {
      this.getArticles(1, 5);
    }
  }
  public isAuth(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
  }
  public getOptions(options: any): void {
    this.getArticles(options.currentPage, options.pageSize);
  }
  private getArticles(currentPage: number, pageSize: number): void {
    this.articleService.getArticlesByType(this.type, currentPage, pageSize)
      .subscribe(data => {
        this.pagin = data.options;
        this.articles = data.articles;
      });
  }
}

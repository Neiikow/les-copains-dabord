import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/class/article';
import { Types } from 'src/app/enum/types.enum';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataFormatService } from 'src/app/services/data-format.service';

@Component({
  selector: 'app-presentation-management',
  styleUrls: ['./presentation-management.component.css'],
  templateUrl: './presentation-management.component.html',
})
export class PresentationManagementComponent implements OnInit {
  public articles: Article[];
  private types = Types;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private formatService: DataFormatService) { }

  public ngOnInit(): void {
    this.getArticles();
  }
  private getArticles(): void {
    this.articleService.getArticlesByType('presentation')
      .subscribe(articles => {
        articles.forEach(article => {
          article.createDate = this.formatService.frenchDate(article['create_date']);
        });
        this.articles = articles;
      });
  }
}
